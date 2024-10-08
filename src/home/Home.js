import React from 'react';
import { Grid, Card, CardContent, Typography, IconButton } from '@mui/material';
import { Article, ShoppingCart, LocalShipping, Store, Person, Receipt } from '@mui/icons-material';
import { Link } from 'react-router-dom';
import './home.scss'; // Assurez-vous de mettre à jour ce fichier pour les nouveaux styles

const Home = () => {
  return (
    <div className="home">
      {/* Titre principal */}
      <Typography variant="h2" className="welcome-title">
        Tableau de Bord
      </Typography>
      <Typography variant="h6" className="welcome-subtitle">
        Gérez vos articles, commandes et fournisseurs 
      </Typography>

      {/* Grille de menu */}
      <Grid container spacing={4} className="menu-grid">
        {/* Carte pour Articles */}
        <Grid item xs={12} sm={6} md={4}>
          <Card className="menu-card articles-card">
            <CardContent>
              <IconButton component={Link} to="/article" className="menu-icon">
                <Article />
              </IconButton>
              <Typography variant="h6" className="card-title">Gérer les articles</Typography>
            </CardContent>
          </Card>
        </Grid>

        {/* Carte pour Clients */}
        <Grid item xs={12} sm={6} md={4}>
          <Card className="menu-card clients-card">
            <CardContent>
              <IconButton component={Link} to="/clientlist" className="menu-icon">
                <Receipt />
              </IconButton>
              <Typography variant="h6" className="card-title">Clients</Typography>
            </CardContent>
          </Card>
        </Grid>

        {/* Carte pour Fournisseurs */}
        <Grid item xs={12} sm={6} md={4}>
          <Card className="menu-card fournisseurs-card">
            <CardContent>
              <IconButton component={Link} to="/fournisseurlist" className="menu-icon">
                <Person />
              </IconButton>
              <Typography variant="h6" className="card-title">Fournisseurs</Typography>
            </CardContent>
          </Card>
        </Grid>

        {/* Carte pour Vente */}
        <Grid item xs={12} sm={6} md={4}>
          <Card className="menu-card vente-card">
            <CardContent>
              <IconButton component={Link} to="/document" className="menu-icon">
                <ShoppingCart />
              </IconButton>
              <Typography variant="h6" className="card-title">Vente</Typography>
            </CardContent>
          </Card>
        </Grid>

        {/* Carte pour Bon d'Entrée */}
        <Grid item xs={12} sm={6} md={4}>
          <Card className="menu-card entree-card">
            <CardContent>
              <IconButton component={Link} to="/bonEntree" className="menu-icon">
                <LocalShipping />
              </IconButton>
              <Typography variant="h6" className="card-title">Bon d'entrée</Typography>
            </CardContent>
          </Card>
        </Grid>

        {/* Carte pour Stock */}
        <Grid item xs={12} sm={6} md={4}>
          <Card className="menu-card stock-card">
            <CardContent>
              <IconButton component={Link} to="/stock" className="menu-icon">
                <Store />
              </IconButton>
              <Typography variant="h6" className="card-title">Stock</Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </div>
  );
};

export default Home;
