import { LoginForm } from '@/features/auth/components/login-form';
import Box from '@mui/material/Box';

export default function LoginPage() {
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
      <LoginForm />
    </Box>
  );
}
