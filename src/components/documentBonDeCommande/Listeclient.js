import React, { useState, useEffect } from 'react';
import axiosInstance from '../../axiosInstance';
import { FormControl, InputLabel, Select, MenuItem, Card, CardContent, Typography, Table, TableHead, TableRow, TableCell, TableBody } from '@mui/material';

const ListeClient = ({ clientCode, setClientCode, selectedClient, setSelectedClient }) => {
    const [clients, setClients] = useState([]);

    useEffect(() => {
        const fetchClients = async () => {
            try {
                const response = await axiosInstance.get('https://localhost:7029/api/Tiers/GetTier');
                setClients(response.data);
            } catch (error) {
                console.error('Erreur lors de la récupération des clients:', error);
                setSelectedClient(null);
            }
        };
        fetchClients();
    }, [setSelectedClient]); // Ajouter setSelectedClient aux dépendances

    const handleClientChange = async (event) => {
        const selectedCode = event.target.value;
        setClientCode(selectedCode);

        try {
            const response = await axiosInstance.get(`https://localhost:7029/api/Tiers/GetTier/${selectedCode}`);
            setSelectedClient(response.data);
        } catch (error) {
            console.error('Erreur lors de la récupération des détails du client:', error);
            setSelectedClient(null);
        }
    };

    return (
        <div>
            <Typography variant="h6">Sélectionnez un Client</Typography>
            <FormControl fullWidth margin="normal">
                <InputLabel>Code Client</InputLabel>
                <Select
                    value={clientCode}
                    onChange={handleClientChange}
                    label="Code Client"
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
        </div>
    );
};

export default ListeClient;
