import Stripe from 'stripe';
import { PlanType } from '@/features/auth/types/plan';
import { supabase } from '@/shared/lib/supabase';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2023-10-16',
});

const PLAN_PRICES = {
  [PlanType.PRO]: {
    monthly: 'price_pro_monthly',
    yearly: 'price_pro_yearly',
  },
  [PlanType.BUSINESS]: {
    monthly: 'price_business_monthly',
    yearly: 'price_business_yearly',
  },
};

export class PaymentService {
  /**
   * Создает сессию оплаты для смены тарифа
   */
  static async createCheckoutSession(
    userId: string,
    plan: PlanType,
    interval: 'monthly' | 'yearly'
  ): Promise<string> {
    const { data: user } = await supabase
      .from('users')
      .select('email, stripe_customer_id')
      .eq('id', userId)
      .single();

    if (!user) {
      throw new Error('User not found');
    }

    // Создаем или получаем Stripe customer
    let customerId = user.stripe_customer_id;
    if (!customerId) {
      const customer = await stripe.customers.create({
        email: user.email,
        metadata: {
          userId,
        },
      });
      customerId = customer.id;

      // Сохраняем customer_id в базе
      await supabase
        .from('users')
        .update({ stripe_customer_id: customerId })
        .eq('id', userId);
    }

    // Создаем сессию оплаты
    const session = await stripe.checkout.sessions.create({
      customer: customerId,
      payment_method_types: ['card'],
      line_items: [
        {
          price: PLAN_PRICES[plan][interval],
          quantity: 1,
        },
      ],
      mode: 'subscription',
      success_url: `${process.env.NEXT_PUBLIC_APP_URL}/billing?success=true`,
      cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/billing?canceled=true`,
      metadata: {
        userId,
        plan,
        interval,
      },
    });

    return session.url!;
  }

  /**
   * Обрабатывает webhook от Stripe
   */
  static async handleWebhook(event: Stripe.Event): Promise<void> {
    switch (event.type) {
      case 'checkout.session.completed': {
        const session = event.data.object as Stripe.Checkout.Session;
        const { userId, plan, interval } = session.metadata!;

        // Обновляем тариф пользователя
        await supabase
          .from('users')
          .update({
            plan,
            subscription_id: session.subscription as string,
            subscription_status: 'active',
            subscription_interval: interval,
            subscription_start_date: new Date().toISOString(),
          })
          .eq('id', userId);

        break;
      }

      case 'customer.subscription.updated': {
        const subscription = event.data.object as Stripe.Subscription;
        const userId = subscription.metadata.userId;

        // Обновляем статус подписки
        await supabase
          .from('users')
          .update({
            subscription_status: subscription.status,
            subscription_current_period_end: new Date(
              subscription.current_period_end * 1000
            ).toISOString(),
          })
          .eq('id', userId);

        break;
      }

      case 'customer.subscription.deleted': {
        const subscription = event.data.object as Stripe.Subscription;
        const userId = subscription.metadata.userId;

        // Возвращаем пользователя на бесплатный тариф
        await supabase
          .from('users')
          .update({
            plan: PlanType.FREE,
            subscription_id: null,
            subscription_status: 'canceled',
            subscription_interval: null,
            subscription_start_date: null,
            subscription_current_period_end: null,
          })
          .eq('id', userId);

        break;
      }
    }
  }

  /**
   * Создает портал для управления подпиской
   */
  static async createCustomerPortalSession(userId: string): Promise<string> {
    const { data: user } = await supabase
      .from('users')
      .select('stripe_customer_id')
      .eq('id', userId)
      .single();

    if (!user?.stripe_customer_id) {
      throw new Error('No active subscription found');
    }

    const session = await stripe.billingPortal.sessions.create({
      customer: user.stripe_customer_id,
      return_url: `${process.env.NEXT_PUBLIC_APP_URL}/billing`,
    });

    return session.url;
  }

  /**
   * Получает историю платежей пользователя
   */
  static async getPaymentHistory(userId: string): Promise<any[]> {
    const { data: user } = await supabase
      .from('users')
      .select('stripe_customer_id')
      .eq('id', userId)
      .single();

    if (!user?.stripe_customer_id) {
      return [];
    }

    const payments = await stripe.paymentIntents.list({
      customer: user.stripe_customer_id,
      limit: 10,
    });

    return payments.data.map(payment => ({
      id: payment.id,
      amount: payment.amount / 100,
      currency: payment.currency,
      status: payment.status,
      created: new Date(payment.created * 1000),
    }));
  }
} 