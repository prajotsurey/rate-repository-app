import { useQuery } from '@apollo/client';
import { GET_AUTHORIZED_USER } from '../graphql/queries';

const useAuthorizedUser = (includeReviews=false,first) => {
  const { data, loading, fetchMore } = useQuery(GET_AUTHORIZED_USER, {
    fetchPolicy: 'cache-and-network',
    variables:{
      includeReviews,
      first
    }
  });
  const handleFetchMore = () => {
    const canFetchMore = !loading && data?.authorizedUser.reviews.pageInfo.hasNextPage;
    if(!canFetchMore) {
      return;
    }
    
    fetchMore({
      variables:{
        after:data.authorizedUser.reviews.pageInfo.endCursor,
        first:first
      }
    });

  };

  return{
    data:data?.authorizedUser,
    fetchMore: handleFetchMore,
  };
};

export default useAuthorizedUser;