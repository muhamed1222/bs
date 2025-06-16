export const typeDefs = `#graphql
  type User {
    id: ID!
    username: String!
    email: String!
    posts: [Post!]!
  }

  type Post {
    id: ID!
    title: String!
    content: String!
    tags: [String!]
    author: User!
  }

  type Query {
    users: [User!]!
    user(id: ID!): User
    posts: [Post!]!
    post(id: ID!): Post
  }

  type Mutation {
    createUser(username: String!, email: String!, password: String!): User!
    updateUser(id: ID!, username: String, email: String, password: String): User!
    deleteUser(id: ID!): Boolean!

    createPost(title: String!, content: String!, tags: [String!]): Post!
    updatePost(id: ID!, title: String, content: String, tags: [String!]): Post!
    deletePost(id: ID!): Boolean!
  }
`; 