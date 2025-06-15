import type { Session } from 'express-session';

export interface AuthSession extends Session {
  user?: { id: string; email?: string; role: string };
}
