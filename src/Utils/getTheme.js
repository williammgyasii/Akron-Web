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
      dark900: "#10197A", //BluePurple
      dark800: "#1A2793",
      dark700: "#2A3BB7",
      dark600: "#3D53DB",
      main: "#546FFF",
      light400: "#9F84FD",
      light300: "#98ABFF",
      light200: "#BAC8FF",
      light100: "#DCE4FF",
      white: "#fff",
    },
    secondary: {
      dark900: "#040815", //BluePurple
      dark800: "#060713",
      dark700: "#0A0A18",
      dark600: "#0E0F1D",
      main: "#141522",
      light400: "#54577A",
      light300: "#8E92BC",
      light200: "#C2C6E8D",
      light100: "#DFE1F3",
    },
    info: {
      dark900: "#102E7A", //BluePurple
      dark800: "#1A4393",
      dark700: "#2A60B7",
      dark600: "#3D81DB",
      main: "#54A6FF",
      light400: "#7EC2FF",
      light300: "#98D3FF",
      light200: "#BAE5FF",
      light100: "#DCF3FF",
    },
    warning: {
      dark900: "#7A4D0B", //BluePurple
      dark800: "#936312",
      dark700: "#B7821D",
      dark600: "#DBA32A",
      main: "#FFC73A",
      light400: "#FFD96B",
      light300: "#FFE488",
      light200: "#FFEFB0",
      light100: "#FFF8D7",
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
      dark900: "#7A0619", //BluePurple
      dark800: "#930B16",
      dark700: "#B71112",
      dark600: "#DB2719",
      main: "#ff4423",
      light400: "#FF7F59",
      light300: "#FFA37A",
      light200: "#FFC8A6",
      light100: "#FFE7D3", // Error color
    },
    success: {
      dark900: "#3b6506", //BluePurple
      dark800: "#4C7A0B",
      dark700: "#659711",
      dark600: "#7FB519",
      main: "#9CD323",
      light400: "#BCE455",
      light300: "#D3F178",
      light200: "#E8FAA6",
      light100: "#F5FCD2",
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
