import { PrismaClient, ApiKey } from '@prisma/client';
import crypto from 'crypto';

const prisma = new PrismaClient();

export interface CreateApiKeyDto {
  name: string;
  userId: string;
}

export class ApiKeyService {
  private static instance: ApiKeyService;

  private constructor() {}

  public static getInstance(): ApiKeyService {
    if (!ApiKeyService.instance) {
      ApiKeyService.instance = new ApiKeyService();
    }
    return ApiKeyService.instance;
  }

  private generateKey(): string {
    return `sk_${crypto.randomBytes(32).toString('hex')}`;
  }

  async createApiKey(data: CreateApiKeyDto): Promise<ApiKey> {
    const key = this.generateKey();
    
    return prisma.apiKey.create({
      data: {
        ...data,
        key,
      },
    });
  }

  async getApiKeys(userId: string): Promise<ApiKey[]> {
    return prisma.apiKey.findMany({
      where: { userId },
    });
  }

  async getApiKey(key: string): Promise<ApiKey | null> {
    return prisma.apiKey.findUnique({
      where: { key },
    });
  }

  async deleteApiKey(id: string): Promise<void> {
    await prisma.apiKey.delete({
      where: { id },
    });
  }

  maskApiKey(key: string): string {
    return `${key.slice(0, 8)}...${key.slice(-4)}`;
  }
} 