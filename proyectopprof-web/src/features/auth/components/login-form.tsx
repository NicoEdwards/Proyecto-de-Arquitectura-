'use client';

import { ROUTES } from '@/constants/routes';
import { loginApi } from '@/features/auth/api';
import { setToken } from '@/lib/localstorage/utils/token-storage';
import { LoginAuth, loginAuthSchema } from '@/lib/zod/schemas/auth.schema';
import { zodResolver } from '@hookform/resolvers/zod';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { useRouter } from 'next/navigation';
import { enqueueSnackbar } from 'notistack';
import { useForm } from 'react-hook-form';

export const LoginForm = () => {
  // "next-router"
  const router = useRouter();

  // "react-hook-form"
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginAuth>({ resolver: zodResolver(loginAuthSchema) });

  // Utils
  const onSubmit = async ({ email, password }: LoginAuth) => {
    try {
      const { token } = await loginApi({ email, password });
      setToken(token);
      enqueueSnackbar('Login successful', { variant: 'success' });

      router.push(ROUTES.FEEDS);
    } catch (err) {
      const message =
        err instanceof Error ? err.message : 'Something went wrong';
      enqueueSnackbar(message, { variant: 'error' });
    }
  };

  return (
    <Stack sx={{ width: '400px', px: 6, py: 8 }} component={Paper} spacing={2}>
      <Typography variant="h5" textAlign="center">
        Iniciar Sesión
      </Typography>

      <form onSubmit={handleSubmit(onSubmit)}>
        <Stack spacing={2}>
          <TextField
            label="Correo electrónico"
            type="email"
            error={!!errors.email}
            helperText={errors.email?.message}
            {...register('email')}
          />
          <TextField
            label="Contraseña"
            type="password"
            error={!!errors.password}
            helperText={errors.password?.message}
            {...register('password')}
          />
          <Button type="submit" variant="contained">
            Entrar
          </Button>
        </Stack>
      </form>
    </Stack>
  );
};
