import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { IconButton, List, ListItem, ListItemIcon, ListItemText, Collapse } from '@mui/material';
import { Menu as MenuIcon, Home, AccountCircle, Article, ExpandLess, ExpandMore, Logout, Add, ListAlt, ShoppingCart, LocalShipping, Store, Inventory } from '@mui/icons-material';
import 'bootstrap/dist/css/bootstrap.min.css';
import './sidebar.scss';

const Sidebar = () => {
  const [open, setOpen] = useState(false);
  const [articleSubmenuOpen, setArticleSubmenuOpen] = useState(false);
  const [venteSubmenuOpen, setVenteSubmenuOpen] = useState(false);
  const [achatSubmenuOpen, setAchatSubmenuOpen] = useState(false);
  const [stockSubmenuOpen, setStockSubmenuOpen] = useState(false);
  const userName = localStorage.getItem('email');

  const handleToggle = () => {
    setOpen(!open);
  };

  const handleArticleSubmenuToggle = () => {
    setArticleSubmenuOpen(!articleSubmenuOpen);
  };

  const handleVenteSubmenuToggle = () => {
    setVenteSubmenuOpen(!venteSubmenuOpen);
  };

  const handleAchatSubmenuToggle = () => {
    setAchatSubmenuOpen(!achatSubmenuOpen);
  };

  const handleStockSubmenuToggle = () => {
    setStockSubmenuOpen(!stockSubmenuOpen);
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

        {/* Profile Section */}
        <ListItem button>
          <ListItemIcon><AccountCircle /></ListItemIcon>
          <ListItemText primary={userName ? userName : 'Hello, Guest'} />
        </ListItem>

        {/* Articles Submenu */}
        <ListItem button onClick={handleArticleSubmenuToggle}>
          <ListItemIcon><Article /></ListItemIcon>
          <ListItemText primary="Articles" />
          {articleSubmenuOpen ? <ExpandLess /> : <ExpandMore />}
        </ListItem>
        <Collapse in={articleSubmenuOpen} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            <ListItem button component={Link} to="/article">
              <ListItemIcon><Add /></ListItemIcon>
              <ListItemText inset primary="Ajouter un article" />
            </ListItem>
            <ListItem button component={Link} to="/articleList">
              <ListItemIcon><ListAlt /></ListItemIcon>
              <ListItemText inset primary="Collections" />
            </ListItem>
          </List>
        </Collapse>

        {/* Vente Submenu */}
        <ListItem button onClick={handleVenteSubmenuToggle}>
          <ListItemIcon><ShoppingCart /></ListItemIcon>
          <ListItemText primary="Vente" />
          {venteSubmenuOpen ? <ExpandLess /> : <ExpandMore />}
        </ListItem>
        <Collapse in={venteSubmenuOpen} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            <ListItem button component={Link} to="/client">
              <ListItemIcon><Add /></ListItemIcon>
              <ListItemText inset primary="Ajouter un client" />
            </ListItem>
            <ListItem button component={Link} to="/clientlist">
              <ListItemIcon><ListAlt /></ListItemIcon>
              <ListItemText inset primary="Liste des clients" />
            </ListItem>
            <ListItem button component={Link} to="/document">
              <ListItemIcon><Store /></ListItemIcon>
              <ListItemText inset primary="Bon de commande" />
            </ListItem>
            <ListItem button component={Link} to="/order">
              <ListItemIcon><ListAlt /></ListItemIcon>
              <ListItemText inset primary="Liste Bon de Commande" />
            </ListItem>
          </List>
        </Collapse>

        {/* Achat Submenu */}
        <ListItem button onClick={handleAchatSubmenuToggle}>
          <ListItemIcon><LocalShipping /></ListItemIcon>
          <ListItemText primary="Achat" />
          {achatSubmenuOpen ? <ExpandLess /> : <ExpandMore />}
        </ListItem>
        <Collapse in={achatSubmenuOpen} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            <ListItem button component={Link} to="/fournisseur">
              <ListItemIcon><Add /></ListItemIcon>
              <ListItemText inset primary="Ajouter un fournisseur" />
            </ListItem>
            <ListItem button component={Link} to="/fournisseurlist">
              <ListItemIcon><ListAlt /></ListItemIcon>
              <ListItemText inset primary="Liste des fournisseurs" />
            </ListItem>
            <ListItem button component={Link} to="/bonEntree">
              <ListItemIcon><Store /></ListItemIcon>
              <ListItemText inset primary="Bon d'entrée" />
            </ListItem>
          </List>
        </Collapse>

        {/* New Stock Submenu */}
        <ListItem button onClick={handleStockSubmenuToggle}>
          <ListItemIcon><Inventory /></ListItemIcon>
          <ListItemText primary="Stock" />
          {stockSubmenuOpen ? <ExpandLess /> : <ExpandMore />}
        </ListItem>
        <Collapse in={stockSubmenuOpen} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            <ListItem button component={Link} to="/stock">
              <ListItemIcon><ListAlt /></ListItemIcon>
              <ListItemText inset primary="Vue du Stock" />
            </ListItem>
          </List>
        </Collapse>

        <ListItem button component={Link} to="/logout">
          <ListItemIcon><Logout /></ListItemIcon>
          <ListItemText primary="Déconnexion" />
        </ListItem>
      </List>
    </div>
  );
};

export default Sidebar;
