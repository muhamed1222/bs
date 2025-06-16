import { db } from '../db';
import { AppError } from '../errors';
import { AuthRequest } from '../types/auth';

interface Context {
  req: AuthRequest;
}

interface Post {
  id: string;
  userId: string;
  title: string;
  content: string;
  tags?: string[];
}

export const resolvers = {
  Query: {
    users: async () => {
      return db.query('users');
    },
    user: async (_: any, { id }: { id: string }) => {
      const users = await db.query('users', { id });
      return users[0] || null;
    },
    posts: async () => {
      return db.query('posts');
    },
    post: async (_: any, { id }: { id: string }) => {
      const posts = await db.query('posts', { id });
      return posts[0] || null;
    },
  },

  Mutation: {
    createUser: async (_: any, { username, email, password }: { username: string; email: string; password: string }) => {
      return db.insert('users', { username, email, password });
    },
    updateUser: async (_: any, { id, ...data }: { id: string; username?: string; email?: string; password?: string }) => {
      return db.update('users', id, data);
    },
    deleteUser: async (_: any, { id }: { id: string }) => {
      await db.delete('users', id);
      return true;
    },

    createPost: async (_: any, { title, content, tags }: { title: string; content: string; tags?: string[] }, context: Context) => {
      if (!context.req.user?.id) {
        throw new AppError(401, 'User not authenticated');
      }
      return db.insert('posts', { title, content, tags, userId: context.req.user.id });
    },
    updatePost: async (_: any, { id, ...data }: { id: string; title?: string; content?: string; tags?: string[] }, context: Context) => {
      if (!context.req.user?.id) {
        throw new AppError(401, 'User not authenticated');
      }
      const posts = await db.query('posts', { id }) as Post[];
      if (!posts[0]) {
        throw new AppError(404, 'Post not found');
      }
      if (posts[0].userId !== context.req.user.id) {
        throw new AppError(403, 'Forbidden');
      }
      return db.update('posts', id, data);
    },
    deletePost: async (_: any, { id }: { id: string }, context: Context) => {
      if (!context.req.user?.id) {
        throw new AppError(401, 'User not authenticated');
      }
      const posts = await db.query('posts', { id }) as Post[];
      if (!posts[0]) {
        throw new AppError(404, 'Post not found');
      }
      if (posts[0].userId !== context.req.user.id) {
        throw new AppError(403, 'Forbidden');
      }
      await db.delete('posts', id);
      return true;
    },
  },

  User: {
    posts: async (parent: { id: string }) => {
      return db.query('posts', { userId: parent.id });
    },
  },

  Post: {
    author: async (parent: { userId: string }) => {
      const users = await db.query('users', { id: parent.userId });
      return users[0] || null;
    },
  },
}; 