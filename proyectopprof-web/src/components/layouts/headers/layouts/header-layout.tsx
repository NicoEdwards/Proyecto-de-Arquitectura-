import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Image from 'next/image';
import { PropsWithChildren } from 'react';

export const HeaderLayout = ({ children }: PropsWithChildren) => (
  <header>
    <AppBar position="fixed" color="primary">
      <Toolbar sx={{ width: '90%', mx: 'auto' }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <Image
            src="/images/FinSightLogo.png"
            alt="FinSight Logo"
            width={65}
            height={65}
          />
        </Box>

        <Box sx={{ flexGrow: 1 }} />

        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          {children}
        </Box>
      </Toolbar>
    </AppBar>

    {/* Empty toolbar to not have content behind the AppBar with "fixed" position  */}
    <Toolbar />
  </header>
);
