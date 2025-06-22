'use client';

import { PublicHeader } from '@/components/layouts/headers/public-header';
import { ROUTES } from '@/constants/routes';
import { PublicProvider } from '@/features/auth/providers/public-provider';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { useRouter } from 'next/navigation';

export default function HomePage() {
  const router = useRouter();

  return (
    <PublicProvider>
      <PublicHeader />

      <Box
        sx={{
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 3,
          padding: 2,
        }}
        component="main"
      >
        <Typography variant="h3" textAlign="center">
          Bienvenido a FinSight
        </Typography>

        <Button
          variant="contained"
          size="large"
          onClick={() => router.push(ROUTES.LOGIN)}
        >
          Iniciar Sesión
        </Button>

        <Button
          variant="outlined"
          size="large"
          onClick={() => router.push(ROUTES.REGISTER)}
        >
          Registrarse
        </Button>
      </Box>
    </PublicProvider>
  );
}
