import axios from 'axios';
import { SERVER_URL } from './constants';
import store from './store/store';

const token = store.get('token');

export const api = axios.create({
  baseURL: `${SERVER_URL}`,
  headers: {
    // authorization: `Bearer ${token}`,
    ...(token ? { authorization: `Bearer ${token}` } : {}),
    'Content-Type': 'application/json',
  },
});
