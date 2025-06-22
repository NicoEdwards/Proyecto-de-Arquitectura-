'use client';

import { removeToken } from '@/lib/localstorage/utils/token-storage';
import Button from '@mui/material/Button';
import { useRouter } from 'next/navigation';

export const SignoutButton = () => {
  const router = useRouter();

  // Utils
  const handleClickSignout = () => {
    removeToken();
    router.replace('/');
  };

  return (
    <Button
      sx={{ textTransform: 'none' }}
      variant="outlined"
      color="inherit"
      onClick={handleClickSignout}
    >
      Cerrar sesión
    </Button>
  );
};
