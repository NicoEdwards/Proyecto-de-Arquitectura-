"use client";

import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import theme from "../theme/theme.ts";
import React from "react";
import Navbar from "./components/NavBar.tsx";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Navbar /> {/* <-- Aquí */}
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
