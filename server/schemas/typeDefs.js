const { gql } = require('apollo-server-express');

const typeDefs = gql`
    type Post {
        _id: ID!
        post_text: String!
        date_created: String
        author: User
        reactions: [String]
        edited: Boolean
        thread: Thread
        comments: [Comment]
    }

    type Portfolio {
        _id: ID!
        title: String!
        description: String!
        owner: User
        image: String
        responsibilities: String
        techstack: String
        repo: String
        demo: String
    }

    type PinnedPost {
        _id: ID!
        pinTitle: String
        pinHash: String
        post: Post
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

    type Chat {
        _id: ID!
        users: [User]
        messages: [ChatMessage]
        date_created: String
    }

    type ChatMessage {
        _id: ID!
        sender: User
        message: String!
        edited: Boolean
        chat: Chat
        date_created: String
    }

    type Invites {
        _id: ID!
        user: User
        thread: Thread
        event: Event
        date_created: String
    }

    type User {
        _id: ID!
        first_name: String!
        last_name: String!
        username: String!
        email: String!
        password: String!
        picture: String
        picture_type: String
        bio: String
        threads: [Thread]
        events: [Event]
        tech_stack: [String]
        date_joined: String
        friends: [User]
        pinned_posts: [PinnedPost]
        friend_requests: [User]
        sent_friend_requests: [User]
        chats: [Chat]
        received_invites: [Invites]
        sent_invites: [Invites]
        portfolio_projects: [Portfolio]
        github: String
		linkedin: String
		portfolio_page: String
    }

    type Thread {
        _id: ID!
        title: String!
        posts: [Post]
        private: Boolean
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
        private: Boolean
        attendees: [User]
        category: String!
        in_person: Boolean!
        location: String!
        image: String
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
        
        oneUser(username: String!): User
        userProfile(userId: ID!): User
        userThreads(userId: ID!): [Thread]
        userEvents(userId: ID!): [Event]
        userFriends(userId: ID!): User

        pinnedPosts(userId: ID!): [Post]
        threadEvents(threadId: ID!): [Event]
        threadDetails(threadId: ID!): Thread
        eventDetails(eventId: ID!): Event
        postDetails(postId: ID!): Post

        friendRequests(userId: ID!): User
        sentFriendRequests(userId: ID!): User

        chatDetails(chatId: ID!): Chat
        userChats(userId: ID!): [Chat]
        
        sentInvites(userId: ID!): User
        receivedInvites(userId: ID!): User
    }

    type Mutation {
        updatePinnedPost(userId: ID!, postId: ID!, pinTitle: String, pinHash: String): User
        removePinnedPost(userId: ID!, pinnedId: ID!): User

        loginUser(username: String!, password: String!): Auth
        createUser(first_name: String!, last_name: String!, username: String!, email: String!, password: String!): Auth

        addTechnology(userId: ID!, technology: String!): User
        removeTechnology(userId: ID!, technology: String!): User

        addFriend(userId: ID!, friend: ID!): User
        removeFriend(userId: ID!, friend: ID!): User

        updatePhoto(userId: ID!, picture: String!, picture_type: String!): User
        updateBio(userId: ID!, bio: String!): User

        createThread(title: String!, private: Boolean!, moderator: ID!): Thread
        leaveThread(userId: ID!, threadId: ID!): User
        removeThread(threadId: ID!): User

        createPost(threadId: ID!, post_text: String!, author: ID!): Post
        removePost(threadId: ID!, postId: ID!): Thread
        
        updatePost(threadId: ID!, postId: ID!, post_text: String!): Thread

        addPostReaction(threadId: ID!, postId: ID!, reaction: String!): Thread
        removePostReaction(threadId: ID!, postId: ID!, reaction: String!): Thread

        createPostComment(postId: ID!, comment_text: String!, author: ID!): Comment
        removePostComment(postId: ID!, commentId: ID!): Post
        updatePostComment(postId: ID!, commentId: ID!, comment_text: String!) : Post

        addPostCommentReaction(commentId: ID!, postId: ID!, reaction: String!): Post
        removePostCommentReaction(commentId: ID!, postId: ID!, reaction: String!): Post

        createEvent(title: String!, description: String!, start_date: String!, end_date: String!, start_time: String!, private: Boolean!, end_time: String!, category: String!, in_person: Boolean!, location: String!, image: String!, owner: ID!): Event
        updateEvent(eventId: ID!, title: String!, description: String!, start_date: String!, end_date: String!, start_time: String!, private: Boolean!, end_time: String!, category: String!, in_person: Boolean!, location: String!, image: String!): Event
        removeEvent(eventId: ID!, userId: ID!): User

        attendEvent(eventId: ID!, attendee: ID!): Event
        leaveEvent(eventId: ID!, attendee: ID!): Event

        createEventComment(eventId: ID!, comment_text: String!, author: ID!): Comment
        removeEventComment(eventId: ID!, commentId: ID!): Event
        updateEventComment(eventId: ID!, commentId: ID!, comment_text: String!): Event
        
        addEventCommentReaction(commentId: ID!, eventId: ID!, reaction: String!): Event
        removeEventCommentReaction(commentId: ID!, eventId: ID!, reaction: String!): Event

        sendFriendRequest(userId: ID!, friend: ID!): User
        denyFriendRequest(userId: ID!, friend: ID!): User

        createChatMessage(chatId: ID!, sender: ID!, message: String!): Chat
        deleteChatMessage(chatId: ID!, messageId: ID!): Chat
        updateChatMessage(chatId: ID!, messageId: ID!, message: String!): Chat

        createChat(participants: [ID!]!): Chat
        removeChat(chatId: ID!, userId: ID!): User
        deleteChat(chatId: ID!): [Chat]

        sendEventInvite(sender: ID!, receiver: ID!, eventId: ID!): User
        sendThreadInvite(sender: ID!, receiver: ID!, threadId: ID!): User

        acceptEventInvite(userId: ID!, senderId: ID!, eventId: ID!): Event
        acceptThreadInvite(userId: ID!, senderId: ID!, threadId: ID!): Thread

        rejectEventInvite(userId: ID!, senderId: ID!, eventId: ID!): User
        rejectThreadInvite(userId: ID!, senderId: ID!, threadId: ID!): User

        createPortfolioProject(owner: ID!, title: String!, description: String!, image: String, responsibilities: String, techstack: String, repo: String, demo: String): User

        updatePortfolioProject(userId: ID!, projectId: ID!, title: String!, description: String!, image: String!, responsibilities: String!, techstack: String!, repo: String!, demo: String!): User

        deletePortfolioProject(projectId: ID!, userId: ID!): User

        updateUserLinks(userId: ID!, linkedin: String!, github: String!, portfolio_page: String!): User
    }
`;

module.exports = typeDefs;


// pinPost(threadId: ID!, postId: ID!, pinTitle: String!, pinHash: String!): Thread
// unpinPost(threadId: ID!, postId: ID!): Thread