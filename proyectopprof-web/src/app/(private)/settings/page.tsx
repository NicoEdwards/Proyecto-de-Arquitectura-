import { SettingsForm } from '@/features/auth/components/settings-form';
import Box from '@mui/material/Box';

export default function SettingsPage() {
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
      <SettingsForm />
    </Box>
  );
}
