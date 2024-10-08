import React, { useState } from 'react';
import { Box, Grid, Typography, Card, CardMedia, CardContent, CardActions, Button, Container, TextField, Dialog, DialogContent, DialogTitle } from '@mui/material';
import './Article.css';
import { useArticleMethods } from './useArticleMethods';

function ArticleList() {
    const { articles,  handleAddArticle, handleEdit, handleDelete} = useArticleMethods();
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedArticle, setSelectedArticle] = useState(null);

    const filteredArticles = articles.filter(article =>
        article.adesignation.toLowerCase().includes(searchQuery.toLowerCase()) ||
        article.acategorie.toLowerCase().includes(searchQuery.toLowerCase()) ||
        article.aref.toLowerCase().includes(searchQuery.toLowerCase()) ||
        article.afamille.toLowerCase().includes(searchQuery.toLowerCase()) ||
        article.asfamille.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const handleArticleClick = (article) => {
        setSelectedArticle(article);
    };

    const handleCloseDetail = () => {
        setSelectedArticle(null);
    };


    return (
        <Container>
            <Box className="search-container" sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                <TextField
                    variant="outlined"
                    placeholder="Search Articles"
                    size="small"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    sx={{ flexGrow: 1, marginRight: 2 }}
                />
                <Button variant="contained" color="primary" onClick={handleAddArticle}>
                    Add Article
                </Button>
            </Box>
            <Grid container spacing={3}>
                {filteredArticles.map((article) => (
                    <Grid item xs={12} sm={6} md={4} key={article.aref}>
                        <Card
                            sx={{ height: '100%', display: 'flex', flexDirection: 'column', padding: 2, backgroundColor: '#f9f9f9', boxShadow: '0 3px 6px rgba(0,0,0,0.1)' }}
                        >
                            <CardMedia
                                component="img"
                                height="150"
                                image={article.image || '/img/default.jpg'}
                                alt={article.adesignation}
                                sx={{ objectFit: 'cover', borderRadius: '4px', cursor: 'pointer' }}
                                onClick={(e) => {
                                    e.stopPropagation(); // Prevent the event from propagating to the Card
                                    handleArticleClick(article); // Open detailed view
                                }}
                            />
                            <CardContent sx={{ flexGrow: 1, padding: 1 }}>
                                <Typography variant="body2" color="textSecondary">
                                    <strong>Référence:</strong> {article.aref}
                                </Typography>
                                <Typography variant="body2" color="textSecondary">
                                    <strong>Type-article:</strong> {article.afamille}
                                </Typography>
                                <Typography variant="body2" color="textSecondary">
                                    <strong>Nom-article:</strong> {article.asfamille}
                                </Typography>
                                <Typography variant="body2" color="textSecondary">
                                <strong>Désignation:</strong> {article.adesignation}
                                </Typography>
                                <Typography
                                    variant="body2"
                                    color="textSecondary"
                                    sx={{
                                        textDecoration: article.aprixVntprom && article.auniteVnt !== article.aprixVntprom ? 'line-through' : 'none',
                                        color: article.aprixVntprom && article.auniteVnt !== article.aprixVntprom ? 'red' : 'inherit'
                                    }}
                                >
                                    <strong>Prix Achat:</strong> 
                                    {article.auniteVnt !== null && article.auniteVnt !== undefined ? `${article.auniteVnt.toFixed(2)} dt` : 'N/A'}
                                </Typography>
                                {article.aprixVntprom !== null && article.aprixVntprom !== undefined && article.auniteVnt !== article.aprixVntprom && (
                                    <Typography variant="body2" color="textSecondary">
                                        <strong>Prix avec Remise:</strong> 
                                        {`${article.aprixVntprom.toFixed(2)} dt`}
                                    </Typography>
                                )}
                                <Typography variant="body2" color="textSecondary">
                                    <strong>Quantité disponible:</strong> {article.aqteStock !== null ? article.aqteStock : 'N/A'}
                                </Typography>
                            </CardContent>
                            <CardActions sx={{ justifyContent: 'space-between', padding: 1 }}>
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

            {selectedArticle && (
                <Dialog
                    open={!!selectedArticle}
                    onClose={handleCloseDetail}
                    maxWidth="md"
                    fullWidth
                >
                     <DialogTitle>Détails de l'article</DialogTitle>
                        <DialogContent>
                            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                                <CardMedia
                                    component="img"
                                    height="400"
                                    image={selectedArticle.image || '/img/default.jpg'}
                                    alt={selectedArticle.adesignation}
                                    sx={{ objectFit: 'contain', borderRadius: '8px', marginBottom: 2, width: '100%' }}
                                />
                            <Typography variant="h6">
                            <strong>Référence:</strong>{selectedArticle.aref}
                            </Typography>
                            <Typography variant="body1" color="textSecondary">
                                <strong>Type-article:</strong> {selectedArticle.afamille}
                            </Typography>
                            <Typography variant="body1" color="textSecondary">
                                <strong>Nom-article:</strong> {selectedArticle.asfamille}
                            </Typography>
                            <Typography variant="body1" color="textSecondary">
                                <strong></strong> {selectedArticle.adesignation}
                            </Typography>
                            <Typography variant="body1" color="textSecondary">
                                <strong>Prix Achat:</strong> 
                                {selectedArticle.auniteVnt !== null && selectedArticle.auniteVnt !== undefined ? `${selectedArticle.auniteVnt.toFixed(2)} dt` : 'N/A'}
                            </Typography>
                            {selectedArticle.aprixVntprom !== null && selectedArticle.aprixVntprom !== undefined && selectedArticle.auniteVnt !== selectedArticle.aprixVntprom && (
                                <Typography variant="body1" color="textSecondary">
                                    <strong>Prix avec Remise:</strong> 
                                    {`${selectedArticle.aprixVntprom.toFixed(2)} dt`}
                                </Typography>
                            )}
                            <Typography variant="body1" color="textSecondary">
                                <strong>Quantité disponible:</strong> {selectedArticle.aqteStock !== null ? selectedArticle.aqteStock : 'N/A'}
                            </Typography>
                        </Box>
                    </DialogContent>
                </Dialog>
            )}
        </Container>
    );
}

export default ArticleList;
