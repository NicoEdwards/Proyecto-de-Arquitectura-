"use client";

import {
  Box,
  Button,
  TextField,
  Typography,
  useMediaQuery,
  useTheme,
  Paper,
  Alert,
} from "@mui/material";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useState } from "react";
import React from "react";

export default function LoginForm() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const [error, setError] = useState("");

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email("Correo inválido")
        .required("Campo obligatorio"),
      password: Yup.string()
        .min(4, "Mínimo 4 caracteres")
        .required("Campo obligatorio"),
    }),
    onSubmit: async (values) => {
      setError(""); // limpiar errores previos
      try {
        //la llamada a API
        const res = await fetch("https://tu-api.deno.dev/login", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(values),
        });

        if (!res.ok) {
          throw new Error("Credenciales inválidas");
        }

        const data = await res.json();
        console.log("Login exitoso:", data);
        // Aquí podrías redirigir al dashboard, guardar token, etc.
      } catch (err) {
        setError("Usuario o contraseña incorrectos");
      }
    },
  });

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      minHeight="100vh"
      bgcolor="#f0f2f5"
      p={2}
    >
      <Paper elevation={3} sx={{ p: 4, width: isMobile ? "100%" : 400 }}>
        <Typography variant="h5" mb={3} textAlign="center">
          Iniciar Sesión
        </Typography>

        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}

        <form onSubmit={formik.handleSubmit}>
          <TextField
            fullWidth
            margin="normal"
            id="email"
            name="email"
            label="Correo electrónico"
            value={formik.values.email}
            onChange={(e) => {
              setError(""); // borra el error si vuelve a escribir
              formik.handleChange(e);
            }}
            onBlur={formik.handleBlur}
            error={formik.touched.email && Boolean(formik.errors.email)}
            helperText={formik.touched.email && formik.errors.email}
          />
          <TextField
            fullWidth
            margin="normal"
            id="password"
            name="password"
            label="Contraseña"
            type="password"
            value={formik.values.password}
            onChange={(e) => {
              setError("");
              formik.handleChange(e);
            }}
            onBlur={formik.handleBlur}
            error={formik.touched.password && Boolean(formik.errors.password)}
            helperText={formik.touched.password && formik.errors.password}
          />
          <Button
            color="primary"
            variant="contained"
            fullWidth
            type="submit"
            sx={{ mt: 2 }}
          >
            Entrar
          </Button>
        </form>
      </Paper>
    </Box>
  );
}
