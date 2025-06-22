import { ENV } from '@/config/env';
import { getToken } from '@/lib/localstorage/utils/token-storage';

// Constants
const API_URLS = {
  FEEDS: `${ENV.NEXT_PUBLIC_API_URL}/feeds`,
} as const;

// Apis
export const getFeedsApi = async (params?: Record<string, string>) => {
  const response = await fetch(
    `${API_URLS.FEEDS}?` + new URLSearchParams(params),
    {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${getToken()}`,
      },
    },
  );
  const data = await response.json();
  if (!response.ok) throw new Error(data.message);

  return data;
};
