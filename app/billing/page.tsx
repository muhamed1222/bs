import React from 'react';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { redirect } from 'next/navigation';
import { CurrentPlan } from '@/components/billing/CurrentPlan';
import { PaymentHistory } from '@/components/billing/PaymentHistory';
import { prisma } from '@/lib/prisma';

export default async function BillingPage() {
  const session = await getServerSession(authOptions);

  if (!session?.user) {
    redirect('/auth/signin');
  }

  const user = await prisma.user.findUnique({
    where: { id: session.user.id },
    include: {
      payments: {
        orderBy: { createdAt: 'desc' },
      },
    },
  });

  if (!user) {
    redirect('/auth/signin');
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">
            Управление тарифом
          </h1>
          <p className="mt-2 text-sm text-gray-500">
            Управляйте своим тарифом и просматривайте историю платежей
          </p>
        </div>

        <CurrentPlan
          plan={user.subscriptionPlan as any}
          onUpgrade={() => {
            // Обработка улучшения тарифа будет реализована позже
          }}
        />

        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            История платежей
          </h2>
          <PaymentHistory payments={user.payments} />
        </div>
      </div>
    </div>
  );
} 