import React, { useState } from "react";
import {
  IconButton,
  Badge,
  Popover,
  Typography,
  List,
  ListItem,
  ListItemText,
  Divider,
  Box,
  Button,
  useTheme
} from "@mui/material";
import { IoNotificationsOutline } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const NotificationsMenu = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const open =Boolean(anchorEl)
  const notifications = useSelector(
    (state) => state.notifications.notifications
  );

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleNotificationClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleSeeAll = () => {
    navigate("notifications");
    handleClose();
  };

  const theme = useTheme()

  return (
    <>
      <IconButton
        onClick={handleNotificationClick}
        sx={{ position: "relative", marginRight: "4px" }}
      >
        <Badge
          badgeContent={notifications.length}
          color="error"
          sx={{
            "& .MuiBadge-badge": {
              top: "4px",
              right: "4px",
              height: "14px",
              minWidth: "14px",
              padding: "0 4px",
              fontSize: "0.75rem",
            },
          }}
        >
          <IoNotificationsOutline size={20} color={"#fff"} />
        </Badge>
      </IconButton>

      <Popover
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
      >
        <Box
          sx={{
            minWidth: 300,
            maxHeight: "400px",
            overflowY: "auto",
            p: 1,
          }}
        >
          <List>
            {notifications.slice(0, 5).map((notification, index) => (
              <ListItem key={index}>
                <ListItemText primary={notification.text} />
              </ListItem>
            ))}
            {notifications.length === 0 && (
              <Typography
                variant="body2"
                sx={{ textAlign: "center", color: "gray" }}
              >
                No notifications
              </Typography>
            )}
          </List>
          <Divider />
          <Box sx={{ textAlign: "center", mt: 1 }}>
            <Button fullWidth onClick={handleSeeAll} color="primary">
              SEE ALL
            </Button>
          </Box>
        </Box>
      </Popover>
    </>
  );
};

export default NotificationsMenu;
