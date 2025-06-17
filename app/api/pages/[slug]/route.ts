import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import prisma from '@/lib/prisma';

/**
 * @swagger
 * /api/pages/{slug}:
 *   get:
 *     summary: Получить страницу по slug
 *     description: Возвращает данные страницы по её slug
 *     tags: [Pages]
 *     parameters:
 *       - in: path
 *         name: slug
 *         required: true
 *         schema:
 *           type: string
 *         description: Slug страницы
 *     responses:
 *       200:
 *         description: Успешное получение страницы
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Page'
 *       404:
 *         description: Страница не найдена
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *   put:
 *     summary: Обновить страницу
 *     description: Обновляет данные существующей страницы
 *     tags: [Pages]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: slug
 *         required: true
 *         schema:
 *           type: string
 *         description: Slug страницы
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               description:
 *                 type: string
 *               content:
 *                 type: string
 *               isPublished:
 *                 type: boolean
 *     responses:
 *       200:
 *         description: Страница успешно обновлена
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Page'
 *       401:
 *         description: Не авторизован
 *       403:
 *         description: Нет прав на обновление страницы
 *       404:
 *         description: Страница не найдена
 *   delete:
 *     summary: Удалить страницу
 *     description: Удаляет существующую страницу
 *     tags: [Pages]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: slug
 *         required: true
 *         schema:
 *           type: string
 *         description: Slug страницы
 *     responses:
 *       200:
 *         description: Страница успешно удалена
 *       401:
 *         description: Не авторизован
 *       403:
 *         description: Нет прав на удаление страницы
 *       404:
 *         description: Страница не найдена
 */

export async function GET(
  request: Request,
  { params }: { params: { slug: string } }
) {
  try {
    const page = await prisma.page.findUnique({
      where: { slug: params.slug },
    });

    if (!page) {
      return NextResponse.json(
        { message: 'Page not found', code: 'PAGE_NOT_FOUND' },
        { status: 404 }
      );
    }

    return NextResponse.json(page);
  } catch (error) {
    console.error('Error fetching page:', error);
    return NextResponse.json(
      { message: 'Internal server error', code: 'INTERNAL_ERROR' },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: Request,
  { params }: { params: { slug: string } }
) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user) {
      return NextResponse.json(
        { message: 'Unauthorized', code: 'UNAUTHORIZED' },
        { status: 401 }
      );
    }

    const page = await prisma.page.findUnique({
      where: { slug: params.slug },
    });

    if (!page) {
      return NextResponse.json(
        { message: 'Page not found', code: 'PAGE_NOT_FOUND' },
        { status: 404 }
      );
    }

    if (page.userId !== session.user.id) {
      return NextResponse.json(
        { message: 'Forbidden', code: 'FORBIDDEN' },
        { status: 403 }
      );
    }

    const body = await request.json();
    const updatedPage = await prisma.page.update({
      where: { id: page.id },
      data: {
        title: body.title,
        description: body.description,
        content: body.content,
        isPublished: body.isPublished,
      },
    });

    return NextResponse.json(updatedPage);
  } catch (error) {
    console.error('Error updating page:', error);
    return NextResponse.json(
      { message: 'Internal server error', code: 'INTERNAL_ERROR' },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: { slug: string } }
) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user) {
      return NextResponse.json(
        { message: 'Unauthorized', code: 'UNAUTHORIZED' },
        { status: 401 }
      );
    }

    const page = await prisma.page.findUnique({
      where: { slug: params.slug },
    });

    if (!page) {
      return NextResponse.json(
        { message: 'Page not found', code: 'PAGE_NOT_FOUND' },
        { status: 404 }
      );
    }

    if (page.userId !== session.user.id) {
      return NextResponse.json(
        { message: 'Forbidden', code: 'FORBIDDEN' },
        { status: 403 }
      );
    }

    await prisma.page.delete({
      where: { id: page.id },
    });

    return NextResponse.json({ message: 'Page deleted successfully' });
  } catch (error) {
    console.error('Error deleting page:', error);
    return NextResponse.json(
      { message: 'Internal server error', code: 'INTERNAL_ERROR' },
      { status: 500 }
    );
  }
} 