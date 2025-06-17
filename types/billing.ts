export type TariffPlan = 'free' | 'pro' | 'business';

export interface TariffLimits {
  maxPages: number;
  maxBlocks: number;
  maxFileSize: number;
  maxTotalStorage: number;
  maxApiRequests: number;
  maxTeamMembers?: number;
}

export interface Tariff {
  id: TariffPlan;
  name: string;
  price: number;
  currency: string;
  billingInterval: 'month' | 'year';
  limits: TariffLimits;
  features: string[];
}

export interface PaymentHistory {
  id: string;
  amount: number;
  currency: string;
  status: string;
  plan: TariffPlan;
  createdAt: Date;
  receiptUrl?: string;
}

export interface TeamMember {
  id: string;
  email: string;
  name?: string;
  role: 'member' | 'admin';
  joinedAt: Date;
}

export interface Team {
  id: string;
  name: string;
  plan: TariffPlan;
  members: TeamMember[];
  createdAt: Date;
  updatedAt: Date;
}

export interface ApiKey {
  id: string;
  name: string;
  key: string;
  isActive: boolean;
  lastUsed?: Date;
  createdAt: Date;
} 