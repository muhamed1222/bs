import { NextApiRequest, NextApiResponse } from 'next';
import { UserService } from '../services/userService';

export interface AuthenticatedRequest extends NextApiRequest {
  user?: {
    id: string;
    email: string;
    role: string;
  };
}

export async function withAuth(
  req: AuthenticatedRequest,
  res: NextApiResponse,
  next: () => Promise<void>
) {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    
    if (!token) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    const userService = UserService.getInstance();
    const decoded = userService.verifyToken(token);

    if (!decoded) {
      return res.status(401).json({ error: 'Invalid token' });
    }

    req.user = decoded;
    await next();
  } catch (error) {
    return res.status(401).json({ error: 'Unauthorized' });
  }
}

export async function withAdmin(
  req: AuthenticatedRequest,
  res: NextApiResponse,
  next: () => Promise<void>
) {
  try {
    await withAuth(req, res, async () => {
      if (req.user?.role !== 'ADMIN') {
        return res.status(403).json({ error: 'Forbidden' });
      }
      await next();
    });
  } catch (error) {
    return res.status(403).json({ error: 'Forbidden' });
  }
} 