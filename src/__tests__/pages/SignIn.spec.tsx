
import React from 'react';
import {render , fireEvent ,  waitFor } from '@testing-library/react';


import SignIn from '../../pages/SignIn';

const mockedHistoryPush = jest.fn();

jest.mock('react-router-dom' , () => {
  return {
    useHistory: () => ({
      push: mockedHistoryPush,
    }),
    Link: ({ children }: { children: React.ReactNode}) => children,
  };
});

jest.mock('../../hooks/auth' , () => {
  return {
    useAuth: () => ({
      signIn: jest.fn()
    })
  }
});

describe('SignIn Page', () => {
  it('Should be able sign in' , async  () => {

    const { getByPlaceholderText , getByText } = render(<SignIn />);

     const emailField = getByPlaceholderText('E-mail');
     const passwordField = getByPlaceholderText('Password');
     
    fireEvent.change(emailField, { target: { value: 'jovirone@example.com'}}  );
    fireEvent.change(passwordField, { target: { value: '123456'}}  );

    const buttonElement = getByText('Entrar');

    fireEvent.click(buttonElement);

    waitFor(() => {
      expect(mockedHistoryPush).toHaveBeenCalledWith('/dashboard');
    });
  })
})
