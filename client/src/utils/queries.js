import { gql } from '@apollo/client';

export const ALL_USERS = gql`
query allUsers {
    allUsers {
        _id
        first_name
        last_name
        username
        email
        picture
        bio
        threads {
            title
        }
        events {
            title
            owner
            category
            in_person
        }
        tech_stack
        date_joined
        friends {
            username
        }
    }
}
`

export const USER_PROFILE = gql`
query userProfile($username: String!) {
    userProfile(username: $username) {
        _id
        first_name
        last_name
        username
        email
        password
        picture
        bio
        tech_stack
        date_joined
    }
}
`

export const ALL_THREADS = gql`
    query allThreads {
        allThreads {
            _id
            title
            posts {
                author
                pinned
            }
            events {
                title
                owner
                category
                in_person
            }
            moderator {
                username
            }
            members {
                username
            }
            date_created
        }
    }
`

export const THREAD_DETAILS = gql`
query threadDetails($threadId: ID!) {
    threadDetails(threadId: $threadId) {
        _id
        title
        posts {
            _id
            post_text
            date_created
            author {
                username
            }
            reactions
            edited
            pinned
            comments {
                _id
                author
            }
        }
        events {
            _id
            title
            start_date
            end_date
            start_time
            end_time
            owner {
                _id
                username
                picture
            }
            attendees {
                _id
                username
                picture
            }
            category
            in_person
            location
            image
            comments {
                _id
                author
            }
            date_created
            edited
        }
        moderator {
            _id
            username
            picture
        }
        members {
            _id
            username
            picture
        }
        date_created
    }
}
`

export const USER_FRIENDS = gql`
query userFriends($username: String!) {
    userFriends(username: $username) {
        friends {
            _id
            username
            picture
        }
    }
}
`
//! FILTER ON THE FRONTEND TO SEE IF THE LOGGED IN USER IS THE MODERATOR OR A MEMBER
export const USER_EVENTS_AND_THREADS = gql`
query userEventsAndThreads($userId: ID!) {
    userEventsAndThreads(userId: $userId) {
        threads {
            _id
            title
            moderator {
                _id
                username
            }
            members {
                _id
                username
            }
            date_created
        }
        events {
            _id
            title
            start_date
            end_date
            start_time
            end_time
            owner {
                _id
                username
                picture
            }
            attendees {
                _id
                username
                picture
            }
            category
            in_person
            location
            image
            thread {
                _id
                title
            }
            date_created
            edited
        }
    }
}
`

export const POST_DETAILS = gql`
query postDetails($postId: ID!) {
    postDetails(postId: $postId) {
        _id
        post_text
        date_created
        author {
            _id
            username
            picture
        }
        reactions
        edited
        pinned
        thread {
            _id
            title
        }
        comments {
            _id
            comment_text
            date_created
            author
            reactions
            edited
        }
    }
}
`

export const EVENT_DETAILS = gql`
query eventDetails($eventId: ID!) {
    eventDetails(eventId: $eventId) {
        _id
        title
        description
        start_date
        end_date
        start_time
        end_time
        owner {
            _id
            username
            picture
        }
        attendees {
            _id
            username
            picture
        }
        category
        in_person
        location
        image
        thread {
            _id
            title
        }
        comments {
            _id
            comment_text
            date_created
            author
            reactions
            edited
        }
        date_created
        edited
    }
}
`

