import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { IconButton, List, ListItem, ListItemIcon, ListItemText, Collapse } from '@mui/material';
import { Menu, Home, AccountCircle, Article, ExpandLess, ExpandMore, Logout } from '@mui/icons-material';
import 'bootstrap/dist/css/bootstrap.min.css';
import './sidebar.scss';

const Sidebar = () => {
  const [open, setOpen] = useState(false);
  const [submenuOpen, setSubmenuOpen] = useState(false);

  const handleToggle = () => {
    setOpen(!open);
  };

  const handleSubmenuToggle = () => {
    setSubmenuOpen(!submenuOpen);
  };

  return (
    <div className={`sidebar ${open ? 'open' : ''}`}>
      <IconButton onClick={handleToggle}>
        <Menu />
      </IconButton>
      <List>
        <ListItem button component={Link} to="/home">
          <ListItemIcon><Home /></ListItemIcon>
          <ListItemText primary="Accueil" />
        </ListItem>
        <ListItem button onClick={handleSubmenuToggle}>
          <ListItemIcon><AccountCircle /></ListItemIcon>
          <ListItemText primary="Client" />
          {submenuOpen ? <ExpandLess /> : <ExpandMore />}
        </ListItem>
        <Collapse in={submenuOpen} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            <ListItem button component={Link} to="/clientlist">
              <ListItemText inset primary="Client List" />
            </ListItem>
            <ListItem button component={Link} to="/client">
              <ListItemText inset primary="Ajouter un client" />
            </ListItem>
          </List>
        </Collapse>



        <ListItem button onClick={handleSubmenuToggle}>
          <ListItemIcon><Article />
          </ListItemIcon>
          <ListItemText primary="Articles" />
          {submenuOpen ? <ExpandLess /> : <ExpandMore />}
        </ListItem>
        <Collapse in={submenuOpen} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            <ListItem button component={Link} to="/articleList">
              <ListItemText inset primary="Collections" />
            </ListItem>
            <ListItem button component={Link} to="/article">
              <ListItemText inset primary="Ajouter un article" />
            </ListItem>
          </List>
        </Collapse>
        
        <ListItem button component={Link} to="/articleList">
          <ListItemIcon><Article /></ListItemIcon>
          <ListItemText primary="Articles" />
        </ListItem>
        <ListItem button component={Link} to="/logout">
          <ListItemIcon><Logout /></ListItemIcon>
          <ListItemText primary="Logout" />
        </ListItem>
      </List>
    </div>
  );
};

export default Sidebar;
