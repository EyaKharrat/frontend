import React, { useState, useEffect } from 'react';
import { Dialog, DialogActions, DialogContent, DialogTitle, Button, TextField, IconButton, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import { IoMdPersonAdd } from "react-icons/io";
import { MdPersonSearch } from "react-icons/md";
import { fetchClients, deleteClient } from './clientService';
import { Client } from './Client';

const ClientList = () => {
    const [clients, setClients] = useState([]);
    const [recordForEdit, setRecordForEdit] = useState(null);
    const [open, setOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
        fetchClientsList();
    }, []);

    const fetchClientsList = async () => {
        try {
            const data = await fetchClients();
            setClients(data);
        } catch (error) {
            console.error('Error fetching clients', error);
        }
    };

    const addOrEdit = (client) => {
        if (recordForEdit) {
            setClients(clients.map(item => (item.cref === client.cref ? client : item)));
        } else {
            setClients([...clients, client]);
        }
        handleClose(); // Close the popup after adding or updating
    };

    const handleEdit = (client) => {
        setRecordForEdit(client);
        handleClickOpen();
    };

    const handleDelete = async (cref) => {
        try {
            await deleteClient(cref);
            setClients(clients.filter(client => client.cref !== cref));
            alert('Client deleted successfully!');
        } catch (error) {
            console.error('Error deleting client', error);
            alert('There was an error deleting the client!');
        }
    };

    const handleAction = (client, action) => {
        if (action === 'edit') {
            handleEdit(client);
        } else if (action === 'delete') {
            handleDelete(client.cref);
        }
    };

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        setRecordForEdit(null);
    };

    const handleSearch = (event) => {
        setSearchQuery(event.target.value);
    };

    const filteredClients = clients.filter(client =>
        client.typeC.toLowerCase().includes(searchQuery.toLowerCase()) ||
        client.cnom.toLowerCase().includes(searchQuery.toLowerCase()) ||
        client.cprenom.toLowerCase().includes(searchQuery.toLowerCase()) ||
        client.cville.toLowerCase().includes(searchQuery.toLowerCase()) ||
        client.cadresse.toLowerCase().includes(searchQuery.toLowerCase()) ||
        client.cmatFiscal.toLowerCase().includes(searchQuery.toLowerCase()) ||
        client.craisonSocial.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div style={{ padding: '20px' }}>
            <div style={{ display: 'flex', alignItems: 'center', marginBottom: '20px' }}>
                <Button
                    variant="contained"
                    color="primary"
                    startIcon={<IoMdPersonAdd />}
                    onClick={handleClickOpen}
                    style={{ marginRight: '20px' }}
                >
                    Add Client
                </Button>
                <div style={{ flexGrow: 1 }}>
                    <TextField
                        variant="outlined"
                        placeholder="Search"
                        value={searchQuery}
                        onChange={handleSearch}
                        fullWidth
                        InputProps={{
                            startAdornment: (
                                <IconButton>
                                    <MdPersonSearch />
                                </IconButton>
                            ),
                        }}
                    />
                </div>
            </div>

            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Ref</TableCell>
                            <TableCell>Type</TableCell>
                            <TableCell>Nom et Prénom</TableCell>
                            <TableCell>Adresse</TableCell>
                            <TableCell>Ville</TableCell>
                            <TableCell>Code Postal</TableCell>
                            <TableCell>Pays</TableCell>
                            <TableCell>Raison Sociale</TableCell>
                            <TableCell>Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {filteredClients.map((client) => (
                            <TableRow key={client.cref}>
                                <TableCell>{client.cref}</TableCell>
                                <TableCell>{client.typeC}</TableCell>
                                <TableCell>{client.cnom} {client.cprenom}</TableCell>
                                <TableCell>{client.cadresse}</TableCell>
                                <TableCell>{client.cville}</TableCell>
                                <TableCell>{client.ccodePostal}</TableCell>
                                <TableCell>{client.cpays}</TableCell>
                                <TableCell>{client.craisonSocial}</TableCell>
                                <TableCell>
                                    <Button onClick={() => handleAction(client, 'edit')} color="primary">Edit</Button>
                                    <Button onClick={() => handleAction(client, 'delete')} color="secondary">Delete</Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>{recordForEdit ? 'Edit Client' : 'Add Client'}</DialogTitle>
                <DialogContent>
                    <Client
                        recordForEdit={recordForEdit}
                        addOrEdit={addOrEdit}
                        onClose={handleClose}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Close</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
};

export default ClientList;
