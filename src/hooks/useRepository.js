import { useQuery } from '@apollo/client';
import { GET_REPOSITORY } from '../graphql/queries';

const useRepository = (id) => {
  console.log("id: ",id);
  const { data } = useQuery(GET_REPOSITORY, {
    variables: { "id":id },
  });
  
  return {repository: data ? data.repository : null};
};

export default useRepository;