import React, { useState } from 'react';
import { useNavigate, Link as RouterLink } from 'react-router-dom';
import {
  Avatar,
  Button,
  TextField,
  Grid,
  Box,
  Typography,
  Container,
  CircularProgress,
  Alert,
} from '@mui/material';
import { LockOutlined as LockOutlinedIcon } from '@mui/icons-material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import axios from 'axios';
import Link from '@mui/material/Link';

const theme = createTheme();

const Registre = () => {
  const initialFormData = {
    Name: '',
    Email: '',
    Password: '',
    ConfirmPassword: ''
  };

  const [formData, setFormData] = useState(initialFormData);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [errors, setErrors] = useState({});
  
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const validate = () => {
    const errors = {};
    if (!formData.Name.trim()) {
      errors.Name = 'Le nom est requis';
    }
    if (!formData.Email.trim()) {
      errors.Email = 'L\'adresse email est requise';
    } else if (!/\S+@\S+\.\S+/.test(formData.Email)) {
      errors.Email = 'L\'adresse email est invalide';
    }
    if (!formData.Password) {
      errors.Password = 'Le mot de passe est requis';
    } else if (formData.Password.length < 6) {
      errors.Password = 'Le mot de passe doit comporter au moins 6 caractères';
    }
    if (!formData.ConfirmPassword) {
      errors.ConfirmPassword = 'La confirmation du mot de passe est requise';
    } else if (formData.ConfirmPassword !== formData.Password) {
      errors.ConfirmPassword = 'Les mots de passe ne correspondent pas';
    }
    return errors;
  };

  const save = async (event) => {
    event.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
  
    try {
      setLoading(true);
      setError(null);
  
      const requestData = {
        Name: formData.Name,
        Email: formData.Email,
        Password: formData.Password,
        ConfirmPassword: formData.ConfirmPassword
      };
  
      const response = await axios.post("https://localhost:7029/api/Account/register", requestData);
  
      if (response.status === 200) {
        alert("Inscription réussie");
        setFormData(initialFormData);
        setErrors({});
        navigate('/login');
      } else {
        setError("Échec de l'inscription");
      }
    } catch (err) {
      setError(err.message || 'Une erreur est survenue lors de l\'inscription');
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <ThemeProvider theme={theme}>
      <Box
        sx={{
          backgroundImage: `url('/img/8492615.jpg')`, // Remplacez par le chemin de votre image de fond
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          minHeight: '100vh',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Container component="main" maxWidth="xs">
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              bgcolor: 'rgba(255, 255, 255, 0.8)',
              p: 4,
              borderRadius: 2,
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Inscription
            </Typography>
            {error && (
              <Alert severity="error" sx={{ width: '100%', mt: 2 }}>
                {error}
              </Alert>
            )}
            <Box component="form" onSubmit={save} noValidate sx={{ mt: 1 }}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="Name"
                label="Nom"
                name="Name"
                autoComplete="name"
                autoFocus
                value={formData.Name}
                onChange={handleChange}
                error={Boolean(errors.Name)}
                helperText={errors.Name}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                id="Email"
                label="Adresse email"
                name="Email"
                autoComplete="email"
                value={formData.Email}
                onChange={handleChange}
                error={Boolean(errors.Email)}
                helperText={errors.Email}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="Password"
                label="Mot de passe"
                type="password"
                id="Password"
                autoComplete="current-password"
                value={formData.Password}
                onChange={handleChange}
                error={Boolean(errors.Password)}
                helperText={errors.Password}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="ConfirmPassword"
                label="Confirmer le mot de passe"
                type="password"
                id="ConfirmPassword"
                value={formData.ConfirmPassword}
                onChange={handleChange}
                error={Boolean(errors.ConfirmPassword)}
                helperText={errors.ConfirmPassword}
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                disabled={loading}
              >
                {loading ? <CircularProgress size={24} /> : 'Inscription'}
              </Button>
              <Grid container justifyContent="flex-end">
                <Grid item>
                  <Link component={RouterLink} to="/login" variant="body2">
                  {"Vous avez déjà un compte ? Connectez-vous"}
                  </Link>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Container>
      </Box>
    </ThemeProvider>
  );
};

export default Registre;
