import { PublicHeader } from '@/components/layouts/headers/public-header';
import { PublicProvider } from '@/features/auth/providers/public-provider';
import { PropsWithChildren } from 'react';

export default function PublicLayout({ children }: PropsWithChildren) {
  return (
    <PublicProvider>
      <PublicHeader />
      {children}
    </PublicProvider>
  );
}
