import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

export default function AboutPage() {
  return (
    <Box sx={{ width: '90%', mx: 'auto' }} component="main">
      <Typography sx={{ p: 1 }} component="h1" variant="h4">
        Quiénes Somos
      </Typography>

      <Typography component="p">
        Conoce los beneficios de los distintos bancos a lo largo de todo el
        país!
      </Typography>
    </Box>
  );
}
