import { gql } from '@apollo/client';

const REPO_DETAILS = gql`
  fragment RepoDetails on Repository {
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
`;

export const GET_REPOSITORIES = gql`
  query Repositories($orderBy:AllRepositoriesOrderBy, $orderDirection:OrderDirection, $searchKeyword:String){
    repositories(orderBy:$orderBy, orderDirection: $orderDirection, searchKeyword: $searchKeyword){
      edges{
        node{
          ...RepoDetails
        }
      }
    }
  }
  ${REPO_DETAILS}
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
      ...RepoDetails
      url
      reviews{
        edges {
          node {
            id
            text
            rating
            createdAt
            user {
              id
              username
            }
          }
        }
      }
    }
  }
  ${REPO_DETAILS}
`;
