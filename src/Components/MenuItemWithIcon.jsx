import React from "react";
import { MenuItem, ListItemIcon, ListItemText, styled } from "@mui/material";
import { useNavigate } from "react-router-dom";

const StyledListItemText = styled(ListItemText)({
  "& .MuiTypography-root": {
    fontSize: "0.855rem", // Adjust font size here
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
        "&:hover": {
          backgroundColor: hoverColor,
          color: "white",
        },
      }}
    >
      <ListItemIcon
        sx={{
          color: "inherit",
          width: 20,
          minWidth: "30px!important",
        }}
      >
        <Icon size={17} />
      </ListItemIcon>
      <StyledListItemText primary={text} />
    </MenuItem>
  );
};

export default MenuItemWithIcon;
