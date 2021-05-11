import React from 'react';
import Text from '../Text';
import {Pressable, StyleSheet} from 'react-native';
import FormikTextInput from '../FormikTextInput';
import { Formik } from 'formik';
import View from '../View';
import theme from '../../theme';
import * as yup from 'yup';
import useSignIn from '../../hooks/useSignIn';
import { useHistory } from 'react-router-native';

const initialValues={
  username:'',
  password:''
};

const validationSchema = yup.object().shape({
  username: yup.string().required('Username is required'),
  password: yup.string().required('Password is required')
});

const styles = StyleSheet.create({
  container:{
    padding:10
  },
  formInput:{
    borderColor: theme.colors.textSecondary,
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
    backgroundColor: theme.colors.primary
  },
  buttonText:{
    fontSize:17,
    color:'white',
    textAlign:'center'
  }
});

const SignInForm = ({onSubmit}) => {
  return (
    <View style={styles.container}>
      <FormikTextInput style={styles.formInput} testID="usernameField" name="username" placeholder="Username" />
      <FormikTextInput style={styles.formInput} testID="passwordField" name="password" placeholder="Password" secureTextEntry={true}/>      
      <Pressable style={styles.submitButtom} testID="submitButton" onPress={onSubmit}>
        <Text fontWeight="bold" style={styles.buttonText}>Sign In</Text>
      </Pressable>
    </View>
  );
};

export const SignInContainer = ({ onSubmit }) => {
  return(
    <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={validationSchema}>
      {({ handleSubmit }) => <SignInForm onSubmit={handleSubmit} />}
    </Formik>
  );
};

const SignIn = () => {
  const [signIn] = useSignIn();
  const history = useHistory();

  const onSubmit = async (values) => {
    const { username, password } = values;
    try {
      await signIn({ username, password });
      history.push('/');
    } catch (e) {
      console.log(e);
    }
  };

  return <SignInContainer onSubmit={onSubmit}/>;

};

export default SignIn;