import React, { useState, useEffect } from 'react';
import { Paper, Typography, Grid, Divider, Button, TextField, Table, TableHead, TableBody, TableRow, TableCell, Snackbar, Alert } from '@mui/material';
import ListeArticle from './ListeArticle';
import ListeClient from './Listeclient';
import axiosInstance from '../../axiosInstance';
import { useNavigate } from 'react-router-dom';

const DocumentBonDeCommande = ({ onClose }) => {
    const navigate = useNavigate();
    const [clientCode, setClientCode] = useState('');
    const [selectedClient, setSelectedClient] = useState(null);
    const [articles, setArticles] = useState([]);
    const [articleItems, setArticleItems] = useState([{ articleCode: '', quantity: 1 }]);
    const [deliveryDate, setDeliveryDate] = useState('');
    const [stockAlerts, setStockAlerts] = useState([]);
    const [openSnackbar, setOpenSnackbar] = useState(false);

    useEffect(() => {
        const fetchArticles = async () => {
            try {
                const response = await axiosInstance.get('https://localhost:7029/api/Articles');
                setArticles(response.data);
            } catch (error) {
                console.error('Error fetching articles:', error);
            }
        };
        fetchArticles();
    }, []);

    const calculateTotal = () => {
        const TVA_RATE = 19;
        return articleItems.reduce((totals, item) => {
            const selectedArticle = articles.find(article => article.aref === item.articleCode);
            if (selectedArticle) {
                const { apuventeHt, auniteVnt, aprixVntprom } = selectedArticle;
                const quantity = item.quantity;

                totals.totalHT += apuventeHt * quantity;
                totals.totalPrixVente += auniteVnt * quantity;
                totals.totalPrixTTC += auniteVnt * quantity * (1 + TVA_RATE / 100);
                totals.totalPromo += aprixVntprom * quantity;
                totals.totalQuantity += quantity;
            }
            return totals;
        }, {
            totalHT: 0,
            totalPrixVente: 0,
            totalPrixTTC: 0,
            totalPromo: 0,
            totalQuantity: 0,
        });
    };

    const checkStockAvailability = () => {
        const alerts = [];
        for (const item of articleItems) {
            const selectedArticle = articles.find(article => article.aref === item.articleCode);
            if (selectedArticle) {
                if (item.quantity > selectedArticle.aqteStock && selectedArticle.aqteStock > 0) {
                    alerts.push(`Stock insuffisant pour l'article ${item.articleCode}. Quantité disponible: ${selectedArticle.aqteStock}`);
                }
                if (selectedArticle.aqteStock === 0) {
                    alerts.push(`Fin de stock pour l'article ${item.articleCode}.`);
                }
            }
        }
        return alerts;
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        const alerts = checkStockAvailability();
        if (alerts.length > 0) {
            handleStockAlert(alerts);
            return;
        }

        const articleReferences = articleItems
            .map(item => item.articleCode)
            .filter(code => code)
            .join(', ');

        const bonDeCommandeData = {
            docRef: String(clientCode),
            docArt: articleReferences,
            docQte: calculateTotal().totalQuantity,
            docTotalHT: calculateTotal().totalHT,
            docRemise: calculateTotal().totalPromo,
            docTotalTva: calculateTotal().totalPrixVente,
            docTotalTtc: calculateTotal().totalPrixTTC,
            date: deliveryDate
        };

        try {
            const response = await axiosInstance.post('https://localhost:7029/api/DocumentDetailCommandes', bonDeCommandeData);
            const { uniqueId } = response.data;
            await updateStock(); // Update stock after successful order
            setOpenSnackbar(true);
            navigate(`/order/${uniqueId}`);
            onClose();
        } catch (error) {
            console.error('Error submitting Bon De Commande:', error);
        }
    };

    const updateStock = async () => {
        try {
            for (const item of articleItems) {
                const selectedArticle = articles.find(article => article.aref === item.articleCode);
                if (selectedArticle) {
                    const updatedQuantity = selectedArticle.aqteStock - item.quantity;
                    await axiosInstance.put(`https://localhost:7029/api/Articles/${item.articleCode}`, { ...selectedArticle, aqteStock: updatedQuantity });
                }
            }
        } catch (error) {
            console.error('Error updating stock:', error);
        }
    };

    const handleStockAlert = (alerts) => {
        setStockAlerts(alerts);
        setOpenSnackbar(true);
    };

    const handleCloseSnackbar = () => {
        setOpenSnackbar(false);
    };

    return (
        <Paper sx={{ padding: 3 }}>
            <Typography variant="h4" gutterBottom>Bon de Commande</Typography>
            <Divider sx={{ mb: 3 }} />
            <form onSubmit={handleSubmit}>
                <ListeClient
                    clientCode={clientCode}
                    setClientCode={setClientCode}
                    selectedClient={selectedClient}
                    setSelectedClient={setSelectedClient}
                />
                <Divider sx={{ my: 3 }} />
                <TextField
                    label="Date de Livraison"
                    type="date"
                    value={deliveryDate}
                    onChange={(e) => setDeliveryDate(e.target.value)}
                    InputLabelProps={{ shrink: true }}
                    fullWidth
                    sx={{ mb: 3 }}
                />
                <ListeArticle
                    articleItems={articleItems}
                    setArticleItems={setArticleItems}
                    articles={articles}
                    onStockAlert={handleStockAlert}
                />
                <Divider sx={{ my: 3 }} />
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Total HT</TableCell>
                            <TableCell>Total Prix avec promotion</TableCell>
                            <TableCell>Total Prix de Vente</TableCell>
                            <TableCell>Total TTC</TableCell>
                            <TableCell>Quantité Totale</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        <TableRow>
                            <TableCell>{calculateTotal().totalHT.toFixed(2)} TND</TableCell>
                            <TableCell>{calculateTotal().totalPromo.toFixed(2)} TND</TableCell>
                            <TableCell>{calculateTotal().totalPrixVente.toFixed(2)} TND</TableCell>
                            <TableCell>{calculateTotal().totalPrixTTC.toFixed(2)} TND</TableCell>
                            <TableCell>{calculateTotal().totalQuantity}</TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <Button type="submit" variant="contained" color="primary" fullWidth>
                            Enregistrer Bon de Commande
                        </Button>
                    </Grid>
                </Grid>
            </form>
            <Snackbar
                open={openSnackbar}
                autoHideDuration={6000}
                onClose={handleCloseSnackbar}
            >
                <Alert
                    onClose={handleCloseSnackbar}
                    severity={stockAlerts.length > 0 ? 'error' : 'success'}
                    sx={{ width: '100%' }}
                >
                    {stockAlerts.length > 0 ? stockAlerts.join(' | ') : 'Bon de commande soumis avec succès !'}
                </Alert>
            </Snackbar>
        </Paper>
    );
};

export default DocumentBonDeCommande;
