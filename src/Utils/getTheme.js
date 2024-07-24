// src/theme.js
import { createTheme } from '@mui/material/styles';

// Define your custom colors and typography
const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2', // Blue color
    },
    secondary: {
      main: '#000000', // black color
      subtitle:"#fff"
    },
    background: {
      default: '#f5f5f5', // Light grey background
      paper: '#ffffff', // White paper background
    },
    text: {
      primary: '#333333', // Dark text color
      secondary: '#555555', // Light text color
    },
    error: {
      main: '#f44336', // Error color
    },
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    h1: {
      fontSize: '3.0rem',
      fontWeight: 800,
    },
    h2: {
      fontSize: '2rem',
      fontWeight: 500,
    },
    h3: {
      fontSize: '1.75rem',
      fontWeight: 400,
    },
    h4: {
      fontSize: '1.5rem',
      fontWeight: 400,
    },
    h5: {
      fontSize: '1.25rem',
      fontWeight: 400,
    },
    h6: {
      fontSize: '1rem',
      fontWeight: 500,
    },
    body1: {
      fontSize: '1rem',
      fontWeight: 400,
    },
    body2: {
      fontSize: '0.875rem',
      fontWeight: 400,
    },
    button: {
      fontSize: '0.875rem',
      fontWeight: 500,
    },
  },
});

export default theme;
