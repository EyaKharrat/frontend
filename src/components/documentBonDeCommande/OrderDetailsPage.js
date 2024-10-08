import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axiosInstance from '../../axiosInstance';
import { Typography, Card, CardContent, Table, TableHead, TableRow, TableCell, TableBody, Box, Paper } from '@mui/material';
import PDFGenerator from './PDFGenerator';

const OrderDetailsPage = () => {
    const { uniqueId } = useParams();
    const [orderDetails, setOrderDetails] = useState({
        client: {},
        articleItems: [],
        docTotalHt: 0,
        docRemise: 0,
        docTotalTva: 0,
        docTotalTtc: 0,
        date: '',
    });
    const [clientDetails, setClientDetails] = useState({});
    const [articlesDetails, setArticlesDetails] = useState([]);

    useEffect(() => {
        const fetchOrderDetails = async () => {
            try {
                const response = await axiosInstance.get(`https://localhost:7029/api/DocumentDetailCommandes/${uniqueId}`);
                setOrderDetails(response.data);
                localStorage.setItem('orderReference', uniqueId);
                const clientResponse = await axiosInstance.get(`https://localhost:7029/api/Tiers/GetTier/${response.data.docRef}`);
                setClientDetails(clientResponse.data);

                const articlesRefs = response.data.docArt.split(', ');
                const articlesData = await Promise.all(
                    articlesRefs.map(async (aref) => {
                        const articleResponse = await axiosInstance.get(`https://localhost:7029/api/Articles/${aref}`);
                        return { ...articleResponse.data, quantity: response.data.docQte };
                    })
                );
                setArticlesDetails(articlesData);

            } catch (error) {
                console.error('Error fetching order details:', error);
            }
        };

        fetchOrderDetails();
    }, [uniqueId]);

    // Use optional chaining and default values to avoid errors
    const {
        date: deliveryDate = '',
        docQte = 0,
        docTotalHT = 0,
        docRemise = 0,
        docTotalTva = 0,
        docTotalTtc = 0
    } = orderDetails;
    
    const {
        cref = 'N/A',
        cnom = 'N/A',
        cprenom = 'N/A',
        cadresse = 'N/A'
    } = clientDetails;

    return (
        <Box id="order-details" p={3}>
            <Paper elevation={3} style={{ padding: '20px', backgroundColor: '#f9f9f9' }}>
                <Typography variant="h4" gutterBottom align="center" color="primary">
                    Bon de Commande
                </Typography>
                <Typography variant="h6" align="center" color="textSecondary">
                    Référence Bon de Commande: {uniqueId}
                </Typography>
                
                <Card variant="outlined" style={{ marginTop: '20px' }}>
                    <CardContent>
                        <Typography variant="body1" gutterBottom color="primary">
                            <strong>Date de Livraison:</strong> {new Date(deliveryDate).toLocaleDateString()}
                        </Typography>
                        <Typography variant="h6" gutterBottom color="primary">
                            Destinataire
                        </Typography>
                        <Typography variant="body1"><strong>Client Code: </strong>{cref}</Typography>
                        <Typography variant="body1"><strong>Nom et Prénom: </strong>{cnom} {cprenom}</Typography>
                        <Typography variant="body1"><strong>Adresse:</strong> {cadresse}</Typography>

                        <Card sx={{ mt: 2, mb: 2, padding: '10px' }}>
                            <CardContent>
                                <Typography variant="h6" gutterBottom color="primary">
                                    Détails des Articles
                                </Typography>
                                <Table sx={{ mb: 2 }}>
                                    <TableHead>
                                        <TableRow>
                                            <TableCell>Référence</TableCell>
                                            <TableCell>Nom de l'article</TableCell>
                                            <TableCell>Prix HT</TableCell>
                                            <TableCell>Prix avec TVA</TableCell>
                                            <TableCell>TVA (%)</TableCell>
                                            <TableCell>Prix Promo</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {articlesDetails.map((article, index) => (
                                            <TableRow key={index}>
                                                <TableCell>{article.aref || 'N/A'}</TableCell>
                                                <TableCell>{article.asfamille || 'N/A'}</TableCell>
                                                <TableCell>{(article.apuventeHt || 0).toFixed(2)}</TableCell>
                                                <TableCell>{(article.auniteVnt || 0).toFixed(2)}</TableCell>
                                                <TableCell>19</TableCell>
                                                <TableCell>{(article.aprixVntprom || 0).toFixed(2)}</TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                                <Typography variant="h6" gutterBottom color="primary">
                                    Les Frais Totales
                                </Typography>
                                <Typography variant="body1"><strong>Total Quantité:</strong> {docQte}</Typography>
                                <Typography variant="body1"><strong>Total HT:</strong> { docTotalHT.toFixed(2)} TND</Typography>
                                <Typography variant="body1"><strong>Total Remise:</strong> { docRemise.toFixed(2)} TND</Typography>
                                <Typography variant="body1"><strong>Total Prix avec TVA:</strong> {docTotalTva.toFixed(2)} TND</Typography>
                                <Typography variant="body1"><strong>Total TTC:</strong> {docTotalTtc.toFixed(2)} TND</Typography>
                            </CardContent>
                        </Card>

                        <PDFGenerator contentId="order-details" fileName="order-details.pdf" />
                    </CardContent>
                </Card>
            </Paper>
        </Box>
    );
};

export default OrderDetailsPage;
