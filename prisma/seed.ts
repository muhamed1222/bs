import { PrismaClient, UserRole, PlanType } from '@prisma/client';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  // Создаем тарифы
  const plans = [
    {
      type: PlanType.FREE,
      name: 'Бесплатный',
      description: 'Базовый функционал для начинающих',
      price: 0,
      features: {
        pages: 1,
        blocks: 10,
        apiKeys: 1,
      },
      limits: {
        storage: '100MB',
        bandwidth: '1GB',
      },
    },
    {
      type: PlanType.PRO,
      name: 'Профессиональный',
      description: 'Расширенные возможности для профессионалов',
      price: 999,
      features: {
        pages: 10,
        blocks: 100,
        apiKeys: 5,
      },
      limits: {
        storage: '1GB',
        bandwidth: '10GB',
      },
    },
    {
      type: PlanType.ENTERPRISE,
      name: 'Корпоративный',
      description: 'Максимальные возможности для бизнеса',
      price: 4999,
      features: {
        pages: Infinity,
        blocks: Infinity,
        apiKeys: 20,
      },
      limits: {
        storage: '10GB',
        bandwidth: '100GB',
      },
    },
  ];

  for (const plan of plans) {
    await prisma.plan.upsert({
      where: { type: plan.type },
      update: plan,
      create: plan,
    });
  }

  // Создаем админа
  const adminPassword = await bcrypt.hash('admin123', 10);
  await prisma.user.upsert({
    where: { email: 'admin@example.com' },
    update: {},
    create: {
      email: 'admin@example.com',
      password: adminPassword,
      name: 'Администратор',
      role: UserRole.ADMIN,
      plan: PlanType.ENTERPRISE,
    },
  });

  // Создаем тестового пользователя
  const userPassword = await bcrypt.hash('user123', 10);
  await prisma.user.upsert({
    where: { email: 'user@example.com' },
    update: {},
    create: {
      email: 'user@example.com',
      password: userPassword,
      name: 'Тестовый пользователь',
      role: UserRole.USER,
      plan: PlanType.FREE,
    },
  });

  console.log('База данных успешно заполнена начальными данными');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  }); 