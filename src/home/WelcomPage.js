import React from 'react';
import { Box, Button, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';


const WelcomePage = () => {
    const navigate = useNavigate();

    return (
        <Box
            sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: '100vh',
                backgroundImage:  `url('/img/8492615.jpg')`, 
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                color: '#fff',
                textAlign: 'center',
                flexDirection: 'column',
                px: 3,
            }}
        >
            <Typography variant="h2" sx={{ mb: 4 }}>
                Bienvenue sur Notre Plateforme
            </Typography>
            <Box sx={{ display: 'flex', gap: 2 }}>
                <Button
                    variant="contained"
                    color="primary"
                    size="large"
                    onClick={() => navigate('/registre')} // Redirige vers la page d'inscription
                >
                    S'inscrire
                </Button>
                <Button
                   variant="contained"
                    color="primary"
                    size="large"
                    onClick={() => navigate('/login')} // Redirige vers la page de connexion
                >
                    Se connecter
                </Button>
            </Box>
        </Box>
    );
};

export default WelcomePage;
