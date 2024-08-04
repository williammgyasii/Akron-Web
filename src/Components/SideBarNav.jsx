import React, { useState } from 'react';
import { Drawer, List, ListItem, ListItemText, IconButton, Divider, Typography, Box } from '@mui/material';
import { Menu as MenuIcon, ChevronLeft as ChevronLeftIcon } from '@mui/icons-material';

const Sidebar = ({ sections }) => {
  const [open, setOpen] = useState(true);

  const toggleDrawer = () => {
    setOpen(!open);
  };

  return (
    <Drawer variant="persistent" anchor="left" open={open}>
      <Box display="flex" alignItems="center" justifyContent="space-between" p={2}>
        <Typography variant="h6">Sidebar</Typography>
        <IconButton onClick={toggleDrawer}>
          {open ? <ChevronLeftIcon /> : <MenuIcon />}
        </IconButton>
      </Box>
      <Divider />
      <List>
        {sections.map((section, index) => (
          <React.Fragment key={index}>
            <ListItem>
              <ListItemText primary={section.title} />
            </ListItem>
            <Divider />
          </React.Fragment>
        ))}
      </List>
    </Drawer>
  );
};

export default Sidebar;
