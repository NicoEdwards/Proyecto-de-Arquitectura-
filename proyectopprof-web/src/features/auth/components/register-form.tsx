'use client';

import { ROUTES } from '@/constants/routes';
import { registerApi } from '@/features/auth/api';
import {
  RegisterAuth,
  registerAuthSchema,
} from '@/lib/zod/schemas/auth.schema';
import { zodResolver } from '@hookform/resolvers/zod';
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormGroup from '@mui/material/FormGroup';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { useRouter } from 'next/navigation';
import { enqueueSnackbar } from 'notistack';
import { useForm } from 'react-hook-form';

export const RegisterForm = () => {
  // "next-router"
  const router = useRouter();

  // "react-hook-form"
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterAuth>({ resolver: zodResolver(registerAuthSchema) });

  // Utils
  const onSubmit = async ({ email, password, bci, chile }: RegisterAuth) => {
    const bankIds = [];
    if (bci) bankIds.push('bci');
    if (chile) bankIds.push('chile');

    try {
      const { message } = await registerApi({
        email,
        password,
        bankIds,
      });
      enqueueSnackbar(message, { variant: 'success' });

      router.push(ROUTES.LOGIN);
    } catch (err) {
      const message =
        err instanceof Error ? err.message : 'Something went wrong';
      enqueueSnackbar(message, { variant: 'error' });
    }
  };

  return (
    <Stack sx={{ width: '400px', px: 6, py: 8 }} component={Paper} spacing={2}>
      <Typography variant="h5" textAlign="center">
        Regístrate
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
          <FormGroup row>
            <FormControlLabel
              control={<Checkbox {...register('bci')} />}
              label="Banco BCI"
            />
            <FormControlLabel
              control={<Checkbox {...register('chile')} />}
              label="Banco de Chile"
            />
          </FormGroup>
          <Button type="submit" variant="contained">
            Registrarse
          </Button>
        </Stack>
      </form>
    </Stack>
  );
};
