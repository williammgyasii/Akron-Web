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
    <Box
      component={Link}
      to={"profile"}
      sx={[
        {
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          py: 1,
          bgcolor: "#fff",
          border: "1px solid #E6E4F0",
          borderRadius: 2,
        },
        props.style,
      ]}
    >
      <Avatar
        alt={name}
        src={avatarUrl}
        sx={{ width: 30, height: 30, mr: 1.1 }}
      />
      <Box>
        <Typography sx={{fontSize:12}} variant="h6">
          {currentUser.firstName} {currentUser.lastName}
        </Typography>
        <Typography sx={{ fontSize: 10 }} variant="body2" color="#A0A0A3">
          {role}
        </Typography>
      </Box>
    </Box>
  );
};

export default ProfileComponent;
