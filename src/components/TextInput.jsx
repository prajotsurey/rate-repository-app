import React from 'react';
import { StyleSheet, TextInput as NativeTextInput } from 'react-native';

const TextInput = ({ style, ...props }) => {
  
  const styles = StyleSheet.create({
    error:{
      borderColor: '#d73a4a',
    }
  });
  
  const textInputStyle = [
    style,
    props.error && styles.error
  ];

  return <NativeTextInput style={textInputStyle} {...props} />;
};

export default TextInput;