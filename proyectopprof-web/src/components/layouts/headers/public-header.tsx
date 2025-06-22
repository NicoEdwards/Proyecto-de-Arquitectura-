import Button from '@mui/material/Button';
import Link from 'next/link';
import { HeaderLayout } from './layouts/header-layout';

// Values
const publicLinks = [
  { path: '/', name: 'Inicio' },
  { path: '/about', name: 'Sobre nosotros' },
  { path: '/register', name: 'Registrarse' },
  { path: '/login', name: 'Iniciar sesión' },
];

export const PublicHeader = () => (
  <HeaderLayout>
    {publicLinks.map(({ path, name }) => (
      <Link
        style={{ textDecoration: 'none', color: 'inherit' }}
        key={path}
        href={path}
      >
        <Button sx={{ textTransform: 'none' }} variant="text" color="inherit">
          {name}
        </Button>
      </Link>
    ))}
  </HeaderLayout>
);
