import React, { useEffect, useState } from "react";
import {
  AppBar,
  Toolbar,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemText,
  Button,
  Box,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { Menu as MenuIcon } from "@mui/icons-material";
import { styled } from "@mui/system";

const StyledAppBar = styled(AppBar)(({ theme, scrolled }) => ({
  backgroundColor: scrolled ? theme.palette.secondary.main : "transparent",
  transition: "background-color 0.3s ease",
  boxShadow: scrolled ? "0px 2px 4px rgba(0, 0, 0, 0.1)" : "none",
  [theme.breakpoints.down("tablets_port")]: {
    justifyContent: "space-between",
    display: "flex",
    flexDirection: "row",
  },
}));

const DrawerPaper = styled(Box)(({ theme, scrolled }) => ({
  width: "100%",
  display: "flex",
  flexDirection: "column",
  height: "100%",
}));

const LogoBox = styled(Box)(({ theme }) => ({
  padding: theme.spacing(2),
  textAlign: "center",
  backgroundColor: theme.palette.background.paper,
  borderBottom: `1px solid ${theme.palette.divider}`,
}));

const ListBox = styled(Box)(({ theme }) => ({
  flexGrow: 1,
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  flexDirection: "column",
}));

const BottomBox = styled(Box)(({ theme }) => ({
  padding: theme.spacing(2),
  borderTop: `1px solid ${theme.palette.divider}`,
}));

const LandingPageAppbar = ({}) => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("tablets_port"));

  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        // Adjust scroll threshold as needed
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const toggleDrawer = () => {
    setDrawerOpen(!drawerOpen);
  };

  const drawer = (
    <DrawerPaper>
      <LogoBox>
        <img src="logo.png" alt="Logo" width="100" />{" "}
        {/* Replace with your logo */}
      </LogoBox>
      <ListBox>
        <List>
          <ListItem button component="a" href="#home" onClick={toggleDrawer}>
            <ListItemText primary="Home" />
          </ListItem>
          <ListItem button component="a" href="#support" onClick={toggleDrawer}>
            <ListItemText primary="Support" />
          </ListItem>
          <ListItem
            button
            component="a"
            href="#features"
            onClick={toggleDrawer}
          >
            <ListItemText primary="Features" />
          </ListItem>
          <ListItem
            button
            component="a"
            href="#testimonials"
            onClick={toggleDrawer}
          >
            <ListItemText primary="Testimonials" />
          </ListItem>
        </List>
      </ListBox>
      <BottomBox>
        <Button
          fullWidth
          variant="contained"
          color="primary"
          onClick={toggleDrawer}
        >
          Login
        </Button>
      </BottomBox>
    </DrawerPaper>
  );

  return (
    <>
      <StyledAppBar scrolled={scrolled} position="fixed">
        <Toolbar
          sx={{
            display: "flex",
            width: "100%",
            justifyContent: "space-between",
          }}
        >
          {isMobile ? (
            <>
              <IconButton
                edge="start"
                color="inherit"
                aria-label="menu"
                onClick={toggleDrawer}
                sx={{ display: { phone: "block", sm: "none" } }}
              >
                <MenuIcon />
              </IconButton>
              <Drawer
                anchor="left"
                open={drawerOpen}
                onClose={toggleDrawer}
                sx={{
                  "& .MuiDrawer-paper": {
                    width: "100%",
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                  },
                }}
              >
                {drawer}
              </Drawer>
            </>
          ) : (
            <>
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <img src="logo.png" alt="Logo" width="100" />{" "}
                {/* Replace with your logo */}
              </Box>
              <Box
                sx={{ flexGrow: 1, display: "flex", justifyContent: "center" }}
              >
                <List sx={{ display: "flex", alignItems: "center" }}>
                  <ListItem button component="a" href="#home">
                    <ListItemText primary="Home" />
                  </ListItem>
                  <ListItem button component="a" href="#support">
                    <ListItemText primary="Support" />
                  </ListItem>
                  <ListItem button component="a" href="#features">
                    <ListItemText primary="Features" />
                  </ListItem>
                  <ListItem button component="a" href="#testimonials">
                    <ListItemText primary="Testimonials" />
                  </ListItem>
                </List>
              </Box>
              <Button variant="contained" color="primary">
                Login
              </Button>
            </>
          )}
        </Toolbar>
      </StyledAppBar>
    </>
  );
};

export default LandingPageAppbar;
