const { gql } = require('apollo-server-express');
const JSON = require('graphql-type-json');
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

//* potentially for the date_joined areas
//! date_joined:dateScalar!

//* Potentially at the top
//! scalar JSON
//! scalar dateScalar

const typeDefs = gql`
    type Post {
        _id: ID!
        post_text: String!
        date_created: String!
        author: User!
        reactions: [String]
        edited: Boolean!
        pinned: Boolean!
        thread: Thread!
        comments: [Comment]
    }

    type Comment {
        _id: ID!
        comment_text: String!
        date_created: String!
        author: User!
        reactions: [String]
        edited: Boolean!
        post: Post!
    }

    type Tech {
        _id: ID!
        user: User!
        technology: String!
    }

    type User {
        _id: ID!
        first_name: String!
        last_name: String!
        username: String!
        email: String!
        password: String!
        picture: String!
        bio: String!
        threads: [Thread]
        events: [Event]
        tech_stack: [Tech!]!
        date_joined: String!
        friends: [User]
    }

    type Thread {
        _id: ID!
        title: String!
        posts: [Post]
        events: [Event]
        moderator: User!
        members: [User]
        date_created: String!
    }

    type Auth {
      token: ID!
      user: User
    }

      type Event {
        _id: ID!
        title: String!
        description: String!
        start_date: String!
        end_date: String!
        start_time: String!
        end_time: String!
        owner: User!
        attendees: [User]
        category: String!
        in_person: Boolean!
        location: String!
        image: String!
        thread: Thread!
        comments: [Comment]
        date_created: String!
    }

    type Query {
        comments: [Comment!]!
        author(authorId: ID!): User!
        thread(threadId: ID!): Thread!
        userThreads(userId: ID!): [Thread!]!
        posts: [Posts!]!
        threads: [Thread!]!
        post(postId: ID!): Post!
        events: [Event!]!
        moderator(id: ID!): User!
        members: [User!]!
        owner(userId: ID!): User!
        attendees: [User!]!
        techStack: [Tech!]!
        friends: [User!]!
    }

    type Mutation {
        createPost(threadId: ID!, post_text: String!, date_created: String!, author: User!, edited: Boolean!, pinned: Boolean!): Thread

        createPostComment(postId: ID!, comment_text: String!, date_created: String!, author: User!, edited: Boolean!): Post

        createUser(first_name: String!, last_name: String!, username: String!, email: String!, password: String!, picture: String!, bio: String!, date_joined: String!, tech_stack: [Tech!]!): User

        createThread(moderatorId: ID!, title: String!, date_created: String!): Thread

        createEvent(threadId = ID!, title: String!, description: String!, start_date: String!, end_date: String!, start_time: String!, end_time: String!, owner: User!, category: String!, in_person: Boolean!, location: String!, image: String!, thread: Thread!, date_created: String!): Thread

        createEventComment(eventId: ID!, comment_text: String!, date_created: String!, author: User!, edited: Boolean!): Event

        removePost(threadId: ID!, postId: ID!): Thread

        removePostComment(postId: ID!, commentId: ID!): Post
        
        removeEventComment(eventId: ID!, commentId: ID!): Post

        removeThread(threadId: ID!, userId: ID!): User

        removeEvent(threadId: ID!, eventId: ID!): Thread

        editPost(threadId: ID!, postId: ID!, edited: Boolean!, post_text: String!): Thread

        editPostComment(commentId: ID!, postId!: ID!, edited: Boolean!, comment_text: String!): Post
        
        editEventComment(commentId: ID!, eventId!: ID!, edited: Boolean!, comment_text: String!): Post

        editEvent(eventId: ID!, threadId: ID!, description: String!, start_date: String!, end_date: String!, start_time: String!, end_time: String!, category: String!, in_person: Boolean!, location: String!, image: String!): Thread

        editThread(threadId: ID!, moderatorId: ID!, title: String!): Thread
        
        removeMember(threadId: ID!, memberId: ID!): Thread

        addMember(threadId: ID!, memberId: ID!): Thread

        attendEvent(eventId: ID!, attendeeId: ID!): Event

        leaveEvent(eventId: ID!, attendeeId: ID!): Event

        editUser(userId: ID!, first_name: String!, last_name: String!, username: String!, email: String!, picture: String!, bio: String!)

        addTech(userId: ID!, technology: String!): User

        removeTech(userId: ID!, technology: String!): User

        pinPost(postId: ID!, threadId: ID!, pinned: Boolean!): Thread

        addPostReaction(threadId: ID!, postId: ID!, reaction: String!): Thread

        addCommentReaction(commentId: ID!, postId: ID!, reaction: String!): Post

        addFriend(userId: ID!, friendId: ID!): User

        addMembers(threadId: ID!, member: User!): Thread
    }
`;

module.exports = typeDefs;

// const typeDefs=gql`
// scalar JSON
// scalar dateScalar

// type User {
//     _id: ID
//     first_name: String!
//     last_name:String!
//     username: String!
//     email: String!
//     password:String!
//     picture:String
//     bio:String
//     threads:[Thread]
//     tech_stack:[String]
//     date_joined:dateScalar!
//   }

//   type Thread {
//       _id:ID
//       title:String!
//       posts:[Post]
//       pins:[Pin]//////////////////////////
//       events:[Event]
//       moderator:User
//       members[User]
//       date_created:dateScalar!
//   }

//   type Post{
//       post_text:String!
//       date_created:dateScalar!
//       author:User
//       reactions:[JSON]
//       edited:Boolean
//       thread:Thread
//   }

//   type Event{
//       title:String!
//       description:String!
//       start_date:??????
//       end_date:///////
//       start_time:??????
//       end_time:?????
//       owner:User
//       attendees:[User]
//       category:String
//       in_person:Boolean
//       location:String!
//       image:String
//       thread:Thread
//       comments:[Comment]
//       date_created:dateScalar!
//   }
//   type Comment {
//       comment_text:String!
//       date_created:dateScalar!
//       author:User
//       reactions:[JSON]
//       edited:Boolean
//       post:Post

//   }

  // type Auth {
  //   token: ID!
  //   user: User
  // }

  // type Query{
  //   users: [User]
  //   threads: [Thread]
  //   posts: [Post]
  //   comments: [Comment]
  //   events: [Event]
  //   pin //??
  //   user(id: ID!): User
  //   thread(id: ID!): Thread
  //   post(id:ID!):Post   
  // }
  // type Mutation {
  //     addUser(first_name: String!, last_name: String!, username: String!, email: String!, password: String!, picture: String, bio: String, tech_stack: [String], date_joined: dateScalar!):User


    
  // }
// `




// type Mutation {
//     addSchool(name: String!, location: String!, studentCount: Int!): School
//     updateClass(id: ID!, building: String!): Class
//     addClass(name:String!,building:String!,creditHours:Int!):Class
//   }
