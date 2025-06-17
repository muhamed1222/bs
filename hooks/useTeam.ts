import { useState } from 'react';
import { useSession } from 'next-auth/react';
import { TeamMember } from '@/types/billing';

interface UseTeamResult {
  isLoading: boolean;
  error: string | null;
  inviteMember: (email: string, role: 'member' | 'admin') => Promise<void>;
  removeMember: (memberId: string) => Promise<void>;
  updateMemberRole: (memberId: string, role: 'member' | 'admin') => Promise<void>;
  getTeamMembers: () => Promise<TeamMember[]>;
}

export function useTeam(): UseTeamResult {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { data: session } = useSession();

  const inviteMember = async (email: string, role: 'member' | 'admin') => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch('/api/team/invite', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, role }),
      });

      if (!response.ok) {
        throw new Error('Failed to invite team member');
      }
    } catch (err) {
      setError('Не удалось пригласить участника команды');
      console.error('Error inviting team member:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const removeMember = async (memberId: string) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch(`/api/team/members/${memberId}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Failed to remove team member');
      }
    } catch (err) {
      setError('Не удалось удалить участника команды');
      console.error('Error removing team member:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const updateMemberRole = async (memberId: string, role: 'member' | 'admin') => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch(`/api/team/members/${memberId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ role }),
      });

      if (!response.ok) {
        throw new Error('Failed to update team member role');
      }
    } catch (err) {
      setError('Не удалось обновить роль участника команды');
      console.error('Error updating team member role:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const getTeamMembers = async (): Promise<TeamMember[]> => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch('/api/team/members');
      if (!response.ok) {
        throw new Error('Failed to fetch team members');
      }
      return response.json();
    } catch (err) {
      setError('Не удалось получить список участников команды');
      console.error('Error fetching team members:', err);
      return [];
    } finally {
      setIsLoading(false);
    }
  };

  return {
    isLoading,
    error,
    inviteMember,
    removeMember,
    updateMemberRole,
    getTeamMembers,
  };
} 