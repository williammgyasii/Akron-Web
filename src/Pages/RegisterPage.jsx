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
  Grid,
} from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { loginUser, registerUser } from "../Redux/Slices/Users/UsersSlice";
import CustomHeader from "../Components/CustomTitles";
import { generateRandomQuote } from "../Utils/generateRandomQuote";
import Quotes from "../Components/Quotes";
import Subtitle from "../Components/Subtitle";
import ButtonVariants from "../Components/CustomButton";
import CustomButton from "../Components/CustomButton";
import { Google, LoginOutlined } from "@mui/icons-material";
import CustomFormInput from "../Components/CustomFormInput";
import CustomSnackBar from "../Components/CustomSnackbar";

const RegisterPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const theme = useTheme();
  const { currentUser, error, loading } = useSelector((state) => state.user);
  const registerBg = require("../Images/RegisterBg.jpg");
  const [snackBarOpen, setSnackBarOpen] = useState(false);

  const [formValues, setFormValues] = useState({
    firstName: "",
    lastName: "",
    email: "",
    username: "",
    password: "",
  });
  const [errors, setErrors] = useState({
    firstName: false,
    lastName: false,
    email: false,
    username: false,
    password: false,
  });
  const [helperTexts, setHelperTexts] = useState({
    firstName: "",
    lastName: "",
    email: "",
    username: "",
    password: "",
  });
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("error");

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  // useEffect(() => {
  //   if (currentUser) {
  //     navigate("/dashboard", { replace: true });
  //   }
  // }, [currentUser, navigate]);

  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
  };

  const validateForm = () => {
    let valid = true;
    let newErrors = { ...errors };
    let newHelperTexts = { ...helperTexts };

    if (!formValues.firstName) {
      newErrors.firstName = true;
      newHelperTexts.firstName = "First name is required";
      valid = false;
    }
    if (!formValues.lastName) {
      newErrors.lastName = true;
      newHelperTexts.lastName = "Last name is required";
      valid = false;
    }
    if (!validateEmail(formValues.email)) {
      newErrors.email = true;
      newHelperTexts.email = "Invalid email address";
      valid = false;
    }
    if (!formValues.username) {
      newErrors.username = true;
      newHelperTexts.username = "Username is required";
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

  // const handleSubmit = (e) => {
  //   e.preventDefault();

  //   if (validateForm()) {
  //     setSnackBarOpen(false);
  //     // Submit form data
  //     dispatch(
  //       loginUser({ email: formValues.email, password: formValues.password })
  //     )
  //       .unwrap() // To handle resolved promise
  //       .then(() => {
  //         navigate("/dashboard", { replace: true }); // Redirect to dashboard on successful login
  //       })
  //       .catch((error) => {
  //         console.log("Erro logging in", error);
  //       });
  //     console.log("Form submitted:", formValues);
  //     console.log(error);
  //   } else {
  //     console.log("invalid");
  //     setSnackBarOpen(true);
  //   }
  // };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      try {
        await dispatch(registerUser(formValues));
        navigate("/dashboard", { replace: true });
      } catch (error) {
        setSnackbarMessage("Registration failed. Please try again.");
        setSnackbarSeverity("error");
        setSnackbarOpen(true);
      }
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
          url(${registerBg})`, // Replace with your image URL
          backgroundSize: "cover",
          backgroundPosition: "bottom",
          objectFit: "contain",
        }}
      >
        {/* <CustomHeader styledText color={"#fff"}>
          Created For Your Growth
        </CustomHeader> */}
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
          py: 15,
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
        <CustomHeader variant="h5">Join Akron</CustomHeader>
        <Subtitle subtitleStyle={"small_black"}>
          Already have an account? <Link to={"/login"}>Log in</Link>{" "}
        </Subtitle>

        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 5 }}>
          <Grid container spacing={2.3}>
            <Grid item xs={12} sm={6}>
              <CustomFormInput
                label="First Name"
                name="firstName"
                value={formValues.firstName}
                onChange={handleInputChange}
                error={errors.firstName}
                helperText={helperTexts.firstName}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <CustomFormInput
                label="Last Name"
                name="lastName"
                value={formValues.lastName}
                onChange={handleInputChange}
                error={errors.lastName}
                helperText={helperTexts.lastName}
              />
            </Grid>
            <Grid item xs={12}>
              <CustomFormInput
                label="Email"
                name="email"
                value={formValues.email}
                onChange={handleInputChange}
                error={errors.email}
                helperText={helperTexts.email}
              />
            </Grid>
            <Grid item xs={12}>
              <CustomFormInput
                label="Username (only letters, numbers and underscores)"
                name="username"
                value={formValues.username}
                onChange={handleInputChange}
                error={errors.username}
                helperText={helperTexts.username}
              />
            </Grid>
            <Grid item xs={12}>
              <CustomFormInput
                label="Password (min of 8 characters)"
                name="password"
                type="password"
                value={formValues.password}
                onChange={handleInputChange}
                error={errors.password}
                helperText={helperTexts.password}
              />
            </Grid>
            <Grid item xs={12}>
              <CustomButton
                fullWidth
               
                type="submit"
                disabled={loading}
                styleType={"secondary"}
                color="primary"
              >
                {loading ? (
                  <CircularProgress sx={{ color: "#fff" }} size={24} />
                ) : (
                  "Join"
                )}
              </CustomButton>
            </Grid>
          </Grid>

          <CustomButton
            customStyles={{ mt: 3, textTransform: "capitalize" }}
            variant={"contained"}
            startIcon={<Google color="#ff3" />}
            fullWidth
            styleType={"iconAndText"}
            onClick={() => console.log("Tuiii")}
          >
            Sign Up With Google
          </CustomButton>

          <Subtitle color="#ccc" customStyles={{ fontSize: "1rem", mt: 5 }}>
            By joining, you agree to the <Link>Terms</Link> and{" "}
            <Link>Privacy Policy</Link>
          </Subtitle>
        </Box>
      </Box>
    </Container>
  );
};

export default RegisterPage;
