// src/theme.js
import { createTheme } from "@mui/material/styles";

// Define your custom colors and typography
const theme = createTheme({
  breakpoints: {
    values: {
      phone: 350, // Extra small devices (phones, 600px and down)
      tablets_port: 600, // Small devices (tablets, 600px and up)
      tablets_landscape: 970, // Medium devices (small laptops, 900px and up)
      desktop: 1000, // Large devices (desktops, 1200px and up)
      desktop_large: 1536, // Extra large devices (large desktops, 1536px and up)
    },
  },
  palette: {
    primary: {
      main: "#1976d2", // Blue color
    },
    secondary: {
      main: "#000000", // black color
      subtitle: "#fff",
      hover: "#000000",
    },
    background: {
      default: "#f5f5f5", // Light grey background
      paper: "#ffff", // White paper background
    },
    text: {
      primary: "#333333", // Dark text color
      secondary: "#555555", // Light text color
      subtitle_black: "#00000",
      subtitle_white: "#fff",
      subtitle1: "#fff",
    },
    error: {
      main: "#f44336", // Error color
    },
    action: {
      hover: "#ff3",
    },
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    h1: {
      fontSize: "3.0rem",
      fontWeight: 800,
    },
    h2: {
      fontSize: "2rem",
      fontWeight: 500,
    },
    h3: {
      fontSize: "1.75rem",
      fontWeight: 400,
    },
    h4: {
      fontSize: "1.5rem",
      fontWeight: 400,
    },
    h5: {
      fontSize: "1.25rem",
      fontWeight: 400,
    },
    h6: {
      fontSize: "1rem",
      fontWeight: 500,
    },
    body1: {
      fontSize: "1rem",
      fontWeight: 400,
    },
    subtitle1: {
      fontSize: "1rem",
      fontWeight: 400,
    },
    button: {
      fontSize: "0.875rem",
      fontWeight: 500,
    },
    quote: {
      fontSize: "1rem",
      fontWeight: "300",
    },
  },
});

export default theme;
