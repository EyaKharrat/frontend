import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { IconButton, List, ListItem, ListItemIcon, ListItemText, Collapse} from '@mui/material';
import { Menu as MenuIcon, Home, AccountCircle, Article, ExpandLess, ExpandMore, Logout } from '@mui/icons-material';
import 'bootstrap/dist/css/bootstrap.min.css';
import './sidebar.scss';

const Sidebar = () => {
  const [open, setOpen] = useState(false);
  const [clientSubmenuOpen, setClientSubmenuOpen] = useState(false);
  const [fournisseurSubmenuOpen, setFournisseurSubmenuOpen] = useState(false);
  const [articleSubmenuOpen, setArticleSubmenuOpen] = useState(false);
  const [ setProfileMenuAnchor] = useState(null);
  const userName = localStorage.getItem('email');

  const handleToggle = () => {
    setOpen(!open);
  };

  const handleClientSubmenuToggle = () => {
    setClientSubmenuOpen(!clientSubmenuOpen);
  };

  const handleFournisseurSubmenuToggle = () => {
    setFournisseurSubmenuOpen(!fournisseurSubmenuOpen);
  };

  const handleArticleSubmenuToggle = () => {
    setArticleSubmenuOpen(!articleSubmenuOpen);
  };

  const handleProfileMenuOpen = (event) => {
    setProfileMenuAnchor(event.currentTarget);
  };

  return (
    <div className={`sidebar ${open ? 'open' : ''}`}>
      <IconButton onClick={handleToggle}>
        <MenuIcon />
      </IconButton>
      <List>
        <ListItem button component={Link} to="/home">
          <ListItemIcon><Home /></ListItemIcon>
          <ListItemText primary="Accueil" />
        </ListItem>

        {/* Profile Section with Settings Option */}
        <ListItem button onClick={handleProfileMenuOpen}>
          <ListItemIcon><AccountCircle /></ListItemIcon>
          <ListItemText primary={userName ? userName : 'Hello, Guest'} />
        </ListItem>

        {/* Client Submenu */}
        <ListItem button onClick={handleClientSubmenuToggle}>
          <ListItemIcon><AccountCircle /></ListItemIcon>
          <ListItemText primary="Client" />
          {clientSubmenuOpen ? <ExpandLess /> : <ExpandMore />}
        </ListItem>
        <Collapse in={clientSubmenuOpen} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            <ListItem button component={Link} to="/clientlist">
              <ListItemText inset primary="Client List" />
            </ListItem>
            <ListItem button component={Link} to="/client">
              <ListItemText inset primary="Ajouter un client" />
            </ListItem>
          </List>
        </Collapse>

        {/* Fournisseur Submenu */}
        <ListItem button onClick={handleFournisseurSubmenuToggle}>
          <ListItemIcon><AccountCircle /></ListItemIcon>
          <ListItemText primary="Fournisseur" />
          {fournisseurSubmenuOpen ? <ExpandLess /> : <ExpandMore />}
        </ListItem>
        <Collapse in={fournisseurSubmenuOpen} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            <ListItem button component={Link} to="/fournisseurlist">
              <ListItemText inset primary="Fournisseur List" />
            </ListItem>
            <ListItem button component={Link} to="/fournisseur">
              <ListItemText inset primary="Ajouter un fournisseur" />
            </ListItem>
          </List>
        </Collapse>

        {/* Articles Submenu */}
        <ListItem button onClick={handleArticleSubmenuToggle}>
          <ListItemIcon><Article /></ListItemIcon>
          <ListItemText primary="Articles" />
          {articleSubmenuOpen ? <ExpandLess /> : <ExpandMore />}
        </ListItem>
        <Collapse in={articleSubmenuOpen} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            <ListItem button component={Link} to="/articleList">
              <ListItemText inset primary="Collections" />
            </ListItem>
            <ListItem button component={Link} to="/article">
              <ListItemText inset primary="Ajouter un article" />
            </ListItem>
          </List>
        </Collapse>

        <ListItem button component={Link} to="/logout">
          <ListItemIcon><Logout /></ListItemIcon>
          <ListItemText primary="Logout" />
        </ListItem>
      </List>
    </div>
  );
};

export default Sidebar;
