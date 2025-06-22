import { SignoutButton } from '@/components/controls/signout-button';
import Button from '@mui/material/Button';
import Link from 'next/link';
import { HeaderLayout } from './layouts/header-layout';

// Values
const privateLinks = [
  { path: '/dashboard', name: 'Dashboard' },
  { path: '/settings', name: 'Settings' },
];

export const PrivateHeader = () => (
  <HeaderLayout>
    {privateLinks.map(({ path, name }) => (
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
    <SignoutButton />
  </HeaderLayout>
);
