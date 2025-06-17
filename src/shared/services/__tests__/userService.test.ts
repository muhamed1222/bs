import { UserService } from '../userService';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';

jest.mock('@prisma/client');
jest.mock('bcrypt');

describe('UserService', () => {
  let userService: UserService;
  let mockPrisma: jest.Mocked<PrismaClient>;

  beforeEach(() => {
    mockPrisma = new PrismaClient() as jest.Mocked<PrismaClient>;
    userService = UserService.getInstance();
  });

  describe('createUser', () => {
    it('should create a new user with hashed password', async () => {
      const userData = {
        email: 'test@example.com',
        password: 'password123',
        name: 'Test User',
      };

      const hashedPassword = 'hashed_password';
      (bcrypt.hash as jest.Mock).mockResolvedValue(hashedPassword);

      const expectedUser = {
        id: '1',
        email: userData.email,
        password: hashedPassword,
        name: userData.name,
        role: 'USER',
        plan: 'FREE',
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      mockPrisma.user.create.mockResolvedValue(expectedUser);

      const result = await userService.createUser(userData);

      expect(bcrypt.hash).toHaveBeenCalledWith(userData.password, 10);
      expect(mockPrisma.user.create).toHaveBeenCalledWith({
        data: {
          ...userData,
          password: hashedPassword,
        },
      });
      expect(result).toEqual(expectedUser);
    });
  });

  describe('validatePassword', () => {
    it('should return true for valid password', async () => {
      const user = {
        id: '1',
        email: 'test@example.com',
        password: 'hashed_password',
      } as any;

      const password = 'password123';
      (bcrypt.compare as jest.Mock).mockResolvedValue(true);

      const result = await userService.validatePassword(user, password);

      expect(bcrypt.compare).toHaveBeenCalledWith(password, user.password);
      expect(result).toBe(true);
    });

    it('should return false for invalid password', async () => {
      const user = {
        id: '1',
        email: 'test@example.com',
        password: 'hashed_password',
      } as any;

      const password = 'wrong_password';
      (bcrypt.compare as jest.Mock).mockResolvedValue(false);

      const result = await userService.validatePassword(user, password);

      expect(bcrypt.compare).toHaveBeenCalledWith(password, user.password);
      expect(result).toBe(false);
    });
  });

  describe('canCreatePage', () => {
    it('should return true for FREE plan with no pages', async () => {
      const userId = '1';
      const user = {
        id: userId,
        plan: 'FREE',
      };

      mockPrisma.user.findUnique.mockResolvedValue(user as any);
      mockPrisma.page.count.mockResolvedValue(0);

      const result = await userService.canCreatePage(userId);

      expect(result).toBe(true);
    });

    it('should return false for FREE plan with one page', async () => {
      const userId = '1';
      const user = {
        id: userId,
        plan: 'FREE',
      };

      mockPrisma.user.findUnique.mockResolvedValue(user as any);
      mockPrisma.page.count.mockResolvedValue(1);

      const result = await userService.canCreatePage(userId);

      expect(result).toBe(false);
    });
  });
}); 