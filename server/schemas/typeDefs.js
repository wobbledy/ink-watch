const { gql } = require('apollo-server-express');


const typeDefs = gql`
  scalar Upload

  type User {
    _id: ID!
    username: String
    email: String
    password: String
    posts: [Post]
  }

  type Post {
    _id: ID
   
    postText: String
    postAuthor: String
    createdAt: String
    comments: [Comment]
  }

  type Comment {
    _id: ID
    commentText: String
    commentAuthor: String
    createdAt: String
  }

  type Auth {
    token: ID!
    user: User
  }


  type Query {
    users: [User]
    user(username: String!): User
    posts(username: String): [Post]
    post(postId: ID!): Post
    me: User
    images: [String]
  }

  type Mutation {
    addUser(username: String!, email: String!, password: String!): Auth
    loginUser(username: String, password: String!): Auth
    addPost(postText: String!, postAuthor: String!): Post
    addComment(postId: ID!, commentText: String!): Post
    removePost(postId: ID!): Post
    removeComment(postId: ID!, commentId: ID!): Post
  
  }
`;

module.exports = typeDefs;
