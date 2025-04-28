import { useState } from "react";
import {
  TextField,
  Button,
  Typography,
  Box,
  Container,
  Grid,
  Paper,
} from "@mui/material";
import React from "react";

export default function RegisterForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleRegister = async () => {
    setError("");
    setLoading(true);

    try {
      const res = await fetch("http://localhost:8000/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      if (res.status === 201) {
        alert("Registro exitoso");
        setEmail("");
        setPassword("");
      } else {
        const text = await res.text();
        setError(text);
      }
    } catch (err) {
      setError("Error de conexión");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="xs">
      {" "}
      {/* Contenedor para móvil y tablet */}
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 2,
          justifyContent: "center",
          alignItems: "center",
          mt: 4,
        }}
      >
        <Paper elevation={3} sx={{ padding: 3, width: "100%" }}>
          <Typography
            variant="h4"
            component="h1"
            textAlign="center"
            sx={{ mb: 2 }}
          >
            Crear Cuenta
          </Typography>

          {error && <Typography color="error">{error}</Typography>}

          <Grid container spacing={2}>
            {/* Estos son los items dentro del contenedor */}
            <Grid item xs={12}>
              <TextField
                label="Email"
                fullWidth
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Contraseña"
                type="password"
                fullWidth
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <Button
                variant="contained"
                color="primary"
                fullWidth
                onClick={handleRegister}
                disabled={loading}
              >
                {loading ? "Registrando..." : "Registrarse"}
              </Button>
            </Grid>
          </Grid>
        </Paper>
      </Box>
    </Container>
  );
}
