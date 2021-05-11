import { Formik } from 'formik';
import React from 'react';
import * as yup from 'yup';
import FormikTextInput from '../FormikTextInput';
import View from '../View';
import { Pressable, StyleSheet } from 'react-native';
import themes from '../../theme';
import Text from '../Text';
import useCreateReview from '../../hooks/useCreateReview';
import { useHistory } from 'react-router';

const validationSchema = yup.object().shape({
  repositoryName: yup.string().required('Repository name is required'),
  ownerName: yup.string().required('Owner name is required'),
  rating: yup.number().typeError('Rating should be an integer').required('Rating is required').min(0,'Rating should be between 0 and 100').max(100,'Rating should be between 0 and 100'),
  text: yup.string()
});

const initialValues = {
  repositoryName: '',
  ownerName: '',
  rating: null,
  text: '',
};

const styles = StyleSheet.create({
  container:{
    padding:10
  },
  formInput:{
    borderColor: themes.colors.textSecondary,
    borderWidth: 1,
    borderRadius: 3,
    padding:10,
    fontSize:17,
  },
  submitButtom:{
    borderRadius: 3,
    padding:10,
    marginBottom:10,
    display:'flex',
    justifyContent:'center',
    backgroundColor: themes.colors.primary
  },
  buttonText:{
    fontSize:17,
    color:'white',
    textAlign:'center'
  }
});

const ReviewForm = ({ onSubmit }) => {
  return(
    <View style={styles.container} >
      <FormikTextInput style={styles.formInput} name="ownerName" placeholder="Repository owner name"/>
      <FormikTextInput style={styles.formInput} name="repositoryName" placeholder="Repository name"/>
      <FormikTextInput style={styles.formInput} name="rating" placeholder="Rating between 0 and 100"/> 
      <FormikTextInput style={styles.formInput} name="text" placeholder="Review" multiline={true}/>
      <Pressable style={styles.submitButtom} testID="submitButton" onPress={onSubmit}>
        <Text fontWeight="bold" style={styles.buttonText}>Create a review</Text>
      </Pressable>
    </View>
  );
};

const CreateReviewContainer = ({ onSubmit }) => {
  return(
    <Formik onSubmit={onSubmit} initialValues={initialValues} validationSchema={validationSchema}>
      {({ handleSubmit }) => <ReviewForm onSubmit={handleSubmit} />}
    </Formik>
  );

};

const CreateReview = () => {
  const [createReview] = useCreateReview();
  const history = useHistory();
  const onSubmit = async (values) => {
    try {
      const { data } = await createReview(values);
      history.push(`/repository/${data.createReview.repositoryId}`);
    } catch(e) {
      console.log('error: ',e);
    }
  };

  return <CreateReviewContainer onSubmit={onSubmit} />;
};

export default CreateReview;