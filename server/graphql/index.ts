import { ApolloServer } from 'apollo-server-express';
import { makeExecutableSchema } from '@graphql-tools/schema';
import { typeDefs } from './typeDefs';
import { resolvers } from './resolvers';
import { logger } from '../logger';
import { env } from '../config';

export const initGraphQL = async (app: any) => {
  if (!env.ENABLE_GRAPHQL) {
    logger.info('GraphQL is disabled');
    return;
  }

  const schema = makeExecutableSchema({
    typeDefs,
    resolvers,
  });

  const server = new ApolloServer({
    schema,
    context: ({ req }) => ({
      user: req.user,
    }),
    formatError: (error) => {
      logger.error('GraphQL Error', error);
      return {
        message: error.message,
        path: error.path,
        extensions: error.extensions,
      };
    },
  });

  await server.start();
  server.applyMiddleware({ app, path: '/graphql' });
  logger.info('GraphQL server initialized');
}; 