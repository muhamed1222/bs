import React, { useState } from 'react';
import { Team, TeamMember } from '../../types/billing';
import { TariffRestriction } from '../common/TariffRestriction';

interface TeamManagementProps {
  team: Team;
  onInviteMember: (email: string, role: TeamMember['role']) => Promise<void>;
  onRemoveMember: (memberId: string) => Promise<void>;
  onUpdateRole: (memberId: string, role: TeamMember['role']) => Promise<void>;
}

export const TeamManagement: React.FC<TeamManagementProps> = ({
  team,
  onInviteMember,
  onRemoveMember,
  onUpdateRole,
}) => {
  const [email, setEmail] = useState('');
  const [role, setRole] = useState<TeamMember['role']>('member');
  const [isLoading, setIsLoading] = useState(false);

  const handleInvite = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await onInviteMember(email, role);
      setEmail('');
    } catch (error) {
      console.error('Failed to invite member:', error);
    } finally {
      setIsLoading(false);
    }
  };

  if (team.plan !== 'business') {
    return (
      <div className="text-center py-12">
        <TariffRestriction type="business" />
        <h3 className="mt-4 text-lg font-medium text-gray-900">
          Командный доступ доступен только на тарифе Business
        </h3>
        <p className="mt-2 text-gray-500">
          Обновите тариф, чтобы добавить членов команды и управлять их правами
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="bg-white shadow rounded-lg p-6">
        <h3 className="text-lg font-medium text-gray-900 mb-4">
          Пригласить участника
        </h3>
        <form onSubmit={handleInvite} className="space-y-4">
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
              required
            />
          </div>
          <div>
            <label
              htmlFor="role"
              className="block text-sm font-medium text-gray-700"
            >
              Роль
            </label>
            <select
              id="role"
              value={role}
              onChange={(e) => setRole(e.target.value as TeamMember['role'])}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
            >
              <option value="member">Участник</option>
              <option value="admin">Администратор</option>
            </select>
          </div>
          <button
            type="submit"
            disabled={isLoading}
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
          >
            {isLoading ? 'Отправка...' : 'Пригласить'}
          </button>
        </form>
      </div>

      <div className="bg-white shadow rounded-lg overflow-hidden">
        <div className="px-4 py-5 sm:px-6">
          <h3 className="text-lg font-medium text-gray-900">
            Участники команды
          </h3>
        </div>
        <div className="border-t border-gray-200">
          <ul className="divide-y divide-gray-200">
            {team.members.map((member) => (
              <li key={member.id} className="px-4 py-4 sm:px-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="flex-shrink-0">
                      <div className="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center">
                        <span className="text-gray-500">
                          {member.userId.charAt(0).toUpperCase()}
                        </span>
                      </div>
                    </div>
                    <div className="ml-4">
                      <div className="text-sm font-medium text-gray-900">
                        {member.userId}
                      </div>
                      <div className="text-sm text-gray-500">
                        {member.status === 'pending'
                          ? 'Ожидает подтверждения'
                          : member.role}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    {member.status === 'active' && (
                      <select
                        value={member.role}
                        onChange={(e) =>
                          onUpdateRole(member.id, e.target.value as TeamMember['role'])
                        }
                        className="rounded-md border-gray-300 text-sm focus:border-primary-500 focus:ring-primary-500"
                      >
                        <option value="member">Участник</option>
                        <option value="admin">Администратор</option>
                      </select>
                    )}
                    {member.status === 'active' && (
                      <button
                        onClick={() => onRemoveMember(member.id)}
                        className="text-red-600 hover:text-red-900"
                      >
                        Удалить
                      </button>
                    )}
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}; 