import { KEYS } from '@/lib/localstorage/constants';

export const setToken = (token: string) =>
  localStorage.setItem(KEYS.TOKEN, token);

export const getToken = () => localStorage.getItem(KEYS.TOKEN);
export const removeToken = () => localStorage.removeItem(KEYS.TOKEN);
