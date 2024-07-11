import React from "react";
// import Link from "next/link";
import AppBar from '@mui/material/AppBar';
import { Button, Divider, Drawer, Grid, IconButton, InputBase, Link, List, ListItem, ListItemButton, ListItemIcon, ListItemText, MenuList, Toolbar, Typography, alpha } from "@mui/material";
import MenuIcon from '@mui/icons-material/Menu';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import SportsEsportsIcon from '@mui/icons-material/SportsEsports';
import GroupIcon from '@mui/icons-material/Group';
import ChatIcon from '@mui/icons-material/Chat';
import ScoreboardIcon from '@mui/icons-material/Scoreboard';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import HistoryIcon from '@mui/icons-material/History';
import { styled, useTheme } from "@mui/material/styles";
import { useAuth } from "../AuthContext";

import { useNavigate } from "react-router-dom";
import AccountCircle from '@mui/icons-material/AccountCircle';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';



export function Navbar (){
    const [open, setOpen] = React.useState(false);
    const [auth, setAuth] = React.useState(true);
    
    const [anchorEl, setAnchorEl] = React.useState(null);
    const { logout } = useAuth();

    let navigate = useNavigate(); 
    const routeChange = () =>{ 
    let path = `/profil`; 
    navigate(path);
  }

    const handleMenu = (event) => {
      setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
      setAnchorEl(null);
    };

    const theme = useTheme();

    const toggleDrawer = (newOpen => () => {
        setOpen(newOpen);
    });

    const menuItems1 = [
        { text: 'Play', icon: <PlayArrowIcon/>, path: '/home'},
        { text: 'Games', icon: <SportsEsportsIcon/>, path: '/games'},
        { text: 'Score', icon: <ScoreboardIcon/>, path: '/score'},
        { text: 'History', icon: <HistoryIcon/>, path: '/history'}
    ];

    const menuItems2 = [
        { text: 'Friends', icon: <GroupIcon/>, path: '/friends'},
        { text: 'Chat', icon: <ChatIcon/>, path: '/chat'},
        { text: 'Profil', icon: <AccountCircleIcon/>, path: '/profil'}
    ];

    const DrawerList = (
        <Grid sx={{ width: 250 }} role="presentation" onClick={toggleDrawer(false)}>
          <List>
            {menuItems1.map((item) => (
              <ListItem key={item.text} disablePadding>
                <ListItemButton component={Link} to={item.path}>
                  <ListItemIcon>
                    {item.icon}
                  </ListItemIcon>
                  <ListItemText primary={item.text} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
          <Divider />
          <List>
            {menuItems2.map((item) => (
              <ListItem key={item.text} disablePadding>
                <ListItemButton component={Link} to={item.path}>
                  <ListItemIcon>
                    {item.icon}
                  </ListItemIcon>
                  <ListItemText primary={item.text} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </Grid>
      );

  return (
    <Grid sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
            onClick={toggleDrawer(true)}
          >
            <MenuIcon />
          </IconButton>
          <Drawer open={open} onClose={toggleDrawer(false)}>{DrawerList}</Drawer>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Projet Fil Rouge
          </Typography>
          {auth && (
            <div>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
                color="inherit"
              >
                <AccountCircle />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={Boolean(anchorEl)}
                onClose={handleClose}
              >
                <MenuItem onClick={routeChange}>Profil</MenuItem>
                <MenuItem onClick={logout}>Log Out</MenuItem>
              </Menu>
            </div>
          )}
        </Toolbar>
      </AppBar>
    </Grid>
  );
};
export default Navbar;