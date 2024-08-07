import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Popup from '../Popup';
import { Article } from './Article';
import { Box, Grid, Typography, Card, CardMedia, CardContent, CardActions, Button, Container } from '@mui/material';
import './Article.css';

function ArticleList() {
    const [articles, setArticles] = useState([]);
    const [recordForEdit, setRecordForEdit] = useState(null);
    const [openPopup, setOpenPopup] = useState(false);
    const navigate = useNavigate();

    const fetchArticles = useCallback(async () => {
        try {
            const response = await axios.get('https://localhost:7029/api/Articles');
            setArticles(response.data);
        } catch (error) {
            console.error('Error fetching articles', error);
        }
    }, []);

    useEffect(() => {
        fetchArticles();
    }, [fetchArticles]);

    const addOrEdit = (article) => {
        if (article.aref) {
            setArticles(articles.map(item => (item.aref === article.aref ? article : item)));
        } else {
            setArticles([...articles, article]);
        }
    };

    const handleEdit = (article) => {
        setRecordForEdit(article);
        setOpenPopup(true);
    };

    const handleDelete = async (aref) => {
        try {
            await axios.delete(`https://localhost:7029/api/Articles/${aref}`);
            setArticles(articles.filter(article => article.aref !== aref));
            alert('Article deleted successfully!');
        } catch (error) {
            console.error('Error deleting article', error);
            alert('There was an error deleting the article!');
        }
    };

    const handleAddArticle = () => {
        navigate('/article');
    };

    return (
        <Container>
            <Typography variant="h4" gutterBottom sx={{ mb: 2 }}>
                Liste des articles
            </Typography>
            <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 2 }}>
                <Button variant="contained" color="primary" onClick={handleAddArticle}>
                    Add Article
                </Button>
            </Box>
            {openPopup && (
                <Popup
                    title={recordForEdit ? 'Edit Article' : 'Add Article'}
                    openPopup={openPopup}
                    setOpenPopup={setOpenPopup}
                >
                    <Article
                        recordForEdit={recordForEdit}
                        addOrEdit={addOrEdit}
                        onClose={() => setOpenPopup(false)}
                    />
                </Popup>
            )}
            <Grid container spacing={2}>
                {articles.map((article) => (
                    <Grid item xs={12} sm={6} md={4} key={article.aref}>
                        <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column', padding: '8px' }}>
                            <CardMedia
                                component="img"
                                height="150"
                                image={article.image || '/img/default.jpg'}
                                alt={article.adesignation}
                                sx={{ objectFit: 'cover' }}
                            />
                            <CardContent sx={{ flexGrow: 1, padding: '8px' }}>
                                <Typography variant="h6" gutterBottom sx={{ fontSize: '1rem' }}>
                                    {article.adesignation}
                                </Typography>
                                <Typography variant="body2" color="textSecondary">
                                    <strong>Référence:</strong> {article.aref}
                                </Typography>
                                <Typography variant="body2" color="textSecondary">
                                    <strong>Catégorie:</strong> {article.afamille}
                                </Typography>
                                <Typography variant="body2" color="textSecondary">
                                    <strong>Marques:</strong> {article.asfamille}
                                </Typography>
                                <Typography variant="body2" color="textSecondary">
                                    <strong>Prix Achat:</strong> {article.auniteVnt !== null ? `${article.auniteVnt.toFixed(2)} €` : 'N/A'}
                                </Typography>
                                <Typography variant="body2" color="textSecondary">
                                    <strong>Prix avec Remise:</strong> {article.aprixVntprom !== null ? `${article.aprixVntprom.toFixed(2)} €` : 'N/A'}
                                </Typography>
                                <Typography variant="body2" color="textSecondary">
                                    <strong>Quantité disponible:</strong> {article.aqteStock !== null ? article.aqteStock : 'N/A'}
                                </Typography>
                            </CardContent>
                            <CardActions sx={{ justifyContent: 'flex-end', padding: '8px' }}>
                                <Button size="small" color="primary" onClick={() => handleEdit(article)}>
                                    Modifier
                                </Button>
                                <Button size="small" color="error" onClick={() => handleDelete(article.aref)}>
                                    Supprimer
                                </Button>
                            </CardActions>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </Container>
    );
}

export default ArticleList;
