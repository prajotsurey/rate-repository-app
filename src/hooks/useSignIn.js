import { useMutation } from '@apollo/client';
import { AUTHORIZE } from '../graphql/mutations';
import useAuthStorage from '../hooks/useAuthStorage';
import { useApolloClient } from '@apollo/client';

const useSignIn = () => {
  const [mutate, result] = useMutation(AUTHORIZE);
  const authStorage = useAuthStorage();
  const apolloClient = useApolloClient();

  const signIn = async ({ username, password }) => {
    const { data } = await mutate({ variables: { username, password }});
    if(data.authorize){
      authStorage.setAccessToken(data.authorize.accessToken);
      apolloClient.resetStore();
    }
    return(data);
  };

  return [signIn, result];
};

export default useSignIn;