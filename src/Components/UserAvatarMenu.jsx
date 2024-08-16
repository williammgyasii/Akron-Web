import React, { useState } from 'react';
import { IconButton, Avatar, Popover, MenuItem } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const UserAvatarMenu = ({ imageUrl }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const navigate = useNavigate();

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
        <Avatar sx={{ width: 32, height: 32 }}>
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
        sx={{ mt: 1 }}
      >
        <MenuItem onClick={() => handleMenuItemClick('/profile')}>Profile</MenuItem>
        <MenuItem onClick={() => handleMenuItemClick('/account')}>My account</MenuItem>
        <MenuItem onClick={() => handleMenuItemClick('/logout')}>Logout</MenuItem>
      </Popover>
    </>
  );
};

export default UserAvatarMenu;
