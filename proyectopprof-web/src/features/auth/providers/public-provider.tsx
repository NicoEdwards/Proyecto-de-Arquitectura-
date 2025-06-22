'use client';

import { CenteredLoading } from '@/components/ui/centered-loading';
import { ROUTES } from '@/constants/routes';
import { getToken } from '@/lib/localstorage/utils/token-storage';
import { jwtDecode } from 'jwt-decode';
import { useRouter } from 'next/navigation';
import { PropsWithChildren, useEffect, useState } from 'react';

// Types
interface JwtPayload {
  exp?: number;
}

export const PublicProvider = ({ children }: PropsWithChildren) => {
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = getToken() ?? '';

    try {
      const decodedJwt = jwtDecode<JwtPayload>(token);
      const isTokenValid = (decodedJwt.exp ?? 0) * 1000 > Date.now();
      setLoading(false);
      if (isTokenValid) router.replace(ROUTES.FEEDS);

      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (_) {
      setLoading(false);
    }
  }, [router]);

  if (loading) return <CenteredLoading />;
  return <>{children}</>;
};
