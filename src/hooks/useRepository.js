import { useQuery } from '@apollo/client';
import { GET_REPOSITORY } from '../graphql/queries';

const useRepository = (id,first) => {
  const { data, loading, fetchMore, ...result } = useQuery(GET_REPOSITORY, {
    fetchPolicy: 'cache-and-network',
    variables: { "id":id ,first},
  });

  const handleFetchMore = () => {
    const canFetchMore = !loading && data?.repository.reviews.pageInfo.hasNextPage;
    if(!canFetchMore) {
      return;
    }

    fetchMore({
      variables:{
        after: data.repository.reviews.pageInfo.endCursor,
        id: id,
        first
      }
    });
  };

  return {
    repository: data ? data.repository : null,
    fetchMore: handleFetchMore,
    result
  };
};

export default useRepository;