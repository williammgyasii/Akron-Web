import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  CircularProgress,
  Container,
  Box,
  useTheme,
  Stack,
} from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { REGISTER_USER } from "../Redux/Slices/Users/UsersSlice";
import CustomHeader from "../Components/CustomTitles";
import Quotes from "../Components/Quotes";
import CustomSubtitle from "../Components/CustomSubtitle";
import CustomButton from "../Components/CustomButton";
import CustomFormInput from "../Components/CustomFormInput";
import SideBySideLayout from "../Layouts/SideBySide";
import { IoSettings } from "react-icons/io5";
import registerSideImage from "../Pages/LandingPage/assets/FeaturesBanner.jpg";
import CustomTitles from "../Components/CustomTitles";
import { BiRegistered } from "react-icons/bi";
import { JoinInner } from "@mui/icons-material";

const RegisterPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const theme = useTheme();
  const { USER_SLICE_IS_LOADING } = useSelector((state) => state.user);
  console.log(USER_SLICE_IS_LOADING);

  const [formValues, setFormValues] = useState({
    firstName: "",
    lastName: "",
    email: "",
    username: "",
    password: "",
    phoneNumber: "",
  });
  const [errors, setErrors] = useState({
    firstName: false,
    lastName: false,
    email: false,
    username: false,
    password: false,
    phoneNumber: false,
  });
  const [helperTexts, setHelperTexts] = useState({
    firstName: "",
    lastName: "",
    email: "",
    username: "",
    password: "",
    phoneNumber: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
  };
  const phoneRegex = /^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s/0-9]*$/;

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
    if (!phoneRegex.test(formValues.phoneNumber)) {
      newErrors.phoneNumber = true;
      newHelperTexts.phoneNumber = "Invalid phone number";
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      try {
        dispatch(REGISTER_USER(formValues))
          .unwrap()
          .then(() => {
            navigate("/dashboard", { replace: true });
          });
      } catch (error) {
        console.log(error);
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
        background:
          "linear-gradient(90deg, hsla(186, 33%, 94%, 1) 0%, hsla(216, 41%, 79%, 1) 100%)",
        // p: 2,
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
          flexBasis: "50%",
          // borderRadius: "20px",
          height: "100%",
          padding: 5,
          backgroundImage: `
          linear-gradient(
            rgba(226, 206, 182, 0.6), 
            
            rgba(0, 0, 0, 0.75)
          ),
          url(${registerSideImage})`, // Replace with your image URL
          backgroundSize: "cover",
          backgroundPosition: "bottom",
          objectFit: "contain",
          [theme.breakpoints.down("tablets_port")]: {
            padding: 3,
            flexBasis: "40%",
          },
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            [theme.breakpoints.down("tablets_port")]: {
              mt: 20,
            },
            [theme.breakpoints.down("phone")]: {
              mt: 25,
            },
          }}
        >
          {/* <Quotes /> */}
        </Box>
        <CustomSubtitle variant={"text_base"} color={"#fff"}>
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
          justifyContent: "flex-start",
          py: 17,
          backgroundColor: theme.palette.background.paper,
          flex: 1,
          ml: "-30px",
          zIndex: "20",
          borderRadius: "20px",
          height: "100%",
          [theme.breakpoints.down("tablets_landscape")]: {
            px: 8,
          },
          [theme.breakpoints.down("tablets_port")]: {
            padding: 2,
            width: "100%",
          },
          [theme.breakpoints.up("desktop")]: {
            px: 17, // Styles for min-width of 'md' breakpoint
          },
        }}
      >
        {/* APP LOGO GOES HERE */}
        <CustomTitles
          weightFont={"bold"}
          color={theme.palette.secondary.main}
          variant="text_2xl"
          withLine
        >
          Create Account
        </CustomTitles>

        <CustomSubtitle
          customStyles={{
            marginTop: "3px",
            textDecoration: "none",
          }}
          variant={"text_base"}
        >
          Already have an account?{" "}
          <Link
            style={{
              textDecoration: "none",
              color: theme.palette.primary.dark900,
            }}
            to={"/login"}
          >
            Log in
          </Link>{" "}
        </CustomSubtitle>

        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
          <Stack
            sx={{ alignItems: "center", justifyContent: "center" }}
            spacing={2.3}
          >
            <SideBySideLayout
              leftComponent={
                <CustomFormInput
                  label="First Name"
                  name="firstName"
                  type={"text"}
                  value={formValues.firstName}
                  onChange={handleInputChange}
                  error={errors.firstName}
                  helperText={helperTexts.firstName}
                />
              }
              rightComponent={
                <CustomFormInput
                  label="Last Name"
                  name="lastName"
                  type={"text"}
                  value={formValues.lastName}
                  onChange={handleInputChange}
                  error={errors.lastName}
                  helperText={helperTexts.lastName}
                />
              }
            />

            <CustomFormInput
              label="Email"
              name="email"
              type={"email"}
              value={formValues.email}
              onChange={handleInputChange}
              error={errors.email}
              helperText={helperTexts.email}
            />

            <SideBySideLayout
              leftComponent={
                <CustomFormInput
                  label="Username (only letters, numbers and underscores)"
                  name="username"
                  type={"text"}
                  value={formValues.username}
                  onChange={handleInputChange}
                  error={errors.username}
                  helperText={helperTexts.username}
                  maxCount={15}
                />
              }
              rightComponent={
                <CustomFormInput
                  label="Phone"
                  name="phoneNumber"
                  type={"number"}
                  maxCount={11}
                  value={formValues.phoneNumber}
                  onChange={handleInputChange}
                  error={errors.phoneNumber}
                  helperText={helperTexts.phoneNumber}
                />
              }
            />

            <CustomFormInput
              label="Password (min of 8 characters)"
              name="password"
              type="password"
              value={formValues.password}
              onChange={handleInputChange}
              error={errors.password}
              helperText={helperTexts.password}
              maxCount={15}
            />
            <CustomButton
              variant="primary"
              size="medium"
              isLoading={USER_SLICE_IS_LOADING}
              leftIcon={JoinInner}
              iconColor={theme.palette.warning.main}
              type="iconLeft" // Submit button for the form
              // label="Submit"
              submit
            >
              Join
              {/* {loading ? (
                <CircularProgress sx={{ color: "#fff" }} size={24} />
              ) : (
               
              )} */}
            </CustomButton>
          </Stack>

          {/* <CustomButton
            customStyles={{ mt: 10, textTransform: "capitalize" }}
            variant={"contained"}
            startIcon={<Google color="#ff3" />}
            fullWidth
            styleType={"iconAndText"}
            onClick={() => console.log("Tuiii")}
          >
            Sign Up With Google
          </CustomButton> */}
        </Box>
      </Box>
    </Container>
  );
};

export default RegisterPage;
