import { createContext } from 'react';

export const AuthContext = createContext({
  name: null,
  email: null,
  isLoggedIn: false,
  userId: null,
  token: null,
  login: () => {},
  logout: () => {}
});
