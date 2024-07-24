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
import Subtitle from "../Components/Subtitle";
import ButtonVariants from "../Components/CustomButton";
import CustomButton from "../Components/CustomButton";
import { Google, LoginOutlined } from "@mui/icons-material";
import CustomFormInput from "../Components/CustomFormInput";
import CustomSnackBar from "../Components/CustomSnackbar";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const theme = useTheme();
  const { currentUser,error,loading } = useSelector((state) => state.user);
  const loginBackgroundImage = require("../Images/loginBG.jpg");
  const [snackBarOpen, setSnackBarOpen] = useState(false);

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

  const handleCloseSnackbar = () => {
    setSnackBarOpen(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (validateForm()) {
      setSnackBarOpen(false);
      // Submit form data
      dispatch(
        loginUser({ email: formValues.email, password: formValues.password })
      )
        .unwrap() // To handle resolved promise
        .then(() => {
          navigate("/dashboard", { replace: true }); // Redirect to dashboard on successful login
        })
        .catch((error) => {
          console.log("Erro logging in", error);
        });
      console.log("Form submitted:", formValues);
      console.log(error);
    } else {
      console.log("invalid");
      setSnackBarOpen(true);
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
        flexDirection: "row",
        justifyContent: "center",
        height: "100vh",
        alignItems: "center",
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
        }}
      >
        <CustomHeader styledText color={"#fff"}>
          Life Begins when you start living
        </CustomHeader>
        <Quotes />
        <Subtitle subtitleStyle={"small_white"} styled={false} color={"#fff"}>
          Boost your productivity and achieve Your Goals: <br />
          Turn Everyday Tasks into Triumphs with Smart Planning and Organized
          Efficiency
        </Subtitle>
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
          px: 15,
        }}
      >
        <CustomSnackBar
          message={"Invalid Email Password"}
          snackBarOpen={snackBarOpen}
          vertical={"top"}
          horizontal={"right"}
          handleCloseSnackbar={handleCloseSnackbar}
        />
        {/* APP LOGO GOES HERE */}
        <CustomHeader variant="h5">Log in</CustomHeader>
        <Subtitle subtitleStyle={"small_black"}>
          New To Akron? <Link to={"/join"}>Join us</Link>{" "}
        </Subtitle>

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
