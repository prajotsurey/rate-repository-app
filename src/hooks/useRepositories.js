import { useQuery } from '@apollo/client';
import { GET_REPOSITORIES } from '../graphql/queries';

const useRepositories = (orderBy,filter) => {
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

  const { data } = useQuery(GET_REPOSITORIES, {
    fetchPolicy: 'cache-and-network',
    variables:{
      ...variables,
      searchKeyword
    }
  });
  return { repositories: data ? data.repositories: null, };
};

export default useRepositories;