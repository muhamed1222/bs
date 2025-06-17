import NextAuth, { NextAuthOptions } from 'next-auth';
import { SupabaseAdapter } from '@next-auth/supabase-adapter';
import CredentialsProvider from 'next-auth/providers/credentials';
import { UserService } from '@/features/auth/services/userService';
import { z } from 'zod';
import { rateLimit } from '@/shared/lib/rateLimit';
import { getCsrfToken } from 'next-auth/react';

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

export const authOptions: NextAuthOptions = {
  adapter: SupabaseAdapter({
    url: process.env.NEXT_PUBLIC_SUPABASE_URL!,
    secret: process.env.SUPABASE_SERVICE_ROLE_KEY!,
  }),
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        try {
          // Проверяем CSRF-токен
          const csrfToken = await getCsrfToken();
          if (!csrfToken) {
            throw new Error('CSRF token missing');
          }

          // Проверяем rate limit
          const limiter = await rateLimit();
          const result = await limiter.check(5, 'LOGIN_ATTEMPT'); // 5 попыток
          if (!result.success) {
            throw new Error('Too many login attempts');
          }

          // Валидируем входные данные
          const { email, password } = loginSchema.parse(credentials);

          // Получаем пользователя
          const user = await UserService.getUserByEmail(email);
          if (!user) {
            throw new Error('Invalid credentials');
          }

          // Проверяем пароль
          const isValidPassword = await UserService.validatePassword(
            password,
            user.password_hash
          );
          if (!isValidPassword) {
            throw new Error('Invalid credentials');
          }

          // Проверяем 2FA если включена
          if (user.twoFactorEnabled) {
            // TODO: Реализовать 2FA
            throw new Error('2FA not implemented');
          }

          return {
            id: user.id,
            email: user.email,
            name: user.name,
            role: user.role,
          };
        } catch (error) {
          console.error('Auth error:', error);
          return null;
        }
      },
    }),
  ],
  session: {
    strategy: 'jwt',
    maxAge: 24 * 60 * 60, // 24 часа
  },
  cookies: {
    sessionToken: {
      name: `__Secure-next-auth.session-token`,
      options: {
        httpOnly: true,
        sameSite: 'lax',
        path: '/',
        secure: true,
      },
    },
    callbackUrl: {
      name: `__Secure-next-auth.callback-url`,
      options: {
        sameSite: 'lax',
        path: '/',
        secure: true,
      },
    },
    csrfToken: {
      name: `__Host-next-auth.csrf-token`,
      options: {
        httpOnly: true,
        sameSite: 'lax',
        path: '/',
        secure: true,
      },
    },
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.role = user.role;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.role = token.role;
      }
      return session;
    },
  },
  pages: {
    signIn: '/auth/signin',
    error: '/auth/error',
  },
  events: {
    async signIn({ user }) {
      // Сбрасываем счетчик неудачных попыток при успешном входе
      const limiter = await rateLimit();
      await limiter.reset('LOGIN_ATTEMPT');
    },
  },
};

export default NextAuth(authOptions); 