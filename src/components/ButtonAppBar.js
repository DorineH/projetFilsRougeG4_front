import React from "react";
// import Link from "next/link";
import AppBar from '@mui/material/AppBar';
import { Button, Divider, Drawer, Grid, IconButton, InputBase, Link, List, ListItem, ListItemButton, ListItemIcon, ListItemText, MenuList, Toolbar, Typography, alpha } from "@mui/material";
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import SportsEsportsIcon from '@mui/icons-material/SportsEsports';
import GroupIcon from '@mui/icons-material/Group';
import ChatIcon from '@mui/icons-material/Chat';
import ScoreboardIcon from '@mui/icons-material/Scoreboard';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import HistoryIcon from '@mui/icons-material/History';
import { styled, useTheme } from "@mui/material/styles";
import { useAuth } from "../AuthContext";


const Search = styled(Grid)(({ theme }) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: theme.palette.common.black,
    '&:hover': {
      backgroundColor: theme.palette.common.black,
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(3),
      width: 'auto',
    },
  }));

  const SearchIconWrapper = styled(Grid)(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  }));

    const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: 'inherit',
    '& .MuiInputBase-input': {
      padding: theme.spacing(1, 1, 1, 0),
      // vertical padding + font size from searchIcon
      paddingLeft: `calc(1em + ${theme.spacing(4)})`,
      transition: theme.transitions.create('width'),
      width: '100%',
      [theme.breakpoints.up('md')]: {
        width: '20ch',
      },
    },
  }));

export function Navbar (){
    const [open, setOpen] = React.useState(false);
    const { logout } = useAuth();

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
      {/* <div className={styles.logo}>
        <a className={styles.brand}>Projet Fils Rouge</a>
      </div> */} 
        <AppBar position="static" sx={{ bgcolor: theme.palette.navbar.main }}>
            <Toolbar>
                <IconButton
                    size="large"
                    edge="start"
                    color="inherit"
                    aria-label="menu"
                    sx={{ mr: 2 }} 
                    onClick={toggleDrawer(true)}
                >
                    <MenuIcon/>
                </IconButton>
                <Drawer open={open} onClose={toggleDrawer(false)}>{DrawerList}</Drawer>
                <Typography variant="h6" noWrap component="div" sx={{ display: { xs: 'none', sm: 'block' } }}>Projet Fils Rouge</Typography>
                <Search sx={{ flexGrow: 1 }}>
                    <SearchIconWrapper>
                        <SearchIcon />
                        <StyledInputBase
                            placeholder="Search…"
                            inputProps={{ 'aria-label': 'search' }}
                        />
                    </SearchIconWrapper>
                </Search>
                <Grid sx={{ flexGrow: 1 }}>
                    <Button color="inherit" onClick={logout}>Logout</Button>
                </Grid>
            </Toolbar>
        </AppBar>
    </Grid>
  );
};
export default Navbar;