import { Avatar, IconButton, Toolbar, Typography } from '@mui/material';
import MuiAppBar from '@mui/material/AppBar';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import { styled } from '@mui/material/styles';
import { Defaults } from '../constants/Defaults';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import tmsLogo from '../assets/images/tms-topbar-logo.png';
import { useState } from 'react';
import { auth } from '../firebase.js';

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  transition: theme.transitions.create(['margin', 'width'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    width: `calc(100% - ${Defaults.DRAWER_WIDTH}px)`,
    marginLeft: `${Defaults.DRAWER_WIDTH}px`,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));
function TopNav({ open, handleDrawerOpen }) {
  const [anchorEl, setAnchorEl] = useState(null);
  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  // Signout function
  const logout = () => {
    auth.signOut();
  };

  return (
    <AppBar color="secondary" position="fixed" open={open}>
      <Toolbar>
        <IconButton
          aria-label="open drawer"
          onClick={handleDrawerOpen}
          edge="start"
          sx={{ mr: 2, ...(open && { display: 'none' }) }}
        >
          <ChevronRightIcon />
        </IconButton>
        <img alt="tmsLogo" src={tmsLogo} />
        <span style={{ flex: 1 }}></span>
        <div>
          <IconButton
            size="large"
            aria-label="account of current user"
            aria-controls="menu-appbar"
            aria-haspopup="true"
            onClick={handleMenu}
            color="inherit"
          >
            <Avatar
              alt={auth.currentUser.displayName}
              src={auth.currentUser.photoURL}
            />
          </IconButton>
          <Typography variant="body2" component="span">
            {auth.currentUser.displayName}
          </Typography>
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
            <MenuItem onClick={logout}>Sign-Out</MenuItem>
          </Menu>
        </div>
      </Toolbar>
    </AppBar>
  );
}
export default TopNav;
