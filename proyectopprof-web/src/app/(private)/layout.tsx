import { PrivateHeader } from '@/components/layouts/headers/private-header';
import { AuthProvider } from '@/features/auth/providers/auth-provider';
import { PropsWithChildren } from 'react';

export default function PrivateLayout({ children }: PropsWithChildren) {
  return (
    <AuthProvider>
      <PrivateHeader />
      {children}
    </AuthProvider>
  );
}
