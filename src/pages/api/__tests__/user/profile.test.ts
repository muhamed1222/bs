import { createMocks } from 'node-mocks-http';
import handler from '../../user/profile';
import { UserService } from '@/shared/services/userService';
import { CacheService } from '@/shared/services/cacheService';

jest.mock('@/shared/services/userService');
jest.mock('@/shared/services/cacheService');

describe('Profile API', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('GET /api/user/profile', () => {
    it('should return user profile from cache', async () => {
      const { req, res } = createMocks({
        method: 'GET',
        headers: {
          authorization: 'Bearer valid_token',
        },
      });

      const mockUser = {
        id: '1',
        email: 'test@example.com',
        name: 'Test User',
      };

      const mockCacheService = {
        getProfile: jest.fn().mockResolvedValue(mockUser),
      };

      (CacheService.getInstance as jest.Mock).mockReturnValue(mockCacheService);

      await handler(req, res);

      expect(res._getStatusCode()).toBe(200);
      expect(JSON.parse(res._getData())).toEqual(mockUser);
      expect(mockCacheService.getProfile).toHaveBeenCalledWith('1');
    });

    it('should return user profile from database if not in cache', async () => {
      const { req, res } = createMocks({
        method: 'GET',
        headers: {
          authorization: 'Bearer valid_token',
        },
      });

      const mockUser = {
        id: '1',
        email: 'test@example.com',
        name: 'Test User',
        password: 'hashed_password',
      };

      const mockCacheService = {
        getProfile: jest.fn().mockResolvedValue(null),
        setProfile: jest.fn(),
      };

      const mockUserService = {
        getUserById: jest.fn().mockResolvedValue(mockUser),
      };

      (CacheService.getInstance as jest.Mock).mockReturnValue(mockCacheService);
      (UserService.getInstance as jest.Mock).mockReturnValue(mockUserService);

      await handler(req, res);

      expect(res._getStatusCode()).toBe(200);
      expect(JSON.parse(res._getData())).toEqual({
        id: '1',
        email: 'test@example.com',
        name: 'Test User',
      });
      expect(mockCacheService.setProfile).toHaveBeenCalled();
    });

    it('should return 401 if not authenticated', async () => {
      const { req, res } = createMocks({
        method: 'GET',
      });

      await handler(req, res);

      expect(res._getStatusCode()).toBe(401);
    });
  });

  describe('PUT /api/user/profile', () => {
    it('should update user profile', async () => {
      const { req, res } = createMocks({
        method: 'PUT',
        headers: {
          authorization: 'Bearer valid_token',
        },
        body: {
          name: 'Updated Name',
          password: 'new_password',
        },
      });

      const mockUser = {
        id: '1',
        email: 'test@example.com',
        name: 'Updated Name',
        password: 'new_hashed_password',
      };

      const mockUserService = {
        updateUser: jest.fn().mockResolvedValue(mockUser),
      };

      const mockCacheService = {
        invalidateProfile: jest.fn(),
      };

      (UserService.getInstance as jest.Mock).mockReturnValue(mockUserService);
      (CacheService.getInstance as jest.Mock).mockReturnValue(mockCacheService);

      await handler(req, res);

      expect(res._getStatusCode()).toBe(200);
      expect(JSON.parse(res._getData())).toEqual({
        id: '1',
        email: 'test@example.com',
        name: 'Updated Name',
      });
      expect(mockCacheService.invalidateProfile).toHaveBeenCalledWith('1');
    });

    it('should return 401 if not authenticated', async () => {
      const { req, res } = createMocks({
        method: 'PUT',
        body: {
          name: 'Updated Name',
        },
      });

      await handler(req, res);

      expect(res._getStatusCode()).toBe(401);
    });
  });
}); 