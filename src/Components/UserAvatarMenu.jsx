import React, { useState } from 'react';
import { IconButton, Avatar, Popover, MenuItem, ListItemIcon, ListItemText } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { IoPersonOutline, IoSettingsOutline, IoLogOutOutline } from 'react-icons/io5'; // Ionicons
import MenuItemWithIcon from './MenuItemWithIcon';

const UserAvatarMenu = ({ imageUrl="https://i.pravatar.cc/150?img=3" }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const navigate = useNavigate();
  const AVATAR_SIZE = 30

  const handleAvatarClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleMenuItemClick = (path) => {
    handleClose();
    navigate(path);
  };

  return (
    <>
      <IconButton onClick={handleAvatarClick}>
        <Avatar sx={{ width: AVATAR_SIZE, height: AVATAR_SIZE }}>
          <img 
            src={imageUrl} 
            alt="User Avatar" 
            style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
          />
        </Avatar>
      </IconButton>

      <Popover
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
        
      >
        <MenuItemWithIcon
          icon={IoPersonOutline}
          text="Profile"
          path="profile"
          hoverColor="black"
          handleClick={()=>handleMenuItemClick("profile")}
        />
        <MenuItemWithIcon
          icon={IoSettingsOutline}
          text="Settings"
          path="settings"
          hoverColor="darkblue"
          handleClick={()=>handleMenuItemClick("settings")}
        />
        <MenuItemWithIcon
          icon={IoLogOutOutline}
          text="Logout"
          path="logout"
          hoverColor="darkred"
          handleClick={()=>console.log("i WILL LOGOUT")}
        />
      </Popover>
    </>
  );
};

export default UserAvatarMenu;
