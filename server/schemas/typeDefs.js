const { gql } = require("apollo-server-express");
//const JSON = require('graphql-type-json');
// const { GraphQLScalarType, Kind } = require('graphql');
// $ npm install graphql-type-json
const typeDefs = gql`
    type Post {
        _id: ID!
        post_text: String!
        date_created: String
        author: User
        reactions: [String]
        edited: Boolean
        pinned: Boolean
        thread: Thread
        comments: [Comment]
    }

    type Comment {
        _id: ID!
        comment_text: String!
        date_created: String
        author: User
        reactions: [String]
        edited: Boolean
        post: Post
    }

    type Tech 
      {
        _id: ID!
        technology: [String]!
        date_created:String
        user_id: User
        
      }
    

    type User {
        _id: ID!
        first_name: String!
        last_name: String!
        username: String!
        email: String!
        password: String!
        picture: String
        bio: String
        threads: [Thread]
        events: [Event]
        date_joined: String
        friends: [User]
        posts:[Post]
    }

    type Thread {
        _id: ID!
        title: String!
        posts: [Post]
        events: [Event]
        moderator: [User]
        members: [User]
        date_created: String
    }

    type Auth {
      token: ID!
      user: User
    }

    type Event {
        _id: ID!
        title: String!
        description: String!
        start_date: String
        end_date: String
        start_time: String
        end_time: String
        owner: User
        attendees: [User]
        category: String
        in_person: Boolean!
        location: String!
        image: String
        thread: Thread
        comments: [Comment]
        date_created: String
    }

    type Query {
        users:[User]
        comments: [Comment]
        author(authorId: ID!): User
        thread(threadId: ID!): Thread
        threads(userId: ID!): [Thread]
        posts: [Post]
        post(postId: ID!): Post
        events: [Event]
        moderator(userId: ID!): User
        members: [User]
        owner(userId: ID!): User
        attendees: [User]
        techStack: [Tech]
        friends: [User]
    }

    type Mutation {
        createPost(threadId: ID!, post_text: String!, date_created: String!, author: String!, edited: Boolean!, pinned: Boolean!): Thread

        createPostComment(postId: ID!, comment_text: String!, date_created: String!, author: String!, edited: Boolean!): Post

        createUser(first_name: String!, last_name: String!, username: String!, email: String!, password: String!, picture: String!, bio: String!, date_joined: String!): User

        createThread(moderatorId: ID!, title: String!, date_created: String!): Thread

        createEvent(threadId:ID!, title: String!, description: String!, start_date: String, end_date: String, start_time: String, end_time: String, owner: String!, category: String!, in_person: Boolean!, location: String!, image: String!, thread: String!, date_created: String!): Thread

        createEventComment(eventId: ID!, comment_text: String!, date_created: String!, author: String!, edited: Boolean!): Event

        removePost(threadId: ID!, postId: ID!): Thread

        removePostComment(postId: ID!, commentId: ID!): Post
        
        removeEventComment(eventId: ID!, commentId: ID!): Event

        removeThread(threadId: ID!, userId: ID!): User

        removeEvent(threadId: ID!, eventId: ID!): Thread

        editPost(threadId: ID!, postId: ID!, edited: Boolean!, post_text: String!): Thread

        editPostComment(commentId: ID!, postId: ID!, edited: Boolean!, comment_text: String!): Post
        
        editEventComment(commentId: ID!, eventId: ID!, edited: Boolean!, comment_text: String!): Event

        editEvent(eventId: ID!, threadId: ID!, description: String!, start_date: String!, end_date: String!, start_time: String!, end_time: String!, category: String!, in_person: Boolean!, location: String!, image: String!): Thread

        editThread(threadId: ID!, moderatorId: ID!, title: String!, moderator: [String]!, members: [String]!): User

        attendEvent(eventId: ID!, attendeeId: ID!): Event

        leaveEvent(eventId: ID!, attendeeId: ID!): Event

        editUser(userId: ID!, first_name: String!, last_name: String!, username: String!, email: String!, picture: String!, bio: String!): User

        addTech(userId: ID!, technology: String!): User

        removeTech(userId: ID!, technology: String!): User

        pinPost(postId: ID!, threadId: ID!, pinned: Boolean!): Thread

        addPostReaction(threadId: ID!, postId: ID!, reaction: String!): Thread

        addCommentReaction(commentId: ID!, postId: ID!, reaction: String!): Post

        addFriend(userId: ID!, friendId: ID!): User

    }
`;

module.exports = typeDefs;
