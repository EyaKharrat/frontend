import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Button, TextField, Grid, Typography, Box, Paper, IconButton, InputAdornment } from '@mui/material';
import { Add, Remove, Search } from '@mui/icons-material';

const PurchaseOrderForm = () => {
    const [items, setItems] = useState([{ id: Date.now(), name: '', quantity: 1, price: 0 }]);
    const [clientCode, setClientCode] = useState('');
    const [client, setClient] = useState(null);
    const [total, setTotal] = useState(0);
    const [error, setError] = useState('');

    useEffect(() => {
        const storedClient = localStorage.getItem('selectedClient');
        if (storedClient) {
            setClient(JSON.parse(storedClient));
        }
    }, []);

    const handleAddItem = () => {
        setItems([...items, { id: Date.now(), name: '', quantity: 1, price: 0 }]);
    };

    const handleRemoveItem = (id) => {
        setItems(items.filter(item => item.id !== id));
    };

    const handleItemChange = (id, field, value) => {
        setItems(items.map(item =>
            item.id === id ? { ...item, [field]: value } : item
        ));
    };

    const calculateTotal = () => {
        const totalAmount = items.reduce((sum, item) => sum + (item.quantity * item.price), 0);
        setTotal(totalAmount);
    };

    const handleFetchClient = async () => {
        try {
            const response = await axios.get(`https://localhost:7029/api/Tiers/GetTier/${clientCode}`);
            const fetchedClient = response.data;
            localStorage.setItem('selectedClient', JSON.stringify(fetchedClient));
            setClient(fetchedClient);
            setError('');
        } catch (error) {
            console.error('Error fetching client data', error);
            setError('Client not found!');
            setClient(null);
            localStorage.removeItem('selectedClient');
        }
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        calculateTotal();
        // Handle form submission logic here
        alert('Form submitted!');
    };

    return (
        <Box sx={{ padding: 4 }}>
            <Paper sx={{ padding: 4 }}>
                <Typography variant="h5" gutterBottom>Bon de Commande</Typography>
                <form onSubmit={handleSubmit}>
                    <Grid container spacing={3}>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                fullWidth
                                label="Client Code"
                                variant="outlined"
                                value={clientCode}
                                onChange={(e) => setClientCode(e.target.value)}
                                InputProps={{
                                    endAdornment: (
                                        <InputAdornment position="end">
                                            <IconButton onClick={handleFetchClient}>
                                                <Search />
                                            </IconButton>
                                        </InputAdornment>
                                    ),
                                }}
                            />
                        </Grid>
                        {client && (
                            <Grid item xs={12}>
                                <Typography variant="h6">Client Information</Typography>
                                <Typography>Name: {client.cnom} {client.cprenom}</Typography>
                                <Typography>Address: {client.cadresse}, {client.cville}, {client.cpays}, {client.ccodePostal}</Typography>
                                <Typography>Phone: {client.tel}</Typography>
                                {client.typeC === 'Société' && (
                                    <>
                                        <Typography>Raison Sociale: {client.craisonSocial}</Typography>
                                        <Typography>Matricule Fiscale: {client.cmatFiscal}</Typography>
                                        <Typography>RC: {client.rc}</Typography>
                                    </>
                                )}
                            </Grid>
                        )}
                        {items.map((item) => (
                            <Grid item xs={12} key={item.id}>
                                <Paper sx={{ padding: 2, marginBottom: 2 }}>
                                    <Grid container spacing={2}>
                                        <Grid item xs={12} sm={4}>
                                            <TextField
                                                fullWidth
                                                label="Item Name"
                                                variant="outlined"
                                                value={item.name}
                                                onChange={(e) => handleItemChange(item.id, 'name', e.target.value)}
                                                required
                                            />
                                        </Grid>
                                        <Grid item xs={12} sm={3}>
                                            <TextField
                                                fullWidth
                                                label="Quantity"
                                                variant="outlined"
                                                type="number"
                                                value={item.quantity}
                                                onChange={(e) => handleItemChange(item.id, 'quantity', e.target.value)}
                                                InputProps={{
                                                    startAdornment: (
                                                        <InputAdornment position="start">Qty</InputAdornment>
                                                    ),
                                                }}
                                                required
                                            />
                                        </Grid>
                                        <Grid item xs={12} sm={3}>
                                            <TextField
                                                fullWidth
                                                label="Price"
                                                variant="outlined"
                                                type="number"
                                                value={item.price}
                                                onChange={(e) => handleItemChange(item.id, 'price', e.target.value)}
                                                InputProps={{
                                                    startAdornment: (
                                                        <InputAdornment position="start">$</InputAdornment>
                                                    ),
                                                }}
                                                required
                                            />
                                        </Grid>
                                        <Grid item xs={12} sm={2}>
                                            <IconButton
                                                color="error"
                                                onClick={() => handleRemoveItem(item.id)}
                                            >
                                                <Remove />
                                            </IconButton>
                                        </Grid>
                                    </Grid>
                                </Paper>
                            </Grid>
                        ))}
                        <Grid item xs={12}>
                            <Button
                                variant="contained"
                                color="primary"
                                onClick={handleAddItem}
                                startIcon={<Add />}
                            >
                                Add Item
                            </Button>
                        </Grid>
                        <Grid item xs={12}>
                            <Typography variant="h6">Total: ${total.toFixed(2)}</Typography>
                        </Grid>
                        <Grid item xs={12}>
                            <Button type="submit" variant="contained" color="primary">
                                Submit Order
                            </Button>
                        </Grid>
                        {error && (
                            <Grid item xs={12}>
                                <Typography color="error">{error}</Typography>
                            </Grid>
                        )}
                    </Grid>
                </form>
            </Paper>
        </Box>
    );
};

export default PurchaseOrderForm;
