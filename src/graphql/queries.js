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
  query Repositories($orderBy:AllRepositoriesOrderBy, $orderDirection:OrderDirection, $searchKeyword:String, $after:String, $first:Int){
    repositories(orderBy:$orderBy, orderDirection: $orderDirection, searchKeyword: $searchKeyword, after:$after, first:$first){
      edges{
        node{
          ...RepoDetails
        }
      }
      pageInfo{
        hasNextPage
        endCursor
      }
    }
  }
  ${REPO_DETAILS}
`;

export const GET_AUTHORIZED_USER = gql`
  query getAuthorizedUser($includeReviews: Boolean = false, $first: Int, $after: String) {
    authorizedUser {
      id
      username
      reviews(first:$first, after: $after) @include(if: $includeReviews) {
        edges{
          node{
            id
            rating
            text
            repositoryId
            repository{
              fullName
            }
            createdAt
          }
        }
        pageInfo{
          endCursor
          hasNextPage
        }
      }
    }
  }
`;

export const GET_REPOSITORY = gql`
  query Repository($id: ID!,$first: Int!, $after: String){
    repository(id: $id){
      ...RepoDetails
      url
      reviews(first:$first, after:$after){
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
        pageInfo{
          hasNextPage
          endCursor
        }
      }
    }
  }
  ${REPO_DETAILS}
`;


export const AUTHORIZED_USER = gql`
  query AuthorizedUser($first: Int, $after: String){
    authorizedUser{
      reviews(first:$first, after: $after){
        edges{
          node{
            id
            rating
            text
            repository{
              fullName
            }
            createdAt
          }
        }
        pageInfo{
          endCursor
          hasNextPage
        }
      }
    }
  }
`;