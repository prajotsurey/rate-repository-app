import React from 'react';
import Text from './Text';
import {Pressable, StyleSheet} from 'react-native';
import FormikTextInput from './FormikTextInput';
import { Formik } from 'formik';
import View from './View';
import themes from '../theme';
import { disableExpoCliLogging } from 'expo/build/logs/Logs';

const initialValues={
  username:'',
  password:''
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
    marginBottom:10
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

const SignInForm = ({onSubmit}) => {
  return (
    <View style={styles.container}>
      <FormikTextInput style={styles.formInput} name="username" placeholder="Username" />
      <FormikTextInput style={styles.formInput} name="password" placeholder="Password" secureTextEntry={true}/>      
      <Pressable style={styles.submitButtom} onPress={onSubmit}>
        <Text fontWeight="bold" style={styles.buttonText}>Sign In</Text>
      </Pressable>
    </View>
  );
};

const SignIn = () => {
  const onSubmit = (values) => {
    console.log(values);
  };

  return(
    <Formik initialValues={initialValues} onSubmit={onSubmit}>
      {({ handleSubmit }) => <SignInForm onSubmit={handleSubmit} />}
    </Formik>
  );
};


export default SignIn;