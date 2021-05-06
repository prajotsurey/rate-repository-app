import { gql } from '@apollo/client';

export const GET_REPOSITORIES = gql`
  query Repositories{
    repositories {
      edges{
        node{
          fullName
          description
          language
          ownerAvatarUrl
          stargazersCount
          forksCount
          reviewCount
          ratingAverage
        }
      }
    }
  }
`;

export const AUTHORIZE = gql`
  query {
    authorizedUser{
      id
      username
    }
  }
`;