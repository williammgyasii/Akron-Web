import React, { useState } from 'react';
import { IconButton, Badge, Popover, Typography, List, ListItem, ListItemText, Divider, Box } from '@mui/material';
import { NotificationsOutlined } from '@mui/icons-material';

const NotficationsManager = ({ notifications, onSeeAll }) => {
  const [anchorEl, setAnchorEl] = useState(null);

  const handleNotificationClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <IconButton onClick={handleNotificationClick} sx={{ position: 'relative', marginRight: '4px' }}>
        <Badge 
          badgeContent={notifications.length} 
          color="error" 
          sx={{
            '& .MuiBadge-badge': {
              top: '4px',
              right: '4px',
              height: '16px',
              minWidth: '16px',
              padding: '0 4px',
              fontSize: '0.75rem',
            },
          }}
        >
          <NotificationsOutlined/>
        </Badge>
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
        sx={{ mt: 1, width: '300px' }}
      >
        <Box sx={{ padding: '8px', maxWidth: '300px' }}>
          {notifications.length === 0 ? (
            <Typography variant="body2" sx={{ padding: '8px' }}>No new notifications</Typography>
          ) : (
            <List>
              {notifications.slice(0, 5).map((notification, index) => (
                <ListItem button key={index} onClick={handleClose}>
                  <ListItemText primary={notification} />
                </ListItem>
              ))}
              {notifications.length > 5 && (
                <>
                  <Divider />
                  <ListItem  onClick={onSeeAll} sx={{ justifyContent: 'center' }}>
                    <Typography variant="body2" color="primary">
                      See All
                    </Typography>
                  </ListItem>
                </>
              )}
            </List>
          )}
        </Box>
      </Popover>
    </>
  );
};

export default NotficationsManager;
