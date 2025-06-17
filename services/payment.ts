import { TariffPlan, PaymentHistory } from '../types/billing';

interface CreateCheckoutSessionParams {
  plan: TariffPlan;
  successUrl: string;
  cancelUrl: string;
}

interface CreateCheckoutSessionResponse {
  sessionId: string;
  url: string;
}

export class PaymentService {
  private static instance: PaymentService;
  private apiUrl: string;

  private constructor() {
    this.apiUrl = process.env.NEXT_PUBLIC_API_URL || '';
  }

  public static getInstance(): PaymentService {
    if (!PaymentService.instance) {
      PaymentService.instance = new PaymentService();
    }
    return PaymentService.instance;
  }

  async createCheckoutSession(
    params: CreateCheckoutSessionParams
  ): Promise<CreateCheckoutSessionResponse> {
    const response = await fetch(`${this.apiUrl}/api/payments/create-checkout`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(params),
    });

    if (!response.ok) {
      throw new Error('Failed to create checkout session');
    }

    return response.json();
  }

  async getPaymentHistory(): Promise<PaymentHistory[]> {
    const response = await fetch(`${this.apiUrl}/api/payments/history`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error('Failed to fetch payment history');
    }

    return response.json();
  }

  async downloadReceipt(paymentId: string): Promise<Blob> {
    const response = await fetch(
      `${this.apiUrl}/api/payments/${paymentId}/receipt`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );

    if (!response.ok) {
      throw new Error('Failed to download receipt');
    }

    return response.blob();
  }

  async handleWebhook(payload: any): Promise<void> {
    const response = await fetch(`${this.apiUrl}/api/payments/webhook`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      throw new Error('Failed to process webhook');
    }
  }
} 