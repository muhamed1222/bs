import { Response, NextFunction } from 'express';
import { OAuth2Server } from 'oauth2-server';
import { env } from '../config';
import { AppError } from '../errors';
import { db } from '../db';
import { AuthRequest, DBClient, DBUser, DBToken, DBRefreshToken } from '../types/auth';

const oauth = new OAuth2Server({
  model: {
    async getClient(clientId: string, clientSecret: string) {
      const client = await db.query<DBClient>('clients', { clientId, clientSecret });
      return client[0] || null;
    },

    async getUser(username: string, password: string) {
      const user = await db.query<DBUser>('users', { username });
      if (!user[0]) return null;
      
      // В реальном приложении здесь должна быть проверка хеша пароля
      if (user[0].password !== password) return null;
      
      return user[0];
    },

    async saveToken(token: Partial<DBToken>, client: DBClient, user: DBUser) {
      const savedToken = await db.insert<DBToken>('tokens', {
        ...token,
        clientId: client.id,
        userId: user.id,
      });
      return savedToken;
    },

    async getAccessToken(token: string) {
      const accessToken = await db.query<DBToken>('tokens', { accessToken: token });
      return accessToken[0] || null;
    },

    async getRefreshToken(token: string) {
      const refreshToken = await db.query<DBRefreshToken>('tokens', { refreshToken: token });
      return refreshToken[0] || null;
    },

    async revokeToken(token: DBToken) {
      await db.delete('tokens', token.id);
      return true;
    },

    async verifyScope(token: DBToken, scope: string) {
      return true; // В реальном приложении здесь должна быть проверка scope
    },
  },
});

const handleOAuthRequest = async (
  handler: (req: any, res: Response) => Promise<any>,
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    await handler(req, res);
  } catch (error) {
    next(new AppError(400, 'OAuth request failed'));
  }
};

export const authenticateRequest = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const token = await oauth.authenticate(req as any, res);
    req.user = token.user;
    next();
  } catch (error) {
    next(new AppError(401, 'Unauthorized'));
  }
};

export const authorizeRequest = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  await handleOAuthRequest(oauth.authorize.bind(oauth), req, res, next);
};

export const tokenRequest = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  await handleOAuthRequest(oauth.token.bind(oauth), req, res, next);
}; 