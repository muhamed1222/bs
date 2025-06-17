import { supabase } from '@/shared/lib/supabase';
import { PlanService } from '@/features/auth/services/planService';
import { UserRole } from '../types/team';

export class TeamService {
  /**
   * Приглашает нового члена команды
   */
  static async inviteTeamMember(
    userId: string,
    email: string,
    role: UserRole
  ): Promise<void> {
    // Проверяем, может ли пользователь приглашать
    await PlanService.canInviteTeamMembers(userId);

    // Проверяем, не превышен ли лимит команды
    const { data: teamMembers } = await supabase
      .from('team_members')
      .select('id')
      .eq('team_id', userId);

    if (teamMembers && teamMembers.length >= 10) {
      throw new Error('Team size limit reached');
    }

    // Создаем приглашение
    const { error } = await supabase.from('team_invitations').insert({
      team_id: userId,
      email,
      role,
      status: 'pending',
      expires_at: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(), // 7 дней
    });

    if (error) {
      throw new Error('Failed to create invitation');
    }

    // TODO: Отправить email с приглашением
  }

  /**
   * Принимает приглашение в команду
   */
  static async acceptInvitation(
    invitationId: string,
    userId: string
  ): Promise<void> {
    const { data: invitation } = await supabase
      .from('team_invitations')
      .select('*')
      .eq('id', invitationId)
      .single();

    if (!invitation) {
      throw new Error('Invitation not found');
    }

    if (invitation.status !== 'pending') {
      throw new Error('Invitation is no longer valid');
    }

    if (new Date(invitation.expires_at) < new Date()) {
      throw new Error('Invitation has expired');
    }

    // Добавляем пользователя в команду
    const { error } = await supabase.from('team_members').insert({
      team_id: invitation.team_id,
      user_id: userId,
      role: invitation.role,
    });

    if (error) {
      throw new Error('Failed to add team member');
    }

    // Обновляем статус приглашения
    await supabase
      .from('team_invitations')
      .update({ status: 'accepted' })
      .eq('id', invitationId);
  }

  /**
   * Удаляет члена команды
   */
  static async removeTeamMember(
    teamId: string,
    memberId: string
  ): Promise<void> {
    const { error } = await supabase
      .from('team_members')
      .delete()
      .eq('team_id', teamId)
      .eq('user_id', memberId);

    if (error) {
      throw new Error('Failed to remove team member');
    }
  }

  /**
   * Изменяет роль члена команды
   */
  static async updateTeamMemberRole(
    teamId: string,
    memberId: string,
    newRole: UserRole
  ): Promise<void> {
    const { error } = await supabase
      .from('team_members')
      .update({ role: newRole })
      .eq('team_id', teamId)
      .eq('user_id', memberId);

    if (error) {
      throw new Error('Failed to update team member role');
    }
  }

  /**
   * Получает список членов команды
   */
  static async getTeamMembers(teamId: string): Promise<any[]> {
    const { data, error } = await supabase
      .from('team_members')
      .select(`
        *,
        user:users (
          id,
          email,
          name
        )
      `)
      .eq('team_id', teamId);

    if (error) {
      throw new Error('Failed to get team members');
    }

    return data;
  }

  /**
   * Получает список приглашений
   */
  static async getTeamInvitations(teamId: string): Promise<any[]> {
    const { data, error } = await supabase
      .from('team_invitations')
      .select('*')
      .eq('team_id', teamId)
      .eq('status', 'pending');

    if (error) {
      throw new Error('Failed to get team invitations');
    }

    return data;
  }

  /**
   * Проверяет, имеет ли пользователь доступ к странице
   */
  static async hasPageAccess(
    userId: string,
    pageId: string
  ): Promise<boolean> {
    // Проверяем, является ли пользователь владельцем страницы
    const { data: page } = await supabase
      .from('pages')
      .select('user_id')
      .eq('id', pageId)
      .single();

    if (!page) {
      return false;
    }

    if (page.user_id === userId) {
      return true;
    }

    // Проверяем, является ли пользователь членом команды
    const { data: teamMember } = await supabase
      .from('team_members')
      .select('role')
      .eq('team_id', page.user_id)
      .eq('user_id', userId)
      .single();

    return !!teamMember;
  }
} 