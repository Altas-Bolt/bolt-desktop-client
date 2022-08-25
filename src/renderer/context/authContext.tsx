import { useMutation } from '@tanstack/react-query';
import { message } from 'antd';
import React, { createContext, useContext, useEffect, useState } from 'react';
import { api } from 'utils/api';
import store from 'utils/store/store';
import { useAppContext } from './appContext';

interface IAuthContext {
  token: string;
  signin: (token: string, password: string) => void;
  signout: () => void;
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
  const [token, _setToken] = useState<string>('');
  const { setUser } = useAppContext();

  const setToken = (token: string) => {
    if (token) {
      api.defaults.headers.common['authorization'] = `Bearer ${token}`;
    } else {
      api.defaults.headers.common['authorization'] = '';
    }

    _setToken(token);
    if (!token) {
      store.delete('token');
    } else store.set('token', token);
  };

  const { mutate: login } = useMutation(
    ({ email, password }: { email: string; password: string }) =>
      api
        .post('/bolt/users/login', {
          email,
          password,
        })
        .then((res) => res.data),
    {
      onError: (err: any) => {
        message.error(err.response.data.message);
      },
      onSuccess: ({ data }) => {
        setUser(data);
        setToken(data.accessToken);
      },
    }
  );

  useEffect(() => {
    const token = store.get('token');
    setToken(token);
  }, []);

  const signin = (email: string, password: string) => {
    login({ email, password });
  };

  const isSignedin = () => {
    return !!token;
  };

  const signout = () => {
    setToken('');
  };

  return (
    <AuthContext.Provider
      value={{
        token,
        signin,
        signout,
        isSignedin,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
