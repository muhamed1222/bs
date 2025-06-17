import { NextApiRequest, NextApiResponse } from 'next';
import { withAuth, AuthenticatedRequest } from '@/shared/middleware/auth';
import { ApiKeyService } from '@/shared/services/apiKeyService';

export default async function handler(
  req: AuthenticatedRequest,
  res: NextApiResponse
) {
  if (req.method === 'GET') {
    return withAuth(req, res, async () => {
      const apiKeyService = ApiKeyService.getInstance();
      const apiKeys = await apiKeyService.getApiKeys(req.user!.id);

      // Маскируем ключи перед отправкой
      const maskedKeys = apiKeys.map(key => ({
        ...key,
        key: apiKeyService.maskApiKey(key.key),
      }));

      return res.status(200).json(maskedKeys);
    });
  }

  if (req.method === 'POST') {
    return withAuth(req, res, async () => {
      const { name } = req.body;

      if (!name) {
        return res.status(400).json({ error: 'Name is required' });
      }

      const apiKeyService = ApiKeyService.getInstance();
      const apiKey = await apiKeyService.createApiKey({
        name,
        userId: req.user!.id,
      });

      return res.status(201).json(apiKey);
    });
  }

  if (req.method === 'DELETE') {
    return withAuth(req, res, async () => {
      const { id } = req.body;

      if (!id) {
        return res.status(400).json({ error: 'API key ID is required' });
      }

      const apiKeyService = ApiKeyService.getInstance();
      await apiKeyService.deleteApiKey(id);

      return res.status(204).end();
    });
  }

  return res.status(405).json({ error: 'Method not allowed' });
} 