import speakeasy from 'speakeasy';
import QRCode from 'qrcode';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export class TwoFactorService {
  private static instance: TwoFactorService;

  private constructor() {}

  public static getInstance(): TwoFactorService {
    if (!TwoFactorService.instance) {
      TwoFactorService.instance = new TwoFactorService();
    }
    return TwoFactorService.instance;
  }

  async generateSecret(userId: string): Promise<{ secret: string; qrCode: string }> {
    const secret = speakeasy.generateSecret({
      name: `BS:${userId}`,
    });

    const qrCode = await QRCode.toDataURL(secret.otpauth_url!);

    await prisma.user.update({
      where: { id: userId },
      data: {
        twoFactorSecret: secret.base32,
        twoFactorEnabled: false,
      },
    });

    return {
      secret: secret.base32,
      qrCode,
    };
  }

  async verifyToken(userId: string, token: string): Promise<boolean> {
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: { twoFactorSecret: true },
    });

    if (!user?.twoFactorSecret) {
      return false;
    }

    return speakeasy.totp.verify({
      secret: user.twoFactorSecret,
      encoding: 'base32',
      token,
    });
  }

  async enable2FA(userId: string, token: string): Promise<boolean> {
    const isValid = await this.verifyToken(userId, token);

    if (isValid) {
      await prisma.user.update({
        where: { id: userId },
        data: { twoFactorEnabled: true },
      });
    }

    return isValid;
  }

  async disable2FA(userId: string, token: string): Promise<boolean> {
    const isValid = await this.verifyToken(userId, token);

    if (isValid) {
      await prisma.user.update({
        where: { id: userId },
        data: {
          twoFactorEnabled: false,
          twoFactorSecret: null,
        },
      });
    }

    return isValid;
  }
} 