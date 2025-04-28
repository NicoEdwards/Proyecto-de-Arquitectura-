import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#0D1B2A", // Azul oscuro elegante
    },
    secondary: {
      main: "#1B263B", // Un azul-gris más suave
    },
    background: {
      default: "#e5e4e2", // Casi blanco, muy leve gris
    },
    text: {
      primary: "#0D1B2A", // Texto principal azul oscuro
      secondary: "#415A77", // Texto secundario (gris azulado)
    },
  },
  typography: {
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
  },
});

export default theme;
