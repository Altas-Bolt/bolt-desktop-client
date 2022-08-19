import React, { createContext, useContext, useEffect, useState } from 'react';
import store from 'utils/store/store';

interface IAuthContext {
  email: string;
  signin: (email: string, password: string) => boolean;
  signout: () => boolean;
  isSignedin: () => boolean;
}

const AuthContext = createContext<IAuthContext | null>(null);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('No auth context found');
  }
  return context;
};

export const AuthProvider: React.FC<{
  children: React.ReactElement | React.ReactElement[];
}> = ({ children }) => {
  const [email, setEmail] = useState<string>('');

  useEffect(() => {
    const token = store.get('token');
    setEmail(token);
  }, []);
  useEffect(() => {
    console.log('email', email);
  }, [email]);

  const signin = (email: string, password: string) => {
    setEmail(email);
    store.set('token', email);
    return true;
  };
  const isSignedin = () => {
    return !!store.get('token');
  };

  const signout = () => {
    setEmail('');
    store.set('token', '');
    return true;
  };

  return (
    <AuthContext.Provider
      value={{
        email,
        signin,
        signout,
        isSignedin,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
