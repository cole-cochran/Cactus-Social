
import { gql } from '@apollo/client';





export const LOGIN_USER = gql`
  mutation loginUser($username: String!, $password: String!) {
    loginUser(username: $username, password: $password) {
      token
      user{
          _id
          first_name
      }
    }
  }
`;

export const ADD_User = gql`
  mutation addUser(first_name: $String!, last_name: $String!, username: $String!, email: $String!, $password: String!) {
    addUser($first_name: String!, $last_name: String!, $username: String!, $email: String!, $password: String!)) {
      token
      user {
        _id
        name
      }
    }
  }
`;
export const ADD_SKILL = gql`
  mutation addSkill($userId: ID!, $technology: String!) {
    addSkill(userId: $profileId, technology: $technology) {
      _id
      name
      user{
          _id
      }
    }
  }
`;

//   loginUser(username: String!, password: String!): Auth

//         createUser(first_name: String!, last_name: String!, username: String!, email: String!, password: String!): Auth

//         addTechnology(userId: ID!, technology: String!): User

//         removeTechnology(userId: ID!, technology: String!): User

//         addFriend(userId: ID!, friend: String!): User

//         removeFriend(userId: ID!, friend: String!): User

//         updatePhoto(userId: ID!, picture: String!): User

//         updateBio(userId: ID!, bio: String!): User

