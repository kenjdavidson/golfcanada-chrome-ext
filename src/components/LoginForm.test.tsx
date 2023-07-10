import React from 'react';
import { render, screen } from '@testing-library/react';
import { LoginForm, LoginFormProps } from './LoginForm';
import userEvent from '@testing-library/user-event';

function renderComponent({
  onLogin = () => { /* nothing */ },
  validations = []
}: LoginFormProps) {
  render(<LoginForm onLogin={onLogin} validations={validations} />);

  return {
    username: screen.getByTestId('testUsername'),
    password: screen.getByTestId('testPassword'),
    login: screen.getByRole('button', { name: 'Login' }),
    cancel: screen.getByRole('button', { name: 'Clear' })
  }
}

test('it renders elements as expected', () => {
  const {
    username, 
    password,
    login, 
    cancel
  } = renderComponent({});

  expect(username).toBeInTheDocument();
  expect(password).toBeInTheDocument();
  expect(login).toBeInTheDocument();
  expect(cancel).toBeInTheDocument();

  expect(screen.queryAllByRole('alert')).toHaveLength(0);
});

test('it manages Login functionality correctly', () => {
  const onLoginMock = jest.fn();

  const {
    username, 
    password,
    login, 
  } = renderComponent({
    onLogin: onLoginMock
  });

  expect(login).toBeDisabled();

  userEvent.type(username, 'testuser');
  userEvent.type(password, 'testpassword');

  expect(login).not.toBeDisabled();

  userEvent.click(login);

  expect(onLoginMock).toBeCalledWith('testuser', 'testpassword')
});

test('it displays validations when provided', () => {
  const errorText = 'Something went wrong with login';

  renderComponent({
    validations: [errorText]
  });

  const validations = screen.getAllByRole('alert');
  expect(validations).toHaveLength(1);
  expect(validations[0]).toHaveTextContent(errorText);
});