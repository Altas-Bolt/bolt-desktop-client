import Store from 'electron-store';
export type StoreSchemaType = {
  token: string;
};
const store = new Store<StoreSchemaType>();

export default store;
