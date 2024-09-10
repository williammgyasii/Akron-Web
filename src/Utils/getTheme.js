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
    zinc: {
      main: "rgb(169, 172, 172)",
      dark: "rgb(71, 71, 71)",
      light: "rgba(242, 242, 242,1)",
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
      paper: "#F0F2F2", // White paper background
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
  },
  typography: {
    fontFamily: "Plus Jarkata Sans , Inter , Arial , sans-serif",
    text_xs: {
      fontWeight: "400",
      fontSize: "12px",
    },
    text_sm: {
      fontSize: "14px",
    },
    text_base: {
      fontSize: "16px",
      textDecoration: "none",
    },
    text_lg: {
      fontSize: "20px",
    },
    text_xl: {
      fontSize: "24px",
    },
    text_2xl: {
      fontSize: "36px",
    },
    text_3xl: {
      fontSize: "40px",
    },
    text_4xl: {
      fontSize: "72px",
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 5,
          textTransform: "none",
          transition: "background-color 0.3s, color 0.3s",
          // marginBottom:10,
          "&:hover": {
            backgroundColor: "rgba(0, 0, 0, 0.1)",
          },
          "&:disabled": {
            backgroundColor: "rgba(0, 0, 0, 0.2)",
            color: "rgba(0, 0, 0, 0.3)",
          },
          "&:focus": {
            outline: "2px solid #007bff",
          },
        },
      },
    },
  },
  spacing: 8, // Default spacing unit
  shape: {
    borderRadius: 4,
  },
});

export default theme;
