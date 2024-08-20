import React, { useState, useEffect } from 'react';
import axiosInstance from '../../axiosInstance'; // Assurez-vous que le chemin d'importation est correct
import {
    TextField,
    Grid,
    Typography,
    Box,
    Paper,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    Card,
    CardContent,
    InputAdornment,
    Button,
    Table,
    TableHead,
    TableBody,
    TableRow,
    TableCell,
    Divider
} from '@mui/material';

const AddBonDeCommande = ({ onClose }) => {
    const [formData] = useState({
        docAnnee: '',
        docType: '',
        docRef: '',
        docDate: '',
        docTiers: '',
        docDateEcheance: '',
        docRefExt: '',
        docNumDoc: '',
        docCommentaire: '',
        docLancement: '',
        docCloture: ''
    });

    const [clientCode, setClientCode] = useState('');
    const [clients, setClients] = useState([]);
    const [selectedClient, setSelectedClient] = useState(null);
    const [articleCode, setArticleCode] = useState('');
    const [articles, setArticles] = useState([]);
    const [selectedArticle, setSelectedArticle] = useState(null);
    const [quantity, setQuantity] = useState(1); // Initial quantity set to 1

    useEffect(() => {
        const fetchClients = async () => {
            try {
                const response = await axiosInstance.get('https://localhost:7029/api/Tiers/GetTier');
                setClients(response.data);
            } catch (error) {
                console.error('Error fetching clients:', error);
                setSelectedClient(null);
            }
        };

        const fetchArticles = async () => {
            try {
                const response = await axiosInstance.get('https://localhost:7029/api/Articles');
                setArticles(response.data);
            } catch (error) {
                console.error('Error fetching articles:', error);
                setSelectedArticle(null);
            }
        };

        fetchClients();
        fetchArticles();
    }, []);

    const handleClientChange = async (event) => {
        const selectedCode = event.target.value;
        setClientCode(selectedCode);

        try {
            const response = await axiosInstance.get(`https://localhost:7029/api/Tiers/GetTier/${selectedCode}`);
            setSelectedClient(response.data);
        } catch (error) {
            console.error('Error fetching client details:', error);
            setSelectedClient(null);
        }
    };

    const handleArticleChange = async (event) => {
        const selectedCode = event.target.value;
        setArticleCode(selectedCode);

        try {
            const response = await axiosInstance.get(`https://localhost:7029/api/Articles/${selectedCode}`);
            setSelectedArticle(response.data);
        } catch (error) {
            console.error('Error fetching article details:', error);
            setSelectedArticle(null);
        }
    };

    const handleQuantityChange = (e) => {
        setQuantity(Number(e.target.value));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const payload = { ...formData };
            const response = await axiosInstance.post('https://localhost:7029/api/DocumentBonCommandes', payload);
            if (response.data.uniqueId) {
                alert('Data Saved Successfully');
            } else {
                alert('Data not Saved');
            }
        } catch (error) {
            console.error('There was an error!', error);
            alert('There was an error!');
        }
    };

    const calculateTotalTTC = () => {
        if (!selectedArticle) return 0;
        const price = selectedArticle.apuventeHt;
        const vat = selectedArticle.atauxTva;
        const promotionalPrice = selectedArticle.aprixVntprom;
        const margin = selectedArticle.amarge;

        const priceWithMargin = price + (price * (margin / 100));
        const priceAfterDiscount = promotionalPrice || priceWithMargin;
        const totalTTC = (priceAfterDiscount * quantity) * (1 + (vat / 100));
        
        return totalTTC.toFixed(2);
    };

    const getArticleRow = () => {
        if (!selectedArticle) return null;
        return (
            <TableRow>
                <TableCell>{selectedArticle.aref}</TableCell>
                <TableCell>{selectedArticle.apuventeHt}</TableCell>
                <TableCell>{selectedArticle.amarge}</TableCell>
                <TableCell>{selectedArticle.atauxTva}%</TableCell>
                <TableCell>{calculateTotalTTC()}</TableCell>
                <TableCell>{selectedArticle.aprixVntprom || 'Non Applicable'}</TableCell>
                <TableCell>
                    <TextField
                        fullWidth
                        type="number"
                        value={quantity}
                        onChange={handleQuantityChange}
                        InputProps={{
                            startAdornment: <InputAdornment position="start">Qte</InputAdornment>,
                        }}
                    />
                </TableCell>
            </TableRow>
        );
    };

    return (
        <Box sx={{ padding: 4 }}>
            <Paper sx={{ padding: 4 }}>
                <Typography variant="h5" gutterBottom>
                    Bon de Commande
                </Typography>
                <form onSubmit={handleSubmit}>
                    <Grid container spacing={3}>
                        {/* Section Client */}
                        <Grid item xs={12}>
                            <Typography variant="h6">Sélectionnez un Client</Typography>
                            <FormControl fullWidth margin="normal">
                                <InputLabel>Client Code</InputLabel>
                                <Select
                                    value={clientCode}
                                    onChange={handleClientChange}
                                    label="Client Code"
                                    required
                                >
                                    {clients.map(client => (
                                        <MenuItem key={client.cref} value={client.cref}>
                                            {client.cref}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                            {selectedClient && (
                                <Card sx={{ mt: 2 }}>
                                    <CardContent>
                                        <Typography variant="h6">Informations Client</Typography>
                                        <Table>
                                            <TableHead>
                                                <TableRow>
                                                    <TableCell>Code Client</TableCell>
                                                    <TableCell>Nom et Prénom</TableCell>
                                                    <TableCell>Adresse</TableCell>
                                                    <TableCell>Téléphone</TableCell>
                                                    <TableCell>Type</TableCell>
                                                    <TableCell>Raison Sociale</TableCell>
                                                    <TableCell>Matricule Fiscale</TableCell>
                                                    <TableCell>RC</TableCell>
                                                </TableRow>
                                            </TableHead>
                                            <TableBody>
                                                <TableRow>
                                                    <TableCell>{selectedClient.cref}</TableCell>
                                                    <TableCell>{selectedClient.cnom} {selectedClient.cprenom}</TableCell>
                                                    <TableCell>{selectedClient.cadresse}, {selectedClient.cville}, {selectedClient.cpays}, {selectedClient.ccodePostal}</TableCell>
                                                    <TableCell>{selectedClient.tel}</TableCell>
                                                    <TableCell>{selectedClient.typeC}</TableCell>
                                                    <TableCell>{selectedClient.typeC === 'Société' ? selectedClient.craisonSocial : '-'}</TableCell>
                                                    <TableCell>{selectedClient.typeC === 'Société' ? selectedClient.cmatFiscal : '-'}</TableCell>
                                                    <TableCell>{selectedClient.typeC === 'Société' ? selectedClient.rc : '-'}</TableCell>
                                                </TableRow>
                                            </TableBody>
                                        </Table>
                                    </CardContent>
                                </Card>
                            )}
                        </Grid>

                        <Divider sx={{ my: 3 }} />

                        {/* Section Article */}
                        <Grid item xs={12}>
                            <Typography variant="h6">Sélectionnez un Article</Typography>
                            <FormControl fullWidth margin="normal">
                                <InputLabel>Article Code</InputLabel>
                                <Select
                                    value={articleCode}
                                    onChange={handleArticleChange}
                                    label="Article Code"
                                    required
                                >
                                    {articles.map(article => (
                                        <MenuItem key={article.aref} value={article.aref}>
                                            {article.aref}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                            {selectedArticle && (
                                <Card sx={{ mt: 2 }}>
                                    <CardContent>
                                        <Typography variant="h6">Informations sur les prix</Typography>
                                        <Table>
                                            <TableHead>
                                                <TableRow>
                                                    <TableCell>Référence</TableCell>
                                                    <TableCell>Prix HT</TableCell>
                                                    <TableCell>Marque</TableCell>
                                                    <TableCell>TVA (%)</TableCell>
                                                    <TableCell>Total TTC</TableCell>
                                                    <TableCell>Prix Promo</TableCell>
                                                    <TableCell>Quantité</TableCell>
                                                </TableRow>
                                            </TableHead>
                                            <TableBody>
                                                {getArticleRow()}
                                            </TableBody>
                                        </Table>
                                    </CardContent>
                                </Card>
                            )}
                        </Grid>

                        <Grid item xs={12}>
                            <Button type="submit" variant="contained" color="primary">
                                Enregistrer
                            </Button>
                            <Button variant="contained" color="secondary" onClick={onClose} sx={{ ml: 2 }}>
                                Annuler
                            </Button>
                        </Grid>
                    </Grid>
                </form>
            </Paper>
        </Box>
    );
};

export default AddBonDeCommande;

