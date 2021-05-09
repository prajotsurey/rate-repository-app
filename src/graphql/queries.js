import { gql } from '@apollo/client';

export const GET_REPOSITORIES = gql`
  query Repositories{
    repositories {
      edges{
        node{
          id
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

export const GET_REPOSITORY = gql`
  query Repository($id: ID!){
    repository(id: $id){
      id
      fullName
      description
      language
      ownerAvatarUrl
      stargazersCount
      forksCount
      reviewCount
      ratingAverage
      url
    }
  }
`;
