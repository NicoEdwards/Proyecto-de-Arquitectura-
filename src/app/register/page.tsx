"use client";

import Image from "next/image";
import {
  Box,
  Typography,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import RegisterForm from "../components/RegisterForm.tsx";
import FinSightLogo from "@/assets/FinSightLogo.png";
import React from "react";

export default function RegisterPage() {
  return (
    // Contenedor relativo, ocupa toda la ventana
    <Box
      sx={{
        position: "relative",
        minHeight: "100vh",
        bgcolor: "background.default",
      }}
    >
      {/** ─── FORMULARIO ──────────────────────────────────────── */}
      <Box
        sx={{
          // En móvil: estático, ocupa full ancho, con padding
          position: { xs: "static", md: "absolute" },
          top: { md: "50%" },
          left: { md: "50%" },
          transform: { md: "translate(-50%, -50%)" },
          width: { xs: "100%", sm: "80%", md: 400 },
          p: { xs: 2, md: 4 },
        }}
      >
        <RegisterForm />
      </Box>

      {/** ─── CUADRO DE TEXTO (logo + lista) ─────────────────────── */}
      <Box
        sx={{
          // En móvil: estático (se apila tras el formulario)
          position: { xs: "static", md: "absolute" },
          top: { md: "50%" },
          right: { md: 0 },
          transform: { md: "translateY(-50%)" },
          width: { xs: "100%", md: 300 },
          bgcolor: "primary.main",
          color: "white",
          p: 4,
          // centrar texto sólo en móvil
          textAlign: { xs: "center", md: "right" },
        }}
      >
        <Box sx={{ mb: 3 }}>
          <Image
            src={FinSightLogo}
            alt="FinSight Logo"
            width={140}
            height={140}
          />
        </Box>
        <Typography variant="h5" sx={{ mb: 2 }}>
          Bienvenido a FinSight
        </Typography>
        <Typography variant="body1" sx={{ mb: 3 }}>
          Tu portal de información financiera confiable:
        </Typography>
        <List>
          {[
            "Accede a convenios exclusivos",
            "Consulta tu información bancaria",
            "Optimiza tus inversiones",
          ].map((text, i) => (
            <ListItem
              key={i}
              disableGutters
              sx={{ justifyContent: { xs: "center", md: "flex-end" } }}
            >
              <ListItemIcon sx={{ minWidth: 32 }}>
                <CheckCircleIcon sx={{ color: "white" }} />
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItem>
          ))}
        </List>
      </Box>
    </Box>
  );
}
