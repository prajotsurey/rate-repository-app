import { useMutation } from '@apollo/client';
import { CREATE_REVIEW } from '../graphql/mutations';

const useCreateReview = () => {
  const [mutate] = useMutation(CREATE_REVIEW);

  const createReview = async (reviewData) => {
    const { data } = await mutate({ variables:  {...reviewData,rating: parseInt(reviewData.rating)}
    });
    return data;
  };

  return [createReview];
};

export default useCreateReview;