import React from 'react';
import { AppBar, Toolbar, IconButton, Menu, MenuItem, Divider, Typography } from '@mui/material';
import { AccountCircle, Settings, Notifications } from '@mui/icons-material';
import { Link } from 'react-router-dom';
import './Navbar.scss';

const Navbar = () => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [anchorElNotify, setAnchorElNotify] = React.useState(null);

  // Retrieve the username from local storage
  const userName = localStorage.getItem('userName');

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleNotifyMenu = (event) => {
    setAnchorElNotify(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
    setAnchorElNotify(null);
  };

  return (
    <AppBar position="static" className="navbar">
      <Toolbar>
        <div className="spacer" />
        <div className="profile-menu">
          <IconButton
            edge="end"
            color="inherit"
            onClick={handleNotifyMenu}
          >
            <Notifications />
          </IconButton>
          <Menu
            anchorEl={anchorElNotify}
            open={Boolean(anchorElNotify)}
            onClose={handleClose}
            PaperProps={{
              style: {
                borderRadius: '8px',
                minWidth: '200px',
                backgroundColor: '#f5f5f5', // Light gray background for dropdown
              },
            }}
          >
            <MenuItem onClick={handleClose}>Notification 1</MenuItem>
            <MenuItem onClick={handleClose}>Notification 2</MenuItem>
          </Menu>
          <IconButton
            edge="end"
            color="inherit"
            onClick={handleMenu}
          >
             {userName ? ` ${userName}` : 'Hello, Guest'}
            <AccountCircle />
          </IconButton>
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleClose}
            PaperProps={{
              style: {
                borderRadius: '8px',
                minWidth: '200px',
                backgroundColor: '#f5f5f5', // Light gray background for dropdown
              },
            }}
          >
            <MenuItem component={Link} to="/profile" onClick={handleClose}>
              <AccountCircle className="menu-icon" />
              <span className="menu-item-text">Profile</span>
            </MenuItem>
            <Divider />
            <MenuItem component={Link} to="/settings" onClick={handleClose}>
              <Settings className="menu-icon" />
              <span className="menu-item-text">Settings</span>
            </MenuItem>
            <Divider />
            <MenuItem>
              <Typography variant="body2" color="textSecondary">
                {userName ? `Hello, ${userName}` : 'Hello, Guest'}
              </Typography>
            </MenuItem>
          </Menu>
        </div>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
