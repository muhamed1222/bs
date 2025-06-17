import { NextResponse } from 'next/server';
import Stripe from 'stripe';
import { headers } from 'next/headers';
import prisma from '@/lib/prisma';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2023-10-16',
});

const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET!;

export async function POST(request: Request) {
  try {
    const body = await request.text();
    const signature = headers().get('stripe-signature')!;

    let event: Stripe.Event;

    try {
      event = stripe.webhooks.constructEvent(
        body,
        signature,
        webhookSecret
      );
    } catch (err) {
      console.error('Webhook signature verification failed:', err);
      return NextResponse.json(
        { error: 'Invalid signature' },
        { status: 400 }
      );
    }

    switch (event.type) {
      case 'checkout.session.completed': {
        const session = event.data.object as Stripe.Checkout.Session;
        
        // Обновляем статус подписки пользователя
        await prisma.user.update({
          where: {
            id: session.client_reference_id!,
          },
          data: {
            subscriptionStatus: 'active',
            subscriptionPlan: session.metadata?.plan as string,
            subscriptionId: session.subscription as string,
          },
        });

        // Создаем запись о платеже
        await prisma.payment.create({
          data: {
            userId: session.client_reference_id!,
            amount: session.amount_total! / 100,
            currency: session.currency!,
            status: 'completed',
            plan: session.metadata?.plan as string,
            receiptUrl: session.invoice?.invoice_pdf || null,
          },
        });
        break;
      }

      case 'customer.subscription.updated': {
        const subscription = event.data.object as Stripe.Subscription;
        
        await prisma.user.update({
          where: {
            subscriptionId: subscription.id,
          },
          data: {
            subscriptionStatus: subscription.status,
            subscriptionPlan: subscription.metadata?.plan as string,
          },
        });
        break;
      }

      case 'customer.subscription.deleted': {
        const subscription = event.data.object as Stripe.Subscription;
        
        await prisma.user.update({
          where: {
            subscriptionId: subscription.id,
          },
          data: {
            subscriptionStatus: 'canceled',
            subscriptionPlan: 'free',
            subscriptionId: null,
          },
        });
        break;
      }
    }

    return NextResponse.json({ received: true });
  } catch (error) {
    console.error('Error processing webhook:', error);
    return NextResponse.json(
      { error: 'Failed to process webhook' },
      { status: 500 }
    );
  }
} 