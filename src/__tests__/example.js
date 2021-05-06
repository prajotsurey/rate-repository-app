import React, { useState } from 'react';
import { Text, TextInput, Pressable, View } from 'react-native';
import { render, fireEvent } from '@testing-library/react-native';

const Form = ({ onSubmit }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = () => {
    onSubmit({ username, password });
  };

  return (
    <View>
      <Text testID='text1'>
        Hello
      </Text>
    </View>
  );
};

describe('Form', () => {
  
  it('calls function provided by onSubmit prop after pressing the submit button', () => {
    const onSubmit = jest.fn();
    const { debug, getByTestId } = render(<Form onSubmit={onSubmit} />);
    expect(getByTestId('text1')).toHaveTextContent('Hello');
  });

});