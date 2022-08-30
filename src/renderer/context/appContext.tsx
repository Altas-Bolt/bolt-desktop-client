import React, { createContext, useContext, useEffect, useState } from 'react';
import { User } from 'types/types';
import store from 'utils/store/store';

interface IAppContext {
  user: User | null;
  setUser: (val: User) => void;
}

const AppContext = createContext<IAppContext | null>(null);

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('No auth context found');
  }
  return context;
};

export const AppProvider: React.FC<{
  children: React.ReactElement | React.ReactElement[];
}> = ({ children }) => {
  const [user, _setUser] = useState<User | null>(null);

  useEffect(() => {
    const user = store.get('user');
    _setUser(user);
  }, []);

  const setUser = (user: User) => {
    store.set('user', user);
    _setUser(user);
  };

  return (
    <AppContext.Provider
      value={{
        user,
        setUser,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
