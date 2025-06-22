'use client';

import { AppRouterCacheProvider } from '@mui/material-nextjs/v15-appRouter';
import CssBaseline from '@mui/material/CssBaseline';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { SnackbarProvider } from 'notistack';
import { PropsWithChildren } from 'react';

const theme = createTheme({
  typography: { fontFamily: 'var(--font-roboto)' },
  palette: {
    mode: 'light',
    primary: {
      main: '#0D1B2A', // Azul oscuro elegante
    },
    secondary: {
      main: '#1B263B', // Un azul-gris más suave
    },
    background: {
      default: '#e5e4e2', // Casi blanco, muy leve gris
    },
    text: {
      primary: '#0D1B2A', // Texto principal azul oscuro
      secondary: '#415A77', // Texto secundario (gris azulado)
    },
  },
});

export const MuiProvider = ({ children }: PropsWithChildren) => {
  return (
    // For next.js
    <AppRouterCacheProvider>
      <ThemeProvider theme={theme}>
        {/* Normalize css */}
        <CssBaseline />
        {/* "notistack" */}
        <SnackbarProvider maxSnack={3}>{children}</SnackbarProvider>
      </ThemeProvider>
    </AppRouterCacheProvider>
  );
};
