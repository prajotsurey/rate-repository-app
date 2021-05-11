import React from 'react';
import useCreateUser from '../../hooks/useCreateUser';
import  { Formik } from 'formik';
import * as yup from 'yup';
import View from '../View';
import FormikTextInput from '../FormikTextInput';
import { Pressable, StyleSheet } from 'react-native';
import Text from '../Text';
import themes from '../../theme';
import { useHistory } from 'react-router';

const initialValues={
  username:'',
  password:'',
  passwordConfirm:'',
};

const validationSchema = yup.object().shape({
  username: yup.string().required('Username is required'),
  password: yup.string().oneOf([yup.ref('passwordConfirm'), null], 'Passwords should match').required('password is required'),
  passwordConfirm: yup.string().oneOf([yup.ref('password'), null], 'Passwords should match').required('password is required')
});

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

const SignUpForm = ({onSubmit}) => {
  return(
    <View style={styles.container}>
      <FormikTextInput style={styles.formInput} name='username' placeholder='username'/>
      <FormikTextInput style={styles.formInput} name='password' placeholder='password' secureTextEntry={true}/>
      <FormikTextInput style={styles.formInput} name='passwordConfirm' placeholder='confirm password' secureTextEntry={true}/>
      <Pressable style={styles.submitButtom} testID="submitButton" onPress={onSubmit}>
        <Text fontWeight="bold" style={styles.buttonText}>Sign up</Text>
      </Pressable>
    </View>
  );
};

const SignUpContainer = ({onSubmit}) => {
  return(
    <Formik onSubmit={onSubmit} initialValues={initialValues} validationSchema={validationSchema}>
      {({ handleSubmit })=><SignUpForm onSubmit={handleSubmit} />}
    </Formik>
  );
};

const SignUp = () => {
    const [signUp] = useCreateUser();
    const onSubmit = async (values) => {
    const history = useHistory();
    try {
      await signUp(values);
      history.push('/signin');
    } catch(e) {
      console.log(e);
    } 
  };
  return<SignUpContainer onSubmit={onSubmit} />;
};

export default SignUp;