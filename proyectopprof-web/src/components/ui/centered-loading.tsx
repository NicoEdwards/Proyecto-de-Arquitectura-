import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';

export const CenteredLoading = () => (
  <Box
    sx={{
      height: '100vh',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    }}
  >
    <CircularProgress />
  </Box>
);
