import { useSession } from 'next-auth/react';
import { TARIFFS } from '@/constants/tariffs';
import { TariffPlan } from '@/types/billing';

interface UseTariffLimitsResult {
  currentPlan: TariffPlan;
  limits: {
    maxPages: number;
    maxBlocks: number;
    maxFileSize: number;
    maxTotalStorage: number;
    maxApiRequests: number;
    maxTeamMembers?: number;
  };
  isFeatureAvailable: (feature: string) => boolean;
  isPlanSufficient: (requiredPlan: TariffPlan) => boolean;
  getRequiredPlan: (feature: string) => TariffPlan | null;
}

export function useTariffLimits(): UseTariffLimitsResult {
  const { data: session } = useSession();
  const currentPlan = (session?.user?.subscriptionPlan as TariffPlan) || 'free';
  const currentTariff = TARIFFS[currentPlan];

  const isFeatureAvailable = (feature: string): boolean => {
    return currentTariff.features.includes(feature);
  };

  const isPlanSufficient = (requiredPlan: TariffPlan): boolean => {
    const planOrder: TariffPlan[] = ['free', 'pro', 'business'];
    const currentPlanIndex = planOrder.indexOf(currentPlan);
    const requiredPlanIndex = planOrder.indexOf(requiredPlan);
    return currentPlanIndex >= requiredPlanIndex;
  };

  const getRequiredPlan = (feature: string): TariffPlan | null => {
    for (const [plan, tariff] of Object.entries(TARIFFS)) {
      if (tariff.features.includes(feature)) {
        return plan as TariffPlan;
      }
    }
    return null;
  };

  return {
    currentPlan,
    limits: currentTariff.limits,
    isFeatureAvailable,
    isPlanSufficient,
    getRequiredPlan,
  };
} 