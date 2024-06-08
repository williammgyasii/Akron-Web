// src/components/Register.js
import React from "react";
import { useForm } from "react-hook-form";
import {
  TextField,
  Button,
  Container,
  Box,
  Typography,
  Avatar,
} from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { LoadingButton } from "@mui/lab";
import { useDispatch, useSelector } from "react-redux";
import { REGISTER_USER } from "../Firebase/firebaseSlice";

const RegisterPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const buttonLoading = useSelector((state) => state.firebase.loading);
  const dispatch = useDispatch();

  const onSubmit = async (event) => {
    event.preventDefault();
    console.log("fire");
    await dispatch(
      REGISTER_USER({
        email: "gyaasi.wk@gmail.com",
        password: "william123",
        name: "William Gyasi",
      })
    );
  };

  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Register
        </Typography>
        <Box component="form" onSubmit={onSubmit} noValidate sx={{ mt: 3 }}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="name"
            label="Name"
            name="name"
            autoComplete="name"
            autoFocus
            {...register("name", { required: "Name is required" })}
            error={!!errors.name}
            helperText={errors.name ? errors.name.message : ""}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
                message: "Enter a valid email address",
              },
            })}
            error={!!errors.email}
            helperText={errors.email ? errors.email.message : ""}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            {...register("password", {
              required: "Password is required",
              minLength: {
                value: 6,
                message: "Password must be at least 6 characters",
              },
            })}
            error={!!errors.password}
            helperText={errors.password ? errors.password.message : ""}
          />
          <LoadingButton
            loading={buttonLoading}
            onClick={onSubmit}
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Register
          </LoadingButton>
        </Box>
      </Box>
    </Container>
  );
};

export default RegisterPage;
