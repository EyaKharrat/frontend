// src/components/OrderForm.js
import React, { useState, useEffect } from 'react';
import { Autocomplete, TextField, Typography, Paper, Box } from '@mui/material';
import { fetchClients } from './components/Tier/clientService';

const OrderForm = ({ onSelectClient }) => {
    const [clients, setClients] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedClient, setSelectedClient] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await fetchClients();
                console.log("Fetched clients:", data);
                setClients(data);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching clients', error);
                setError('Failed to load clients');
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    const handleSelectClient = (event, value) => {
        if (!onSelectClient) {
            console.error('onSelectClient is not defined');
            return;
        }

        // Find the selected client from the list
        const client = clients.find(client => client.cref === value);
        setSelectedClient(client);
        onSelectClient(client);
    };

    return (
        <div>
            {loading && <p>Loading...</p>}
            {error && <p>Error: {error}</p>}
            
            <Autocomplete
                options={clients.map(client => client.cref)}
                onChange={handleSelectClient}
                renderInput={(params) => (
                    <TextField
                        {...params}
                        label="Sélectionner un Client"
                        variant="outlined"
                        required
                    />
                )}
                sx={{ mb: 2 }}
            />
            
            {selectedClient && (
                <Box mt={2} p={2} component={Paper} elevation={3}>
                    <Typography variant="h6" gutterBottom>Client Details</Typography>
                    <Typography><strong>Reference:</strong> {selectedClient.cref}</Typography>
                    <Typography><strong>Type:</strong> {selectedClient.typeC}</Typography>
                    <Typography><strong>Nom:</strong> {selectedClient.cnom} {selectedClient.cprenom}</Typography>
                    <Typography><strong>Adresse:</strong> {selectedClient.cadresse}</Typography>
                    <Typography><strong>Ville:</strong> {selectedClient.cville}</Typography>
                    <Typography><strong>Code Postal:</strong> {selectedClient.ccodePostal}</Typography>
                    <Typography><strong>Pays:</strong> {selectedClient.cpays}</Typography>
                    <Typography><strong>Raison Sociale:</strong> {selectedClient.craisonSocial}</Typography>
                    {/* Add other details as needed */}
                </Box>
            )}
        </div>
    );
};

export default OrderForm;
