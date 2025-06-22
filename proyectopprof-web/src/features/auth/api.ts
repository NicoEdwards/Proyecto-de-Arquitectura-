import { ENV } from '@/config/env';
import { getToken } from '@/lib/localstorage/utils/token-storage';

// Types
type LoginApiProps = { email: string; password: string };
type UpdateUserApiProps = { bankIds: string[] };
type RegisterApiProps = LoginApiProps & UpdateUserApiProps;

// Constants
const API_URLS = {
  USERS: `${ENV.NEXT_PUBLIC_API_URL}/users`,
  LOGIN: `${ENV.NEXT_PUBLIC_API_URL}/auth/login`,
} as const;

// Utils
const getRequest = async (url: string) => {
  const response = await fetch(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${getToken()}`,
    },
  });
  const data = await response.json();
  if (!response.ok) throw new Error(data.message);

  return data;
};

const postRequest = async (url: string, body: Record<string, unknown>) => {
  const response = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });
  const data = await response.json();
  if (!response.ok) throw new Error(data.message);

  return data;
};

const patchRequest = async (url: string, body: Record<string, unknown>) => {
  const response = await fetch(url, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${getToken()}`,
    },
    body: JSON.stringify(body),
  });
  const data = await response.json();
  if (!response.ok) throw new Error(data.message);

  return data;
};

// Apis
export const getUserApi = async () => getRequest(API_URLS.USERS);

export const registerApi = async (body: RegisterApiProps) =>
  postRequest(API_URLS.USERS, body);

export const loginApi = async (body: LoginApiProps) =>
  postRequest(API_URLS.LOGIN, body);

export const updateUserApi = async (body: UpdateUserApiProps) =>
  patchRequest(API_URLS.USERS, body);
