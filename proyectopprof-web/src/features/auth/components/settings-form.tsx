'use client';

import { getUserApi, updateUserApi } from '@/features/auth/api';
import {
  RegisterAuth,
  registerAuthSchema,
} from '@/lib/zod/schemas/auth.schema';
import { zodResolver } from '@hookform/resolvers/zod';
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormGroup from '@mui/material/FormGroup';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { enqueueSnackbar } from 'notistack';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';

export const SettingsForm = () => {
  // const [bciCheck, setBciCheck] = useState(false);
  // const [chileCheck, setCheck] = useState(false);
  // const [bciCheck, setBciCheck] = useState(false);

  // "react-hook-form"
  const { register, handleSubmit, reset } = useForm<RegisterAuth>({
    resolver: zodResolver(registerAuthSchema),
    defaultValues: {
      bci: false,
      chile: false,
    },
  });

  useEffect(() => {
    (async () => {
      const { bankIds } = await getUserApi();

      reset({
        bci: bankIds.includes('bci'),
        chile: bankIds.includes('chile'),
      });
    })();
  }, [reset]);

  // Utils
  const onSubmit = async ({ bci, chile }: RegisterAuth) => {
    const bankIds = [];
    if (bci) bankIds.push('bci');
    if (chile) bankIds.push('chile');

    try {
      const { message } = await updateUserApi({ bankIds });
      enqueueSnackbar(message, { variant: 'success' });
    } catch (err) {
      const message =
        err instanceof Error ? err.message : 'Something went wrong';
      enqueueSnackbar(message, { variant: 'error' });
    }
  };

  return (
    <Stack spacing={2}>
      <Typography variant="h5" textAlign="center">
        Configuración Usuario
      </Typography>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Stack spacing={2}>
          <FormGroup>
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
            Actualizar
          </Button>
        </Stack>
      </form>
    </Stack>
  );
};
