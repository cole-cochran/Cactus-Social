import { gql } from '@apollo/client';

//*  USER STUFF

export const LOGIN_USER = gql`
mutation loginUser($username: String!, #password: String!) {
    loginUser(username: $username, password: $password) {
        token
        user {
            _id
            first_name
            last_name
            username
            email
            picture
            bio
            threads {
                _id
                title
                posts {
                    _id
                }
                events {
                    _id
                }
                moderator
                members {
                    username
                }
                date_created
            }
            events {
                title
                start_date
                end_date
                start_time
                end_time
                owner
                attendees {
                    username
                }
                category
                in_person
                location
                image
                thread {
                    _id
                }
                date_created
            }
            tech_stack {
                technology
            }
            date_joined
            friends {
                username
            }
        }
    }
}
`;

export const CREATE_USER = gql`
mutation addUser($first_name: String!, $last_name: String!,$username: String!, $email: String!, $password: String!) {
    addUser( first_name: $first_name, last_name: $last_name, username: $username, email: $email, password: $password) {
        token
        user {
            first_name
            last_name
            username
            email
        }
    }
}
`;

export const ADD_TECH = gql`
mutation addTechnology($userId: ID!, $technology: String!) {
    addTechnology( userId: $userId, technology: $technology) {
        user {
            _id
            first_name
            last_name
            username
            email
            picture
            bio
            tech_stack {
                technology
            }
            date_joined
            friends {
                username
            }
        }
    }
}
`;

export const REMOVE_TECH = gql`
mutation removeTechnology($userId: ID!, $technology: String!) {
    removeTechnology( userId: $userId, technology: $technology) {
        user {
            _id
            first_name
            last_name
            username
            email
            picture
            bio
            tech_stack {
                technology
            }
            date_joined
            friends {
                username
            }
        }
    }
}
`;

export const ADD_FRIEND = gql`
mutation addFriend($userId: ID!, $friend: String!) {
    addFriend( userId: $userId, friend: $friend) {
        user {
            _id
            first_name
            last_name
            username
            email
            picture
            bio
            tech_stack {
                technology
            }
            date_joined
            friends {
                username
            }
        }
    }
}
`;

export const REMOVE_FRIEND = gql`
mutation removeFriend($userId: ID!, $friend: String!) {
    removeFriend( userId: $userId, friend: $friend) {
        user {
            _id
            first_name
            last_name
            username
            email
            picture
            bio
            tech_stack {
                technology
            }
            date_joined
            friends {
                username
            }
        }
    }
}
`;

export const UPDATE_PHOTO = gql`
mutation updatePhoto($userId: ID!, $picture: String!) {
    updatePhoto( userId: $userId, picture: $picture) {
        user {
            _id
            first_name
            last_name
            username
            email
            picture
            bio
            tech_stack {
                technology
            }
            date_joined
            friends {
                username
            }
        }
    }
}
`;

export const UPDATE_BIO = gql`
mutation updateBio($userId: ID!, $bio: String!) {
    updateBio( userId: $userId, bio: $bio) {
        user {
            _id
            first_name
            last_name
            username
            email
            picture
            bio
            tech_stack {
                technology
            }
            date_joined
            friends {
                username
            }
        }
    }
}
`;

//*  THREAD STUFF

export const CREATE_THREAD = gql`
mutation createThread($moderator: String!, $title: String!) {
    createThread( moderator: $moderator, title: $title) {
        thread {
            _id
            title
            posts {}
            events {}
            moderator
            members {}
            date_created
            }
        }
    }
}
`;

export const REMOVE_THREAD = gql`
mutation removeThread($threadId: ID!) {
    removeThread(threadId: $threadId) {
        user {
            _id
            first_name
            last_name
            username
            email
            picture
            bio
            threads {
                _id
                title
                posts {
                    _id
                }
                events {
                    _id
                }
                moderator
                members {
                    username
                }
                date_created
            }
            events {
                title
                start_date
                end_date
                start_time
                end_time
                owner
                attendees {
                    username
                }
                category
                in_person
                location
                image
                thread {
                    _id
                }
                date_created
            }
            tech_stack {
                technology
            }
            date_joined
            friends {
                username
            }
        }
    }
}
`;

export const CREATE_POST = gql`

`;

export const REMOVE_POST = gql`

`;

export const UPDATE_POST = gql`

`;

export const PIN_POST = gql`

`;

export const UNPIN_POST = gql`

`;

export const CREATE_POST_COMMENT = gql`

`;

export const REMOVE_POST_COMMENT = gql`

`;

export const UPDATE_POST_COMMENT = gql`

`;


//*  EVENT STUFF

export const CREATE_EVENT = gql`

`;

export const REMOVE_EVENT = gql`

`;

export const UPDATE_EVENT = gql`

`;

export const ATTEND_EVENT = gql`

`;

export const LEAVE_EVENT = gql`

`;

export const CREATE_EVENT_COMMENT = gql`

`;

export const REMOVE_EVENT_COMMENT = gql`

`;

export const UPDATE_EVENT_COMMENT = gql`

`;

export const ADD_POST_REACTION = gql`

`;

export const ADD_POST_COMMENT_REACTION = gql`

`;

export const ADD_EVENT_COMMENT_REACTION = gql`

`;