const { gql } = require('apollo-server-express');
//const JSON = require('graphql-type-json');
const { GraphQLScalarType, Kind } = require('graphql');
// $ npm install graphql-type-json

const dateScalar = new GraphQLScalarType({
  name: 'Date',
  description: 'Date custom scalar type',
  serialize(value) {
    return value.getTime(); // Convert outgoing Date to integer for JSON
  },
  parseValue(value) {
    return new Date(value); // Convert incoming integer to Date
  },
  parseLiteral(ast) {
    if (ast.kind === Kind.INT) {
      return new Date(parseInt(ast.value, 10)); // Convert hard-coded AST string to integer and then to Date
    }
    return null; // Invalid hard-coded value (not an integer)
  },
});


const typeDefs=gql`
scalar JSON
scalar dateScalar
type User {
    _id: ID
    first_name: String!
    last_name:String!
    username: String!
    email: String!
    password:String!
    picture:String
    bio:String
    threads:[Thread]
    tech_stack:[String]
    date_joined:dateScalar
  }
  type Thread {
      _id:ID
      title:String!
      posts:[Post]
      events:[Event]
      moderator:User
      members:[User]
      date_created:dateScalar
  }
  type Post{
      _id:ID
      post_text:String!
      date_created:dateScalar
      author:User
      reactions:[JSON]
      edited:Boolean
      thread:Thread
      comments:[Comment]
  }
  type Event{
      _id:ID
      title:String!
      description:String!
      start_date:dateScalar
      end_date:dateScalar
      start_time:dateScalar
      end_time:dateScalar
      owner:User
      attendees:[User]
      category:String
      in_person:Boolean
      location:String!
      image:String
      thread:Thread
      comments:[Comment]
      date_created:dateScalar
  }
  type Comment {
      _id:ID
      comment_text:String!
      date_created:dateScalar
      author:User
      reactions:[JSON]
      edited:Boolean
      post:Post
  }
  type Query{
    users: [User]
    threads: [Thread]
    posts: [Post]
    comments: [Comment]
    events: [Event]
    user(id:ID!): User
    thread(id:ID!): Thread
    post(id:ID!):Post   
  }
  type Mutation {
      addUser(first_name: String!, last_name: String!, username: String!, email: String!, password: String!, picture: String, bio: String, tech_stack: [String], date_joined: dateScalar):User
      

    
  }
`


// type Mutation {
//     addSchool(name: String!, location: String!, studentCount: Int!): School
//     updateClass(id: ID!, building: String!): Class
//     addClass(name:String!,building:String!,creditHours:Int!):Class
//   }
module.exports = typeDefs;
