const { gql } = require('apollo-server-express');

//* Potentially for reaction emojis
// $ npm install graphql-type-json
// const JSON = require('graphql-type-json');
// scalar JSON

const typeDefs = gql`
    type Post {
        _id: ID!
        post_text: String!
        date_created: String
        author: User
        reactions: [String]!
        edited: Boolean
        pinned: Boolean
        thread: Thread
        comments: [Comment]!
    }

    type Comment {
        _id: ID!
        comment_text: String!
        date_created: String
        author: User
        reactions: [String]!
        edited: Boolean
        post: Post
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
        threads: [Thread]!
        events: [Event]!
        tech_stack: [String]!
        date_joined: String
        friends: [User]!
    }

    type Thread {
        _id: ID!
        title: String!
        posts: [Post]!
        events: [Event]!
        moderator: User
        members: [User]!
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
        attendees: [User]!
        category: String!
        in_person: Boolean!
        location: String!
        image: String
        thread: Thread
        comments: [Comment]!
        date_created: String
    }

    type Query {
        allUsers: [User]
        allThreads: [Thread]
        threadDetails(threadId: ID!): Thread
        postDetails(postId: ID!): Post
        eventDetails(eventId: ID!): Event
        userProfile(username: String!): User
        userThreads(username: String!): [Thread]
        userFriends(username: String!): [User]
    }

    type Mutation {

        loginUser(username: String!, password: String!): Auth

        createUser(first_name: String!, last_name: String!, username: String!, email: String!, password: String!): Auth

        addTechnology(userId: ID!, technology: String!): User

        removeTechnology(userId: ID!, technology: String!): User

        addFriend(userId: ID!, friend: String!): User

        removeFriend(userId: ID!, friend: String!): User

        updatePhoto(userId: ID!, picture: String!): User

        updateBio(userId: ID!, bio: String!): User


        createThread(title: String!, moderator: String!): Thread

        removeThread(threadId: ID!): User

        createPost(thread: String!, post_text: String!): Thread

        removePost(thread: String!, postId: ID!): Thread

        updatePost(thread: String!, postId: ID!, post_text: String!): Thread

        pinPost(thread: String!, postId: ID!, pinTitle: String!): Thread

        addPostReaction(threadId: ID!, postId: ID!, reaction: String!): Thread


        createPostComment(postId: ID!, comment_text: String!): Post

        removePostComment(postId: ID!, commentId: ID!): Post

        updatePostComment(postId: ID!, commentId: ID!, edited: Boolean!, comment_text: String!): Post

        addPostCommentReaction(commentId: ID!, postId: ID!, reaction: String!): Post

        createEvent(threadId: ID!, title: String!, description: String!, start_date: String!, end_date: String!, start_time: String!, end_time: String!, category: String!, in_person: Boolean!, location: String!, image: String!): Thread

        updateEvent(threadId: ID!, eventId: ID!, description: String!, start_date: String!, end_date: String!, start_time: String!, end_time: String!, category: String!, in_person: Boolean!, location: String!, image: String!): Thread

        removeEvent(threadId: ID!, eventId: ID!): Thread

        attendEvent(eventId: ID!, attendeeId: ID!): Event

        leaveEvent(eventId: ID!, attendeeId: ID!): Event

        createEventComment(eventId: ID!, comment_text: String!): Event

        removeEventComment(eventId: ID!, commentId: ID!): Event        

        updateEventComment(eventId: ID!, commentId: ID!, edited: Boolean!, comment_text: String!): Event

        addEventCommentReaction(commentId: ID!, eventId: ID!, reaction: String!): Post
    }
`;

module.exports = typeDefs;

// updateUser(userId: ID!, first_name: String!, last_name: String!, username: String!, email: String!): User
