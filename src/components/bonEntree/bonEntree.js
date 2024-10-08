import React, { useState, useEffect } from 'react';
import {
  Avatar,
  TextField,
  Grid,
  Box,
  Typography,
  Container,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
  Card,
  CardContent,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Button,
  Snackbar,
  Alert
} from '@mui/material';
import { AddBox as AddBoxIcon } from '@mui/icons-material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import axiosInstance from '../../axiosInstance';
import { useNavigate } from 'react-router-dom';
const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#ff4081',
    },
  },
  typography: {
    h5: {
      fontWeight: 'bold',
      color: '#333',
    },
  },
  components: {
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 15,
          boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.1)',
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 20,
        },
      },
    },
  },
});

const BonEntree = () => {
  const initialFormData = {
    articleRef: '',
    articleName: '',
    quantity: '',
    supplier: '',
    entryDate: new Date().toISOString().split('T')[0], // Date du jour par défaut
  };

  const [formData, setFormData] = useState(initialFormData);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [fournisseurs, setFournisseurs] = useState([]);
  const [articles, setArticles] = useState([]);
  const [fournisseurCode, setFournisseurCode] = useState('');
  const [selectedFournisseur, setSelectedFournisseur] = useState(null);
  const [selectedArticle, setSelectedArticle] = useState(null);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    const fetchFournisseurs = async () => {
      try {
        const response = await axiosInstance.get('https://localhost:7029/api/Tiers/GetTier');
        setFournisseurs(response.data);
      } catch (error) {
        console.error('Erreur lors de la récupération des fournisseurs:', error);
        setFournisseurs([]);
      }
    };

    const fetchArticles = async () => {
      try {
        const response = await axiosInstance.get('https://localhost:7029/api/Articles');
        setArticles(response.data);
      } catch (error) {
        console.error('Erreur lors de la récupération des articles:', error);
        setArticles([]);
      }
    };

    fetchFournisseurs();
    fetchArticles();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFournisseurChange = (e) => {
    const code = e.target.value;
    setFournisseurCode(code);
    const fournisseur = fournisseurs.find((f) => f.cref === code);
    setSelectedFournisseur(fournisseur || null);
  };

  const handleArticleChange = (event) => {
    const articleRef = event.target.value;
    setSelectedArticle(articles.find((article) => article.aref === articleRef));
    setFormData({ ...formData, articleRef });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setError(null);
  
    const bonDeCommandeData = {
      docRef: String(fournisseurCode),
      docArt: formData.articleRef,
      docQte: formData.quantity,
      date: formData.entryDate
    };
  
    try {
      await axiosInstance.post('https://localhost:7029/api/DocumentDetailCommandes', bonDeCommandeData);
      await updateStock();
      setSuccess(true);
      setOpenSnackbar(true);
      navigate('/bonentreelist'); 
    } catch (err) {
      setError('Une erreur est survenue lors de l\'enregistrement.');
      setOpenSnackbar(true);
    } finally {
      setLoading(false);
    }
  };

  const updateStock = async () => {
    try {
      if (selectedArticle) {
        const updatedQuantity = selectedArticle.aqteStock + parseInt(formData.quantity, 10);
        await axiosInstance.put(`https://localhost:7029/api/Articles/${formData.articleRef}`, {
          ...selectedArticle,
          aqteStock: updatedQuantity,
        });
      }
    } catch (error) {
      console.error('Erreur lors de la mise à jour du stock:', error);
    }
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="md" sx={{ py: 4 }}>
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
          <Avatar sx={{ m: '0 auto', bgcolor: 'primary.main' }}>
            <AddBoxIcon />
          </Avatar>
          <Typography component="h1" variant="h5" align="center" gutterBottom>
            Bon d'Entrée pour les Articles
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth required>
                <InputLabel id="article-label">Article</InputLabel>
                <Select
                  labelId="article-label"
                  id="articleRef"
                  value={formData.articleRef}
                  label="Article"
                  onChange={handleArticleChange}
                >
                  {articles.map((article) => (
                    <MenuItem key={article.aref} value={article.aref}>
                      {article.aref} - {article.afamille}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                id="quantity"
                label="Quantité"
                name="quantity"
                type="number"
                value={formData.quantity}
                onChange={handleChange}
                inputProps={{ min: 0 }}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <FormControl fullWidth required>
                <InputLabel id="supplier-label">Fournisseur</InputLabel>
                <Select
                  labelId="supplier-label"
                  id="supplier"
                  value={fournisseurCode}
                  label="Fournisseur"
                  onChange={handleFournisseurChange}
                >
                  {fournisseurs.map((fournisseur) => (
                    <MenuItem key={fournisseur.cref} value={fournisseur.cref}>
                      {fournisseur.cref} - {fournisseur.cnom} {fournisseur.cprenom}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                id="entryDate"
                label="Date d'Entrée"
                name="entryDate"
                type="date"
                value={formData.entryDate}
                onChange={handleChange}
                InputLabelProps={{ shrink: true }}
              />
            </Grid>
          </Grid>

          {selectedArticle && (
            <Card sx={{ mt: 5 }}>
              <CardContent>
                <Typography variant="h6">Détails de l'article</Typography>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>Référence</TableCell>
                      <TableCell>Prix</TableCell>
                      <TableCell>Quantité en Stock</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    <TableRow>
                      <TableCell>{selectedArticle.aref}</TableCell>
                      <TableCell>{selectedArticle.auniteVnt}</TableCell>
                      <TableCell>{selectedArticle.aqteStock}</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          )}

          {selectedFournisseur && (
            <Card sx={{ mt: 3 }}>
              <CardContent>
                <Typography variant="h6">Informations Fournisseur</Typography>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>Nom</TableCell>
                      <TableCell>Code</TableCell>
                      <TableCell>Adresse</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    <TableRow>
                      <TableCell>{selectedFournisseur.cnom} {selectedFournisseur.cprenom}</TableCell>
                      <TableCell>{selectedFournisseur.cref}</TableCell>
                      <TableCell>{selectedFournisseur.cadresse}</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          )}

          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            sx={{ mt: 4, mb: 2 }}
            disabled={loading}
          >
            Enregistrer le Bon d'Entrée
          </Button>

          {error && (
            <Alert severity="error" sx={{ mt: 2 }}>
              {error}
            </Alert>
          )}

          <Snackbar open={openSnackbar} autoHideDuration={6000} onClose={handleCloseSnackbar}>
            <Alert onClose={handleCloseSnackbar} severity={success ? 'success' : 'error'}>
              {success ? 'Bon d\'entrée enregistré avec succès !' : error}
            </Alert>
          </Snackbar>
        </Box>
      </Container>
    </ThemeProvider>
  );
};

export default BonEntree;
