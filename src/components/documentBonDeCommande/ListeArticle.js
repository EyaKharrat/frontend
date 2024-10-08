import React from 'react';
import { Grid, FormControl, InputLabel, Select, MenuItem, TextField, InputAdornment, Button, Card, CardContent, Table, TableHead, TableRow, TableCell, TableBody, Typography } from '@mui/material';

const ListeArticle = ({ articleItems, setArticleItems, articles }) => {

    const handleArticleChange = (index, event) => {
        const newArticleItems = [...articleItems];
        newArticleItems[index].articleCode = event.target.value;
        setArticleItems(newArticleItems);
    };

    const handleQuantityChange = (index, event) => {
        const newArticleItems = [...articleItems];
        newArticleItems[index].quantity = Number(event.target.value);
        setArticleItems(newArticleItems);
    };

    const handleAddArticle = () => {
        setArticleItems([...articleItems, { articleCode: '', quantity: 1 }]);
    };

    const handleRemoveArticle = (index) => {
        const newArticleItems = articleItems.filter((_, i) => i !== index);
        setArticleItems(newArticleItems);
    };

    const calculateTotalTTC = (selectedArticle, quantity) => {
        if (!selectedArticle) return 0;
        const price = selectedArticle.apuventeHt;
        const promotionalPrice = selectedArticle.aprixVntprom;
        const margin = selectedArticle.auniteVnt;
        const priceWithMargin = price + (price * (margin / 100));
        const priceAfterDiscount = promotionalPrice || priceWithMargin;
        const totalTTC = (priceAfterDiscount * quantity) * 1.19; 
        return totalTTC.toFixed(2);
    };

    const getStockAlert = (selectedArticle, quantity) => {
        if (!selectedArticle) return '';
        if (selectedArticle.aqteStock === 0) {
            return 'Fin de stock';
        } else if (quantity > selectedArticle.aqteStock) {
            return `Stock insuffisant. Quantité disponible: ${selectedArticle.aqteStock}`;
        }
        return '';
    };

    return (
        <div>
            <Typography variant="h6">Sélectionnez les Articles</Typography>
            {articleItems.map((item, index) => {
                const selectedArticle = articles.find(article => article.aref === item.articleCode);
                const stockAlert = getStockAlert(selectedArticle, item.quantity);

                return (
                    <Card key={index} sx={{ mt: 2 }}>
                        <CardContent>
                            <Grid container spacing={2} alignItems="center">
                                <Grid item xs={12} sm={6}>
                                    <FormControl fullWidth margin="normal">
                                        <InputLabel>Code de l'Article</InputLabel>
                                        <Select
                                            value={item.articleCode}
                                            onChange={(event) => handleArticleChange(index, event)}
                                            label="Code de l'Article"
                                            required
                                        >
                                            {articles.map(article => (
                                                <MenuItem key={article.aref} value={article.aref}>
                                                    {article.aref}
                                                </MenuItem>
                                            ))}
                                        </Select>
                                    </FormControl>
                                </Grid>
                                <Grid item xs={12} sm={4}>
                                    <TextField
                                        fullWidth
                                        type="number"
                                        label="Quantité"
                                        value={item.quantity}
                                        onChange={(event) => handleQuantityChange(index, event)}
                                        InputProps={{
                                            startAdornment: <InputAdornment position="start">Qte</InputAdornment>,
                                        }}
                                    />
                                    {stockAlert && <Typography color="error" variant="caption">{stockAlert}</Typography>}
                                </Grid>
                                <Grid item xs={12} sm={2}>
                                    <Button
                                        variant="contained"
                                        color="secondary"
                                        onClick={() => handleRemoveArticle(index)}
                                        fullWidth
                                    >
                                        Supprimer
                                    </Button>
                                </Grid>
                            </Grid>
                        </CardContent>
                    </Card>
                );
            })}
            <Button
                variant="outlined"
                color="primary"
                onClick={handleAddArticle}
                sx={{ mt: 2 }}
            >
                Ajouter un autre Article
            </Button>

            <Table sx={{ mb: 2 }}>
                <TableHead>
                    <TableRow>
                        <TableCell>Référence</TableCell>
                        <TableCell>Prix HT</TableCell>
                        <TableCell>Prix de vente</TableCell>
                        <TableCell>TVA (%)</TableCell>
                        <TableCell>Prix TTC de vente</TableCell>
                        <TableCell>Prix Promo</TableCell>
                        <TableCell>Quantité</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {articleItems.map((item, index) => {
                        const selectedArticle = articles.find(article => article.aref === item.articleCode);
                        return (
                            <TableRow key={index}>
                                <TableCell>{selectedArticle ? selectedArticle.aref : ''}</TableCell>
                                <TableCell>{selectedArticle ? selectedArticle.apuventeHt : 0}</TableCell>
                                <TableCell>{selectedArticle ? selectedArticle.auniteVnt : 0}</TableCell>
                                <TableCell>19</TableCell>
                                <TableCell>{calculateTotalTTC(selectedArticle, item.quantity)}</TableCell>
                                <TableCell>{selectedArticle ? selectedArticle.aprixVntprom : 0}</TableCell>
                                <TableCell>{item.quantity}</TableCell>
                            </TableRow>
                        );
                    })}
                </TableBody>
            </Table>
        </div>
    );
};

export default ListeArticle;
