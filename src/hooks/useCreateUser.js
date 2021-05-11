import { useMutation } from '@apollo/client';
import { CREATE_USER } from '../graphql/mutations';


const useCreateUser = () => {
  const [mutate] = useMutation(CREATE_USER);

  const signUp = async (values) => {
    const { data } = await mutate({ variables:{ ...values } });
    return data;
  };

  return [signUp];
};

export default useCreateUser;