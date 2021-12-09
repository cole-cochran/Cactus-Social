const { gql } = require('apollo-server-express');

const typeDefs = gql`
    type Post {
        _id: ID!
        post_text: String!
        date_created: String
        author: User
        reactions: [String]
        edited: Boolean
        pinned: Boolean
        pinTitle: String
        pinHash: String
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
        event: Event
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
        tech_stack: [String]
        date_joined: String
        friends: [User]
    }

    type Thread {
        _id: ID!
        title: String!
        posts: [Post]
        pinned_posts: [Post]
        events: [Event]
        moderator: User
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
        start_date: String!
        end_date: String!
        start_time: String!
        end_time: String!
        owner: User
        attendees: [User]
        category: String!
        in_person: Boolean!
        location: String!
        image: String
        thread: Thread
        comments: [Comment]
        date_created: String
        edited: Boolean
    }

    type Query {
        allUsers: [User]
        allThreads: [Thread]
        allPosts: [Post]
        allEvents: [Event]
        allComments: [Comment]

        allThreadPosts(threadId: ID!): [Post]
        allPostComments(postId: ID!): [Comment]
        
        userProfile(userId: ID!): User
        userThreads(userId: ID!): [Thread]
        userEvents(userId: ID!): [Event]
        userFriends(userId: ID!): User

        pinnedPosts(threadId: ID!): [Post]
        threadEvents(threadId: ID!): [Event]
        threadDetails(threadId: ID!): Thread
        eventDetails(eventId: ID!): Event
        postDetails(postId: ID!): Post
    }

    type Mutation {

        loginUser(username: String!, password: String!): Auth
        createUser(first_name: String!, last_name: String!, username: String!, email: String!, password: String!): Auth

        addTechnology(userId: ID!, technology: String!): User
        removeTechnology(userId: ID!, technology: String!): User
        addFriend(userId: ID!, friend: ID!): User
        removeFriend(userId: ID!, friend: ID!): User
        updatePhoto(userId: ID!, picture: String!): User
        updateBio(userId: ID!, bio: String!): User

        createThread(title: String!, moderator: ID!): Thread
        removeThread(threadId: ID!): User

        createPost(threadId: ID!, post_text: String!): Thread
        removePost(threadId: ID!, postId: ID!): Thread
        updatePost(threadId: ID!, postId: ID!, post_text: String!): Thread

        pinPost(threadId: ID!, postId: ID!, pinTitle: String!, pinHash: String!): Thread
        unpinPost(threadId: ID!, postId: ID!): Thread

        addPostReaction(threadId: ID!, postId: ID!, reaction: String!): Thread

        createPostComment(postId: ID!, comment_text: String!, author: ID!): Post
        removePostComment(postId: ID!, commentId: ID!): Post
        updatePostComment(postId: ID!, commentId: ID!, comment_text: String!) : Post
        addPostCommentReaction(commentId: ID!, postId: ID!, reaction: String!): Post

        createEvent(threadId: ID!, title: String!, description: String!, start_date: String!, end_date: String!, start_time: String!, end_time: String!, category: String!, in_person: Boolean!, location: String!, image: String!, owner: ID): Event
        updateEvent(threadId: ID!, eventId: ID!, description: String!, start_date: String!, end_date: String!, start_time: String!, end_time: String!, category: String!, in_person: Boolean!, location: String!, image: String): Event
        removeEvent(threadId: ID!, eventId: ID!, userId: ID!): Thread

        attendEvent(eventId: ID!, attendee: ID!): Event
        leaveEvent(eventId: ID!, attendee: ID!): Event

        createEventComment(eventId: ID!, comment_text: String!): Event
        removeEventComment(eventId: ID!, commentId: ID!): Event
        updateEventComment(eventId: ID!, commentId: ID!, comment_text: String!): Event
        addEventCommentReaction(commentId: ID!, eventId: ID!, reaction: String!): Event
    }
`;

module.exports = typeDefs;
