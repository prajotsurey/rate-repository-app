import { useQuery } from '@apollo/client';
import { AUTHORIZE } from '../graphql/queries';

const useAuthorize = () => {
  const { data } = useQuery(AUTHORIZE, {
    fetchPolicy: 'cache-and-network',
  });
  return { data: data ? data.authorizedUser : null };
};

export default useAuthorize;