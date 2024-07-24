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
import { useNavigate } from "react-router-dom";
import { loginUser } from "../Redux/Slices/Users/UsersSlice";
import CustomHeader from "../Components/CustomTitles";
import { generateRandomQuote } from "../Utils/generateRandomQuote";
import Quotes from "../Components/Quotes";
import Subtitle from "../Components/Subtitle";

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
          alignItems:"center",
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
        <CustomHeader color={"#fff"}>
          Life Begins when you start living
        </CustomHeader>
        <Quotes />
        <Subtitle styled={false} variant="h6" color={"#fff"}>
          Boost Your Productivity and Achieve Your Goals: <br/>
          Turn Everyday Tasks
          into Triumphs with Smart Planning and Organized Efficiency
        </Subtitle>
      </Box>
      {/* //FORM COMPONENT */}
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",

          backgroundColor: theme.palette.background.paper,
          flex: 1,
          height: "100%",
        }}
      >
        <Typography variant="h5">Login</Typography>
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
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
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            disabled={loading}
            sx={{ mt: 2 }}
          >
            {loading ? <CircularProgress size={24} /> : "Login"}
          </Button>
          {error && (
            <Alert severity="error" sx={{ mt: 2 }}>
              {error}
            </Alert>
          )}
        </Box>
      </Box>
    </Container>
  );
};

export default Login;
