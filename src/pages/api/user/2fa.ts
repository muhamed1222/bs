import { NextApiRequest, NextApiResponse } from 'next';
import { TwoFactorService } from '@/shared/services/twoFactorService';
import { requireAuth } from '@/shared/middleware/requireAuth';
import { csrfProtection } from '@/shared/middleware/security';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    try {
      const user = await requireAuth(req);
      const twoFactorService = TwoFactorService.getInstance();
      const { secret, qrCode } = await twoFactorService.generateSecret(user.id);
      
      res.status(200).json({ secret, qrCode });
    } catch (error) {
      res.status(401).json({ error: 'Unauthorized' });
    }
  } else if (req.method === 'POST') {
    try {
      const user = await requireAuth(req);
      const { token, action } = req.body;
      
      if (!token || !action) {
        return res.status(400).json({ error: 'Token and action are required' });
      }

      const twoFactorService = TwoFactorService.getInstance();
      let result: boolean;

      if (action === 'enable') {
        result = await twoFactorService.enable2FA(user.id, token);
      } else if (action === 'disable') {
        result = await twoFactorService.disable2FA(user.id, token);
      } else {
        return res.status(400).json({ error: 'Invalid action' });
      }

      if (result) {
        res.status(200).json({ message: `2FA ${action}d successfully` });
      } else {
        res.status(400).json({ error: 'Invalid token' });
      }
    } catch (error) {
      res.status(401).json({ error: 'Unauthorized' });
    }
  } else {
    res.setHeader('Allow', ['GET', 'POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}

export default csrfProtection(handler); 