import React from 'react';
import { Drawer, List, ListItem, ListItemText, Divider } from '@mui/material';
import { Dashboard, Person, ShoppingCart, Settings } from '@mui/icons-material';

const Sidebar = ({ open, onClose }) => {
  return (
    <Drawer anchor="left" open={open} onClose={onClose}>
      <List>
        <ListItem button>
          <Dashboard />
          <ListItemText primary="Dashboard" />
        </ListItem>
        <ListItem button>
          <Person />
          <ListItemText primary="Users" />
        </ListItem>
        <ListItem button>
          <ShoppingCart />
          <ListItemText primary="Orders" />
        </ListItem>
        <ListItem button>
          <Settings />
          <ListItemText primary="Settings" />
        </ListItem>
        <Divider />
      </List>
    </Drawer>
  );
};

export default Sidebar;
