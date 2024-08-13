import React from "react";
import { Avatar, Box, ButtonBase, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser, selectCurrentUser } from "../Redux/Slices/Users/UsersSlice";
import { Link, useNavigate } from "react-router-dom";
import { persistor, resetState } from "../Redux/store";

// Profile component
const ProfileComponent = ({ name, role, avatarUrl, onClick, ...props }) => {
  const currentUser = useSelector(selectCurrentUser);
  const dispatch = useDispatch()
  const navigate = useNavigate();

  
  return (
    <ButtonBase
      component={Link}
      to={"profile"}
      sx={[
        {
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          p: 1,
          bgcolor: "transparent",
          border: "2px solid #000",
          borderRadius: 4,
        },
        props.style,
      ]}
    >
      <Avatar
        alt={name}
        src={avatarUrl}
        sx={{ width: 40, height: 40, mr: 1.1 }}
      />
      <Box>
        <Typography variant="h6">
          {currentUser.firstName} {currentUser.lastName}
        </Typography>
        <Typography sx={{ fontSize: 10 }} variant="body2" color="#A0A0A3">
          {role}
        </Typography>
      </Box>
    </ButtonBase>
  );
};

export default ProfileComponent;
