import Store from 'electron-store';
import { User } from 'types/types';

export type StoreSchemaType = {
  token: string;
  user: User;
};

const store = new Store<StoreSchemaType>();

export default store;
