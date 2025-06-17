import { supabase } from '@/shared/lib/supabase';
import { User } from '@/shared/types';
import bcrypt from 'bcryptjs';
import { v4 as uuidv4 } from 'uuid';

export class UserService {
  static async createUser(email: string, password: string, name: string): Promise<User> {
    try {
      // Хешируем пароль с солью
      const salt = await bcrypt.genSalt(10);
      const passwordHash = await bcrypt.hash(password, salt);

      // Создаем пользователя в Supabase Auth
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email,
        password,
      });

      if (authError) throw authError;

      // Создаем профиль пользователя
      const { data: userData, error: userError } = await supabase
        .from('users')
        .insert([
          {
            id: authData.user?.id,
            email,
            password_hash: passwordHash,
            name,
            role: 'user',
            subscription_tier: 'free',
            subscription_features: {
              maxPages: 1,
              maxBlocksPerPage: 5,
              allowedBlockTypes: ['text', 'image'],
              analytics: false,
              customDomain: false,
            },
            subscription_expires_at: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
          },
        ])
        .select()
        .single();

      if (userError) throw userError;

      return userData;
    } catch (error) {
      console.error('Error in createUser:', error);
      throw error;
    }
  }

  static async updateUser(userId: string, updates: Partial<User>): Promise<User> {
    try {
      const { data: userData, error: userError } = await supabase
        .from('users')
        .update(updates)
        .eq('id', userId)
        .select()
        .single();

      if (userError) throw userError;

      return userData;
    } catch (error) {
      console.error('Error in updateUser:', error);
      throw error;
    }
  }

  static async changePassword(userId: string, currentPassword: string, newPassword: string): Promise<void> {
    try {
      // Получаем текущий хеш пароля
      const { data: userData, error: userError } = await supabase
        .from('users')
        .select('password_hash')
        .eq('id', userId)
        .single();

      if (userError) throw userError;

      // Проверяем текущий пароль
      const isValidPassword = await bcrypt.compare(currentPassword, userData.password_hash);
      if (!isValidPassword) {
        throw new Error('Invalid current password');
      }

      // Хешируем новый пароль
      const salt = await bcrypt.genSalt(10);
      const newPasswordHash = await bcrypt.hash(newPassword, salt);

      // Обновляем пароль в Supabase Auth
      const { error: authError } = await supabase.auth.updateUser({
        password: newPassword,
      });

      if (authError) throw authError;

      // Обновляем хеш в базе данных
      const { error: updateError } = await supabase
        .from('users')
        .update({ password_hash: newPasswordHash })
        .eq('id', userId);

      if (updateError) throw updateError;
    } catch (error) {
      console.error('Error in changePassword:', error);
      throw error;
    }
  }

  static async getUserById(userId: string): Promise<User | null> {
    try {
      const { data: userData, error: userError } = await supabase
        .from('users')
        .select('*')
        .eq('id', userId)
        .single();

      if (userError) throw userError;

      return userData;
    } catch (error) {
      console.error('Error in getUserById:', error);
      return null;
    }
  }

  static async getUserByEmail(email: string): Promise<User | null> {
    try {
      const { data: userData, error: userError } = await supabase
        .from('users')
        .select('*')
        .eq('email', email)
        .single();

      if (userError) throw userError;

      return userData;
    } catch (error) {
      console.error('Error in getUserByEmail:', error);
      return null;
    }
  }

  static async createSession(userId: string): Promise<string> {
    try {
      const token = uuidv4();
      const expiresAt = new Date(Date.now() + 24 * 60 * 60 * 1000); // 24 часа

      const { error: sessionError } = await supabase
        .from('sessions')
        .insert([
          {
            user_id: userId,
            token,
            expires_at: expiresAt.toISOString(),
          },
        ]);

      if (sessionError) throw sessionError;

      return token;
    } catch (error) {
      console.error('Error in createSession:', error);
      throw error;
    }
  }

  static async validateSession(token: string): Promise<User | null> {
    try {
      const { data: sessionData, error: sessionError } = await supabase
        .from('sessions')
        .select('user_id, expires_at')
        .eq('token', token)
        .single();

      if (sessionError) throw sessionError;

      // Проверяем срок действия сессии
      if (new Date(sessionData.expires_at) < new Date()) {
        // Удаляем просроченную сессию
        await supabase
          .from('sessions')
          .delete()
          .eq('token', token);

        return null;
      }

      // Получаем данные пользователя
      return this.getUserById(sessionData.user_id);
    } catch (error) {
      console.error('Error in validateSession:', error);
      return null;
    }
  }

  static async deleteSession(token: string): Promise<void> {
    try {
      const { error: deleteError } = await supabase
        .from('sessions')
        .delete()
        .eq('token', token);

      if (deleteError) throw deleteError;
    } catch (error) {
      console.error('Error in deleteSession:', error);
      throw error;
    }
  }
} 