import React from 'react';
import { MenuItem, ListItemIcon, ListItemText } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const MenuItemWithIcon = ({ icon: Icon, text, path, hoverColor,handleClick }) => {
  const navigate = useNavigate();

  const handleMenuItemClick = () => {
    navigate(path);
  };

  return (
    <MenuItem
      onClick={handleClick}
      sx={{
        
        '&:hover': {
          backgroundColor: hoverColor,
          color: 'white',
        },
      }}
    >
      <ListItemIcon sx={{ color: 'inherit' }}>
        <Icon size={20} />
      </ListItemIcon>
      <ListItemText primary={text} />
    </MenuItem>
  );
};

export default MenuItemWithIcon;
