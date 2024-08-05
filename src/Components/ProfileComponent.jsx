import React from 'react';
import { Avatar, Box, Typography } from '@mui/material';

// Profile component
const ProfileComponent = ({ name, role, avatarUrl }) => {
  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        p: 2,
        bgcolor: 'background.paper',
        borderRadius: 1,
        boxShadow: 1,
      }}
    >
      <Avatar
        alt={name}
        src={avatarUrl}
        sx={{ width: 56, height: 56, mr: 2 }}
      />
      <Box>
        <Typography variant="h6">{name}</Typography>
        <Typography variant="body2" color="text.secondary">
          {role}
        </Typography>
      </Box>
    </Box>
  );
};

export default ProfileComponent
