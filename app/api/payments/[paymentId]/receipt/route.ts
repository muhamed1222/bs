import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import prisma from '@/lib/prisma';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2023-10-16',
});

export async function GET(
  request: Request,
  { params }: { params: { paymentId: string } }
) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    // Получаем информацию о платеже
    const payment = await prisma.payment.findUnique({
      where: { id: params.paymentId },
    });

    if (!payment || payment.userId !== session.user.id) {
      return NextResponse.json(
        { error: 'Payment not found' },
        { status: 404 }
      );
    }

    // Получаем чек из Stripe
    const invoice = await stripe.invoices.retrieve(payment.stripeSessionId);

    // Создаем PDF чек
    const pdf = await stripe.invoices.retrievePdf(payment.stripeSessionId);

    // Возвращаем PDF файл
    return new NextResponse(pdf, {
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': `attachment; filename="receipt-${payment.id}.pdf"`,
      },
    });
  } catch (error) {
    console.error('Error downloading receipt:', error);
    return NextResponse.json(
      { error: 'Failed to download receipt' },
      { status: 500 }
    );
  }
} 