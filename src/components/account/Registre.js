import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import {
  Avatar,
  Button,
  TextField,
  Link,
  Grid,
  Box,
  Typography,
  Container,
  CircularProgress,
  Alert,
} from '@mui/material';
import { LockOutlined as LockOutlinedIcon } from '@mui/icons-material';
import { createTheme, ThemeProvider } from '@mui/material/styles';

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
      errors.Name = 'Name is required';
    }
    if (!formData.Email.trim()) {
      errors.Email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.Email)) {
      errors.Email = 'Email is invalid';
    }
    if (!formData.Password) {
      errors.Password = 'Password is required';
    } else if (formData.Password.length < 6) {
      errors.Password = 'Password must be at least 6 characters';
    }
    if (!formData.ConfirmPassword) {
      errors.ConfirmPassword = 'Confirm Password is required';
    } else if (formData.ConfirmPassword !== formData.Password) {
      errors.ConfirmPassword = 'Passwords do not match';
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
        alert("Registration Successful");
        setFormData(initialFormData);
        setErrors({});
        navigate('/');
      } else {
        setError("Registration Failed");
      }
    } catch (err) {
      setError(err.message || 'Error occurred during registration');
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign Up
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
              label="Name"
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
              label="Email Address"
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
              label="Password"
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
              label="Confirm Password"
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
              {loading ? <CircularProgress size={24} /> : 'Sign Up'}
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link href="/" variant="body2">
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
};

export default Registre;
