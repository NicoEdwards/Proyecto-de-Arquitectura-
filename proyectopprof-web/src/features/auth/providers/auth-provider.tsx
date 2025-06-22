'use client';

import { CenteredLoading } from '@/components/ui/centered-loading';
import { getToken, removeToken } from '@/lib/localstorage/utils/token-storage';
import { jwtDecode } from 'jwt-decode';
import { useRouter } from 'next/navigation';
import { PropsWithChildren, useEffect, useState } from 'react';

// Types
interface JwtPayload {
  exp?: number;
}

export const AuthProvider = ({ children }: PropsWithChildren) => {
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Utils
    const redirectToHome = () => {
      removeToken();
      router.replace('/');
    };

    const token = getToken() ?? '';

    try {
      const decodedJwt = jwtDecode<JwtPayload>(token);
      const isTokenValid = (decodedJwt.exp ?? 0) * 1000 > Date.now();
      setLoading(false);
      if (!isTokenValid) redirectToHome();

      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (_) {
      setLoading(false);
      redirectToHome();
    }
  }, [router]);

  if (loading) return <CenteredLoading />;
  return <>{children}</>;
};
