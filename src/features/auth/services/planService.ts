import { PlanType } from '../types/plan';
import { supabase } from '@/shared/lib/supabase';

export class PlanService {
  /**
   * Проверяет, может ли пользователь создать новую страницу
   * @throws Error если превышен лимит
   */
  static async canCreatePage(userId: string): Promise<boolean> {
    const { data: user } = await supabase
      .from('users')
      .select('plan')
      .eq('id', userId)
      .single();

    if (!user) {
      throw new Error('User not found');
    }

    const { data: pages } = await supabase
      .from('pages')
      .select('id')
      .eq('user_id', userId);

    const pageCount = pages?.length || 0;

    switch (user.plan) {
      case PlanType.FREE:
        if (pageCount >= 3) {
          throw new Error('Free plan limit exceeded. Upgrade to Pro for more pages.');
        }
        break;
      case PlanType.PRO:
        if (pageCount >= 20) {
          throw new Error('Pro plan limit exceeded. Upgrade to Business for unlimited pages.');
        }
        break;
      case PlanType.BUSINESS:
        // Безлимитный тариф
        break;
      default:
        throw new Error('Invalid plan type');
    }

    return true;
  }

  /**
   * Проверяет, может ли пользователь создать приватную страницу
   * @throws Error если функция недоступна
   */
  static async canCreatePrivatePage(userId: string): Promise<boolean> {
    const { data: user } = await supabase
      .from('users')
      .select('plan')
      .eq('id', userId)
      .single();

    if (!user) {
      throw new Error('User not found');
    }

    if (user.plan === PlanType.FREE) {
      throw new Error('Private pages are not available in Free plan. Upgrade to Pro.');
    }

    return true;
  }

  /**
   * Проверяет, может ли пользователь использовать премиум-блоки
   * @throws Error если функция недоступна
   */
  static async canUsePremiumBlock(userId: string, blockType: string): Promise<boolean> {
    const { data: user } = await supabase
      .from('users')
      .select('plan')
      .eq('id', userId)
      .single();

    if (!user) {
      throw new Error('User not found');
    }

    const premiumBlocks = ['form', 'video', 'map', 'calendar'];
    if (premiumBlocks.includes(blockType) && user.plan === PlanType.FREE) {
      throw new Error('Premium blocks are not available in Free plan. Upgrade to Pro.');
    }

    return true;
  }

  /**
   * Проверяет, может ли пользователь использовать API
   * @throws Error если функция недоступна
   */
  static async canUseApi(userId: string): Promise<boolean> {
    const { data: user } = await supabase
      .from('users')
      .select('plan')
      .eq('id', userId)
      .single();

    if (!user) {
      throw new Error('User not found');
    }

    if (user.plan !== PlanType.BUSINESS) {
      throw new Error('API access is only available in Business plan.');
    }

    return true;
  }

  /**
   * Проверяет, может ли пользователь приглашать членов команды
   * @throws Error если функция недоступна
   */
  static async canInviteTeamMembers(userId: string): Promise<boolean> {
    const { data: user } = await supabase
      .from('users')
      .select('plan')
      .eq('id', userId)
      .single();

    if (!user) {
      throw new Error('User not found');
    }

    if (user.plan !== PlanType.BUSINESS) {
      throw new Error('Team access is only available in Business plan.');
    }

    return true;
  }

  /**
   * Проверяет, нужно ли показывать брендинг
   */
  static async shouldShowBranding(userId: string): Promise<boolean> {
    const { data: user } = await supabase
      .from('users')
      .select('plan')
      .eq('id', userId)
      .single();

    if (!user) {
      throw new Error('User not found');
    }

    return user.plan === PlanType.FREE;
  }
} 