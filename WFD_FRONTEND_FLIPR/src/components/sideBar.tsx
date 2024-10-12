import React, { useEffect, useState } from 'react';
import {
  Drawer,
  AppBar,
  Box,
  Toolbar,
  Typography,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  IconButton,
  Tooltip,
  Menu,
  MenuItem,
  Avatar
} from '@mui/material';
import { NavLink, useNavigate } from 'react-router-dom';
import MenuIcon from '@mui/icons-material/Menu';
import DashboardIcon from '@mui/icons-material/Dashboard';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import ReportIcon from '@mui/icons-material/Assessment';
import LogoutIcon from '@mui/icons-material/Logout';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import { useTheme } from '../context/ThemeContext'; // Custom theme hook

const drawerWidth = 240;

const Sidebar: React.FC = () => {
  const [open, setOpen] = useState<boolean>(false);
  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);
  const [loggedIn, setLoggedIn] = useState<boolean>(false);
  const [username, setUsername] = useState<string | null>(null);

  const { toggleTheme, mode } = useTheme(); // Theme toggle
  const navigate = useNavigate(); // For navigation

  useEffect(() => {
    const user = localStorage.getItem('user');
    if (user) {
      setLoggedIn(true);
      const parsedUser = JSON.parse(user);
      setUsername(parsedUser.username || parsedUser.name || null);
    } else {
      setLoggedIn(false);
    }

    window.addEventListener('storage', handleStorageChange);
    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  const handleStorageChange = () => {
    const user = localStorage.getItem('user');
    if (user) {
      setLoggedIn(true);
      const parsedUser = JSON.parse(user);
      setUsername(parsedUser.username || parsedUser.name || null);
    } else {
      setLoggedIn(false);
      setUsername(null);
    }
  };

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleDrawerToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleLogout = () => {
    localStorage.removeItem('user');
    setLoggedIn(false);
    setUsername(null);
    navigate('/signin');
    window.dispatchEvent(new Event('storage'));
  };

  const drawer = (
    <Box
      sx={{
        height: '100%',
        position: 'relative',
        background: 'linear-gradient(135deg, #6b73ff 0%, #000dff 100%)',
        color: '#fff',
      }}
    >
      <Toolbar />
      <List>
        <ListItem button component={NavLink} to="/" onClick={handleDrawerToggle}>
          <ListItemIcon><DashboardIcon sx={{ color: '#fff' }} /></ListItemIcon>
          <ListItemText primary="Dashboard" sx={{ color: '#fff' }} />
        </ListItem>
        <ListItem button component={NavLink} to="/wallets" onClick={handleDrawerToggle}>
          <ListItemIcon><AccountBalanceWalletIcon sx={{ color: '#fff' }} /></ListItemIcon>
          <ListItemText primary="Wallets" sx={{ color: '#fff' }} />
        </ListItem>
        <ListItem button component={NavLink} to="/transactions" onClick={handleDrawerToggle}>
          <ListItemIcon><AccountBalanceIcon sx={{ color: '#fff' }} /></ListItemIcon>
          <ListItemText primary="Transactions" sx={{ color: '#fff' }} />
        </ListItem>
        <ListItem button component={NavLink} to="/reports" onClick={handleDrawerToggle}>
          <ListItemIcon><ReportIcon sx={{ color: '#fff' }} /></ListItemIcon>
          <ListItemText primary="Reports" sx={{ color: '#fff' }} />
        </ListItem>
        <ListItem button component={NavLink} to="/settings" onClick={handleDrawerToggle}>
          <ListItemIcon><AccountBalanceIcon sx={{ color: '#fff' }} /></ListItemIcon>
          <ListItemText primary="Settings" sx={{ color: '#fff' }} />
        </ListItem>
      </List>

      <Box
        sx={{
          position: 'absolute',
          bottom: 0,
          width: '100%',
          backgroundColor: 'rgba(255, 255, 255, 0.1)',
        }}
      >
        {loggedIn ? (
          <ListItem button onClick={handleLogout}>
            <ListItemIcon><LogoutIcon sx={{ color: '#fff' }} /></ListItemIcon>
            <ListItemText primary="Logout" sx={{ color: '#fff' }} />
          </ListItem>
        ) : (
          <Box>
            <ListItem button component={NavLink} to="/signin">
              <ListItemText primary="Signin" sx={{ color: '#fff' }} />
            </ListItem>
            <ListItem button component={NavLink} to="/signup">
              <ListItemText primary="Signup" sx={{ color: '#fff' }} />
            </ListItem>
          </Box>
        )}
      </Box>
    </Box>
  );

  return (
    <Box sx={{ display: 'flex' }}>
      <AppBar position="fixed">
        <Toolbar sx={{ justifyContent: 'space-between' }}>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <IconButton
              edge="start"
              color="inherit"
              aria-label="menu"
              onClick={handleDrawerToggle}
              sx={{ mr: 2 }}
            >
              <MenuIcon />
            </IconButton>

            <AccountBalanceWalletIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
            <Typography
              variant="h6"
              noWrap
              component="div"
              sx={{
                mr: 2,
                display: { xs: 'none', md: 'flex' },
                fontFamily: 'monospace',
                fontWeight: 700,
                letterSpacing: '.3rem',
                color: 'inherit',
                textDecoration: 'none',
              }}
            >
              <NavLink
                to="/"
                style={{
                  color: 'inherit',
                  textDecoration: 'none',
                }}
              >
                WMD
              </NavLink>
            </Typography>

            <IconButton sx={{ ml: 1 }} onClick={toggleTheme} color="inherit">
              {mode === 'dark' ? <Brightness7Icon /> : <Brightness4Icon />}
            </IconButton>
          </Box>

          <Box sx={{ flexGrow: 0, display: 'flex', alignItems: 'center' }}>
            {loggedIn ? (
              <Typography variant="subtitle1" sx={{ color: '#fff', marginRight: '20px' }}>
                {username ? `Hello, ${username}` : 'Hello, User'}
              </Typography>
            ) : (
              <Typography variant="subtitle1" sx={{ color: '#fff', marginRight: '20px' }}>
                Hello, Guest
              </Typography>
            )}
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                {username ? (
                  <Avatar alt={username} src="/static/images/avatar/v-logo.jpg" />
                ) : (
                  <Avatar alt="User Avatar" />
                )}
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: '45px' }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {loggedIn ? (
                <MenuItem onClick={handleLogout}>Logout</MenuItem>
              ) : (
                <>
                  <MenuItem onClick={handleCloseUserMenu}>
                    <NavLink
                      to="/signin"
                      style={{
                        textDecoration: 'none',
                        color: 'inherit',
                        display: 'block',
                      }}
                    >
                      Signin
                    </NavLink>
                  </MenuItem>
                  <MenuItem onClick={handleCloseUserMenu}>
                    <NavLink
                      to="/signup"
                      style={{
                        textDecoration: 'none',
                        color: 'inherit',
                        display: 'block',
                      }}
                    >
                      Signup
                    </NavLink>
                  </MenuItem>
                </>
              )}
            </Menu>
          </Box>
        </Toolbar>
      </AppBar>

      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
          },
        }}
        variant="temporary"
        anchor="left"
        open={open}
        onClose={handleDrawerToggle}
      >
        {drawer}
      </Drawer>

      <Box component="main" sx={{ flexGrow: 1, p: 3, marginLeft: `${open ? drawerWidth : 0}px`, transition: 'margin 0.3s' }}>
        {/* Main content goes here */}
        <Toolbar />
        {/* You can include your routes or main components here */}
      </Box>
    </Box>
  );
};

export default Sidebar;

