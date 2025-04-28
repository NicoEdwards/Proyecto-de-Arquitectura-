"use client";
import { Box, Button, Typography } from "@mui/material";
import { useRouter } from "next/navigation";
import React from "react";
import { useEffect, useState } from "react";

export default function Home() {
  const router = useRouter();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);
  }, []);

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: 3,
        padding: 2,
      }}
    >
      <Typography variant="h3" textAlign="center">
        Bienvenido a FinSight
      </Typography>

      {!isLoggedIn ? (
        <>
          <Button
            variant="contained"
            size="large"
            onClick={() => router.push("/login")}
          >
            Iniciar Sesión
          </Button>

          <Button
            variant="outlined"
            size="large"
            onClick={() => router.push("/register")}
          >
            Registrarse
          </Button>
        </>
      ) : (
        <>
          <Typography variant="h6">Ya has iniciado sesión.</Typography>

          <Button
            variant="contained"
            color="success"
            size="large"
            onClick={() => router.push("/protected")}
          >
            Ir a la Página Protegida
          </Button>

          <Button
            variant="outlined"
            color="error"
            size="large"
            onClick={() => {
              localStorage.removeItem("token");
              setIsLoggedIn(false);
            }}
          >
            Cerrar Sesión
          </Button>
        </>
      )}
    </Box>
  );
}
