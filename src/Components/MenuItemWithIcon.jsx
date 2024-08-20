import React from "react";
import { MenuItem, ListItemIcon, ListItemText, styled } from "@mui/material";
import { useNavigate } from "react-router-dom";

const StyledListItemText = styled(ListItemText)({
  "& .MuiTypography-root": {
    fontSize: "0.900rem", // Adjust font size here
  },
});

const MenuItemWithIcon = ({
  icon: Icon,
  text,
  path,
  hoverColor,
  handleClick,
}) => {
  const navigate = useNavigate();

  const handleMenuItemClick = () => {
    navigate(path);
  };

  return (
    <MenuItem
      onClick={handleClick}
      sx={{
        padding: "5px 15px",
        minHeight:"30px",
        borderRadius:2,
        "&:hover": {
          backgroundColor: hoverColor,
          color: "white",
        },
      }}
    >
      <ListItemIcon
        sx={{
          color: "inherit",
          minWidth: "25px!important",
          
        }}
      >
        <Icon size={17} />
      </ListItemIcon>
      <StyledListItemText primary={text} />
    </MenuItem>
  );
};

export default MenuItemWithIcon;
