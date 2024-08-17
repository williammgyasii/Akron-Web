import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  TextField,
  Button,
  Typography,
  CircularProgress,
  Container,
  Box,
  Alert,
  useTheme,
  Stack,
} from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { loginUser } from "../Redux/Slices/Users/UsersSlice";
import CustomHeader from "../Components/CustomTitles";
import { generateRandomQuote } from "../Utils/generateRandomQuote";
import Quotes from "../Components/Quotes";
import CustomSubtitle from "../Components/CustomSubtitle";
import CustomButton from "../Components/CustomButton";
import { Google, LoginOutlined } from "@mui/icons-material";
import CustomFormInput from "../Components/CustomFormInput";
import CustomSnackBar from "../Components/SnackbarComponent";
import SnackbarComponent from "../Components/SnackbarComponent";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const theme = useTheme();
  const { currentUser, error, loading } = useSelector((state) => state.user);
  const loginBackgroundImage = require("../Images/loginBG.jpg");
  const [snackbar, setSnackbar] = useState({ open: false, message: "" });

  const [formValues, setFormValues] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({ email: false, password: false });
  const [helperTexts, setHelperTexts] = useState({ email: "", password: "" });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormValues({
      ...formValues,
      [name]: value,
    });
  };

  // useEffect(() => {
  //   if (currentUser) {
  //     navigate("/dashboard", { replace: true });
  //   }
  // }, [currentUser, navigate]);

  const validateEmail = (email) => {
    // Regex for validating email
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
  };

  const validateForm = () => {
    let valid = true;
    let newErrors = { email: false, password: false };
    let newHelperTexts = { email: "", password: "" };

    if (!validateEmail(formValues.email)) {
      newErrors.email = true;
      newHelperTexts.email = "Invalid email address";
      valid = false;
    }
    if (formValues.password.length <= 8) {
      newErrors.password = true;
      newHelperTexts.password = "Password must be more than 8 characters";
      valid = false;
    }

    setErrors(newErrors);
    setHelperTexts(newHelperTexts);
    return valid;
  };

  const handleError = (message) => {
    setSnackbar({ open: true, message });
  };

  const handleClose = () => {
    setSnackbar((prev) => ({ ...prev, open: false }));
  };

  // Example error simulation
 


  const handleSubmit = (e) => {
    e.preventDefault();

    if (validateForm()) {
      // Submit form data
      dispatch(
        loginUser({ email: formValues.email, password: formValues.password })
      )
        .unwrap() // To handle resolved promise
        .then(() => {
          navigate("/dashboard", { replace: true }); // Redirect to dashboard on successful login
        })
        .catch((error) => {
          handleError(error)
        });
    } else {
      console.log("invalid");
    }
  };

 
  return (
    <Container
      component="main"
      maxWidth={false}
      disableGutters
      sx={{
        // backgroundColor: "red",
        display: "flex",
        justifyContent: "center",
        height: "100vh",
        alignItems: "center",
        [theme.breakpoints.down("tablets_port")]: {
          flexDirection: "column",
        },
      }}
    >
      {/* ALLOW IT TO CHANGE IMAGES IN THE FUTURE */}
      <Box
        sx={{
          position: "relative",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          // backgroundColor: "blue",
          flexBasis: "40%",
          height: "100%",
          padding: 5,
          backgroundImage: `
          linear-gradient(
            rgba(0, 0, 0, 0.6), 
            rgba(0, 0, 0, 0.75)
          ),
          url(${loginBackgroundImage})`, // Replace with your image URL
          backgroundSize: "cover",
          backgroundPosition: "bottom",
          objectFit: "contain",
          [theme.breakpoints.down("tablets_port")]: {
            padding: 3,
            flexBasis: "30%",
          },
        }}
      >
        <CustomHeader
          customStyles={{
            [theme.breakpoints.down("tablets_port")]: {
              mt: 10,
              fontSize: "2rem",
            },
          }}
          styledText
          color={"#fff"}
        >
          Life Begins when you start living
        </CustomHeader>
        <Quotes />
        <CustomSubtitle
          customStyles={{
            [theme.breakpoints.down("tablets_port")]: {
              fontSize: ".8rem",
            },
          }}
          subtitleStyle={"small_white"}
          styled={false}
          color={"#fff"}
        >
          Boost your productivity and achieve Your Goals: <br />
          Turn Everyday Tasks into Triumphs with Smart Planning and Organized
          Efficiency
        </CustomSubtitle>
      </Box>

      {/* //FORM COMPONENT */}
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "stretch",
          justifyContent: "flex-start",
          py: 20,
          backgroundColor: theme.palette.background.paper,
          flex: 1,
          height: "100%",
          px: 20,
          [theme.breakpoints.down("tablets_landscape")]: {
            px: 8,
          },
          [theme.breakpoints.down("tablets_port")]: {
            padding: 2,
            width: "100%",
          },
          [theme.breakpoints.up("desktop")]: {
            px: 25, // Styles for min-width of 'md' breakpoint
          },
        }}
      >
        
        <SnackbarComponent
          open={snackbar.open}
          onClose={handleClose}
          message={snackbar.message}
        />
        {/* APP LOGO GOES HERE */}
        <CustomHeader variant="h5">Log in</CustomHeader>
        <CustomSubtitle subtitleStyle={"small_black"}>
          New To Akron? <Link to={"/join"}>Join us</Link>{" "}
        </CustomSubtitle>

        <CustomButton
          customStyles={{ mt: 3, textTransform: "capitalize" }}
          variant={"contained"}
          startIcon={<Google color="#ff3" />}
          fullWidth
          styleType={"iconAndText"}
          onClick={() => console.log("Tuiii")}
        >
          Sign In With Google
        </CustomButton>

        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 5 }}>
          <Stack spacing={2}>
            <CustomFormInput
              label="Email"
              name="email"
              value={formValues.email}
              onChange={handleInputChange}
              error={errors.email}
              helperText={helperTexts.email}
            />
            <CustomFormInput
              label="Password"
              name="password"
              type="password"
              value={formValues.password}
              onChange={handleInputChange}
              error={errors.password}
              helperText={helperTexts.password}
            />
            <CustomButton
              fullWidth
              startIcon={<LoginOutlined />}
              type="submit"
              disabled={loading}
              styleType={"secondary"}
              color="primary"
            >
              {loading ? (
                <CircularProgress sx={{ color: "#fff" }} size={24} />
              ) : (
                "Log in"
              )}
            </CustomButton>
          </Stack>
        </Box>
      </Box>
    </Container>
  );
};

export default Login;
