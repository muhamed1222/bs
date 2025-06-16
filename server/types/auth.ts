import { Request } from 'express';
import { Client, Token, RefreshToken, User } from 'oauth2-server';

export interface AuthRequest extends Request {
  user?: User;
}

export interface DBClient extends Client {
  id: string;
  clientId: string;
  clientSecret: string;
  redirectUris: string[];
  grants: string[];
}

export interface DBUser extends User {
  id: string;
  username: string;
  password: string;
  email: string;
}

export interface DBToken extends Token {
  id: string;
  accessToken: string;
  accessTokenExpiresAt: Date;
  refreshToken?: string;
  refreshTokenExpiresAt?: Date;
  clientId: string;
  userId: string;
}

export interface DBRefreshToken extends RefreshToken {
  id: string;
  refreshToken: string;
  refreshTokenExpiresAt: Date;
  clientId: string;
  userId: string;
} 