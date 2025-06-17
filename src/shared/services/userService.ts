import { PrismaClient, User, UserRole, PlanType } from '@prisma/client';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const prisma = new PrismaClient();

export interface CreateUserDto {
  email: string;
  password: string;
  name?: string;
}

export interface UpdateUserDto {
  name?: string;
  password?: string;
  plan?: PlanType;
}

export class UserService {
  private static instance: UserService;
  private readonly SALT_ROUNDS = 10;
  private readonly JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';

  private constructor() {}

  public static getInstance(): UserService {
    if (!UserService.instance) {
      UserService.instance = new UserService();
    }
    return UserService.instance;
  }

  async createUser(data: CreateUserDto): Promise<User> {
    const hashedPassword = await bcrypt.hash(data.password, this.SALT_ROUNDS);
    
    return prisma.user.create({
      data: {
        ...data,
        password: hashedPassword,
      },
    });
  }

  async updateUser(id: string, data: UpdateUserDto): Promise<User> {
    const updateData: any = { ...data };
    
    if (data.password) {
      updateData.password = await bcrypt.hash(data.password, this.SALT_ROUNDS);
    }

    return prisma.user.update({
      where: { id },
      data: updateData,
    });
  }

  async getUserById(id: string): Promise<User | null> {
    return prisma.user.findUnique({
      where: { id },
    });
  }

  async getUserByEmail(email: string): Promise<User | null> {
    return prisma.user.findUnique({
      where: { email },
    });
  }

  async validatePassword(user: User, password: string): Promise<boolean> {
    return bcrypt.compare(password, user.password);
  }

  generateToken(user: User): string {
    return jwt.sign(
      {
        id: user.id,
        email: user.email,
        role: user.role,
      },
      this.JWT_SECRET,
      { expiresIn: '7d' }
    );
  }

  verifyToken(token: string): any {
    try {
      return jwt.verify(token, this.JWT_SECRET);
    } catch (error) {
      return null;
    }
  }

  async getUserPages(userId: string) {
    return prisma.page.findMany({
      where: { userId },
      include: { blocks: true },
    });
  }

  async canCreatePage(userId: string): Promise<boolean> {
    const user = await this.getUserById(userId);
    if (!user) return false;

    const pageCount = await prisma.page.count({
      where: { userId },
    });

    const limits = {
      [PlanType.FREE]: 1,
      [PlanType.PRO]: 10,
      [PlanType.ENTERPRISE]: Infinity,
    };

    return pageCount < limits[user.plan];
  }

  async isAdmin(userId: string): Promise<boolean> {
    const user = await this.getUserById(userId);
    return user?.role === UserRole.ADMIN;
  }
} 