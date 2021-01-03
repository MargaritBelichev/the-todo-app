import { store } from '../redux';

export const getRequestHeaders = () => {
  const token = store.getState().tokens.access;
  return {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  }
}
