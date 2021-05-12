import { useQuery } from '@apollo/client';
import { GET_REPOSITORIES } from '../graphql/queries';

const useRepositories = (orderBy,filter,first) => {
  let variables = {};
  let searchKeyword = filter ? filter : "";
  switch(orderBy){
    case 'latest':
      variables ={ 
        orderBy:'CREATED_AT'
      };
    break;
    case 'highestRated':
      variables ={ 
        orderBy:'RATING_AVERAGE',
        orderDirection:'DESC'
      };
    break;
    case 'lowestRated':
      variables ={ 
        orderBy:'RATING_AVERAGE',
        orderDirection:'ASC'
      };
    break;
    case 'null':
      variables = null;
    break;
    default:
      variables = null;
  }

  const { data, loading, fetchMore, ...result } = useQuery(GET_REPOSITORIES, {
    fetchPolicy: 'cache-and-network',
    variables:{
      ...variables,
      first,
      searchKeyword
    }
  });

  const handleFetchMore = () => {
    const canFetchMore = !loading && data?.repositories.pageInfo.hasNextPage;
    if (!canFetchMore) {
      return;
    }

    fetchMore({
      variables: {
        after: data.repositories.pageInfo.endCursor,
        ...variables,
      },
    });
  };

  return { 
    repositories: data ? data.repositories: null,
    fetchMore: handleFetchMore,
    loading,
    ...result,
  };
};

export default useRepositories;