import { ApolloServer, gql } from 'apollo-server-express';

const typeDefs = gql`
  type Query {
    profile: Profile
  }
  type Profile {
    id: ID!
    name: String!
  }
`;

const resolvers = {
  Query: {
    profile: () => ({ id: 'user', name: 'Demo User' }),
  },
};

export async function initGraphQL(app: import('express').Express) {
  const apollo = new ApolloServer({ typeDefs, resolvers });
  await apollo.start();
  apollo.applyMiddleware({ app, path: '/graphql' });
}
