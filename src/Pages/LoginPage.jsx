import React, { useState } from "react";
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
} from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { loginUser } from "../Redux/Slices/Users/UsersSlice";
import CustomHeader from "../Components/CustomTitles";
import { generateRandomQuote } from "../Utils/generateRandomQuote";
import Quotes from "../Components/Quotes";
import Subtitle from "../Components/Subtitle";
import ButtonVariants from "../Components/CustomButton";
import CustomButton from "../Components/CustomButton";
import { Google } from "@mui/icons-material";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const theme = useTheme();
  const { status, loading, error } = useSelector((state) => state.user);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const loginBackgroundImage = require("../Images/loginBG.jpg");

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(loginUser({ email, password }))
      .unwrap() // To handle resolved promise
      .then(() => {
        navigate("/dashboard", { replace: true }); // Redirect to dashboard on successful login
      })
      .catch(() => {
        // Error handling already managed by the slice
      });
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
          alignItems: "center",
          justifyContent: "flex-start",
          py: 15,
          backgroundColor: theme.palette.background.paper,
          flex: 1,
          height: "100%",
          px: 15,
        }}
      >
        {/* APP LOGO GOES HERE */}
        <CustomHeader variant="h5">Log in</CustomHeader>
        <Subtitle color="#ccc" subtitleStyle={"small_black"}>
          New To Akron? <Link to={"/join"}>Join us</Link>{" "}
        </Subtitle>

        <CustomButton
          customStyles={{ mt: 3, textTransform: "capitalize" }}
          variant={"contained"}
          startIcon={<Google color="#ff3"  />}
          fullWidth
          styleType={"iconAndText"}
          onClick={() => console.log("Tuiii")}
        >
          Sign In With Google
        </CustomButton>
        {/* <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
          <TextField
            label="Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            fullWidth
            margin="normal"
            required
          />
          <TextField
            label="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            fullWidth
            margin="normal"
            required
          />

          <CustomButton
            fullWidth
            variant={"contained"}
            type="submit"
            styleType={"secondary"}
            disabled={loading}
            customStyles={{ mt: 2 }}
          >
            {loading ? <CircularProgress size={24} /> : "Login"}
          </CustomButton>
          {error && (
            <Alert severity="error" sx={{ mt: 2 }}>
              {error}
            </Alert>
          )}
        </Box> */}
      </Box>
    </Container>
  );
};

export default Login;
