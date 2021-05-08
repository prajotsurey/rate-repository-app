import React from 'react';
import { fireEvent, render, waitFor } from '@testing-library/react-native';
import { SignInContainer } from './index';


describe('SignIn', ()=> {
  describe('SignIn', ()=> {
    it('calls onSubmit function with correct arguments when a valid form is submitted', async()=>{
      const onSubmit = jest.fn();
      const { getByTestId } = render(<SignInContainer onSubmit={onSubmit} />);

      const usernameInput = getByTestId('usernameField');
      const passwordInput = getByTestId('passwordField');
      const submitButton = getByTestId('submitButton');

      fireEvent.changeText(usernameInput, 'kalle');
      fireEvent.changeText(passwordInput, 'password');
      fireEvent.press(submitButton);

      await waitFor(() => {
        expect(onSubmit.mock.calls[0][0]).toEqual({
          username: 'kalle',
          password: 'password',
        });
      });

    });
  });
});