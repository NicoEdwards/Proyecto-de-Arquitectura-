import { RegisterForm } from '@/features/auth/components/register-form';
import Box from '@mui/material/Box';

export default function RegisterPage() {
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        height: '100vh',
      }}
      component="main"
    >
      <RegisterForm />
    </Box>
  );
}
