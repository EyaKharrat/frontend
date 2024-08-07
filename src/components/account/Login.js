import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Avatar,Button,TextField,FormControlLabel,Checkbox,Link,Grid,Box,Typography, Container,CircularProgress,Alert,} from '@mui/material';
import { LockOutlined as LockOutlinedIcon } from '@mui/icons-material';
import { createTheme, ThemeProvider } from '@mui/material/styles';

const theme = createTheme();

const Login = ({ handleLogin }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [loginSuccessMessage, setLoginSuccessMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const validateForm = () => {
    const errors = {};
    if (!formData.email.trim()) {
      errors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = 'Email is invalid';
    }
    if (!formData.password.trim()) {
      errors.password = 'Password is required';
    }
    return errors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setLoading(true);
    setErrors({});

    axios.post('https://localhost:7029/api/Account/login', formData)
      .then(response => {
        console.log(response);
        const { message, token } = response.data;

        // Parse the message to extract user session information if needed
        const userSession = {
          id: message.match(/Id = ([^,]+)/)[1],
          name: message.match(/Name = ([^,]+)/)[1],
          email: message.match(/Email = ([^,]+)/)[1],
          role: message.match(/Role = ([^}]+)/)[1]
        };

        // Retrieve existing user sessions from local storage
        const existingUserSessions = JSON.parse(localStorage.getItem('userSessions')) || [];

        // Add the new user session to the array
        const updatedUserSessions = [...existingUserSessions, userSession];

        // Store the updated user sessions array in local storage
        localStorage.setItem('userSessions', JSON.stringify(updatedUserSessions));
        localStorage.setItem('token', token);

        console.log('User Session:', userSession);
        console.log('Token:', token);

        setLoginSuccessMessage('Login successful! Redirecting to Home...');
        navigate('/home');
      })
      .catch(error => {
        console.error(error);
        setErrors({ general: 'Failed to login. Please check your credentials.' });
      })
      .finally(() => {
        setLoading(false);
      });
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
            Sign in
          </Typography>
          {loginSuccessMessage && (
            <Alert severity="success" sx={{ width: '100%', mt: 2 }}>
              {loginSuccessMessage}
            </Alert>
          )}
          {errors.general && (
            <Alert severity="error" sx={{ width: '100%', mt: 2 }}>
              {errors.general}
            </Alert>
          )}
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              value={formData.email}
              onChange={handleChange}
              error={Boolean(errors.email)}
              helperText={errors.email}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              value={formData.password}
              onChange={handleChange}
              error={Boolean(errors.password)}
              helperText={errors.password}
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              disabled={loading}
            >
              {loading ? <CircularProgress size={24} /> : 'Sign In'}
            </Button>
            <Grid container>
              <Grid item xs>
                <Link href="#" variant="body2">
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link href="#" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
};

export default Login;
