// ButtonVariants.js
import React from "react";
import { Button, Container, Stack, IconButton } from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import InfoIcon from "@mui/icons-material/Info";
import SettingsIcon from "@mui/icons-material/Settings";

// Define custom styles using `sx` prop
const buttonStyles = {
  primary: {
    backgroundColor: (theme) => theme.palette.primary.main,
    color: (theme) => theme.palette.primary.contrastText,
    "&:hover": {
      backgroundColor: (theme) => theme.palette.primary.dark,
    },
  },
  secondary: {
    backgroundColor: (theme) => theme.palette.secondary.main,
    textTransform:"capitalize",
    fontWeight:500,
    gap: 1,
    color: (theme) => theme.palette.secondary.contrastText,
    "&:hover": {
      backgroundColor: (theme) => theme.palette.secondary.dark,
    },
  },
  outlined: {
    borderColor: (theme) => theme.palette.primary.main,
    color: (theme) => theme.palette.primary.main,
    borderWidth: 2,
    "&:hover": {
      borderColor: (theme) => theme.palette.primary.dark,
      color: (theme) => theme.palette.primary.dark,
    },
  },
  text: {
    color: (theme) => theme.palette.primary.main,
    "&:hover": {
      backgroundColor: (theme) => theme.palette.action.hover,
    },
  },
  iconButton: {
    color: (theme) => theme.palette.primary.main,
    "&:hover": {
      backgroundColor: (theme) => theme.palette.action.hover,
    },
  },
  iconAndText: {
    display: "flex",
    alignItems: "center",
    fontSize: "1rem",
    // justifyContent:"space-between",
    gap: 1, // theme.spacing(1) equivalent
    "&:hover": {
      backgroundColor: (theme) => theme.palette.secondary.hover,
      color: (theme) => theme.palette.secondary.subtitle,
    },
  },
};

const CustomButton = ({
  styleType,
  variant,
  children,
  fullWidth,
  type,
  disabled,
  customStyles,
  ...props
}) => {
  return (
    <Button
      type={type}
      startIcon={props.startIcon}
      endIcon={props.endIcon}
      sx={[buttonStyles[styleType], customStyles]}
      fullWidth={fullWidth}
      variant={variant}
      disabled={disabled}
      onClick={props.onClick}
    >
      {children}
    </Button>
  );
};

export default CustomButton;

// // ButtonVariants.js
// import React from 'react';
// import { Button, Container, Stack, IconButton } from '@mui/material';
// import HomeIcon from '@mui/icons-material/Home';
// import InfoIcon from '@mui/icons-material/Info';
// import SettingsIcon from '@mui/icons-material/Settings';

// // Define custom styles using `sx` prop
// const buttonStyles = {
//   primary: {
//     backgroundColor: (theme) => theme.palette.primary.main,
//     color: (theme) => theme.palette.primary.contrastText,
//     '&:hover': {
//       backgroundColor: (theme) => theme.palette.primary.dark,
//     },
//   },
//   secondary: {
//     backgroundColor: (theme) => theme.palette.secondary.main,
//     color: (theme) => theme.palette.secondary.contrastText,
//     '&:hover': {
//       backgroundColor: (theme) => theme.palette.secondary.dark,
//     },
//   },
//   outlined: {
//     borderColor: (theme) => theme.palette.primary.main,
//     color: (theme) => theme.palette.primary.main,
//     borderWidth: 2,
//     '&:hover': {
//       borderColor: (theme) => theme.palette.primary.dark,
//       color: (theme) => theme.palette.primary.dark,
//     },
//   },
//   text: {
//     color: (theme) => theme.palette.primary.main,
//     '&:hover': {
//       backgroundColor: (theme) => theme.palette.action.hover,
//     },
//   },
//   iconButton: {
//     color: (theme) => theme.palette.primary.main,
//     '&:hover': {
//       backgroundColor: (theme) => theme.palette.action.hover,
//     },
//   },
//   iconAndText: {
//     display: 'flex',
//     alignItems: 'center',
//     gap: 1, // theme.spacing(1) equivalent
//   },
// };

// const ButtonVariants = () => {
//   return (
//     <Container>
//       <Stack spacing={2} direction="column" alignItems="center">
//         <Button sx={buttonStyles.primary} variant="contained">
//           Primary Button
//         </Button>
//         <Button sx={buttonStyles.secondary} variant="contained">
//           Secondary Button
//         </Button>
//         <Button sx={buttonStyles.outlined} variant="outlined">
//           Outlined Button
//         </Button>
//         <Button sx={buttonStyles.text} variant="text">
//           Text Button
//         </Button>
//         <IconButton sx={buttonStyles.iconButton} aria-label="home">
//           <HomeIcon />
//         </IconButton>
//         <Button sx={buttonStyles.iconAndText} variant="contained" startIcon={<InfoIcon />}>
//           Info Button
//         </Button>
//         <Button sx={buttonStyles.iconAndText} variant="contained" startIcon={<SettingsIcon />}>
//           Settings
//         </Button>
//       </Stack>
//     </Container>
//   );
// };

// export default ButtonVariants;
