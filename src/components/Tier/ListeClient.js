import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Client } from './Client';
import { Dialog, DialogActions, DialogContent, DialogTitle, Button } from '@mui/material';

const ClientList = () => {
    const [clients, setClients] = useState([]);
    const [recordForEdit, setRecordForEdit] = useState(null);
    const [open, setOpen] = useState(false);
    

    useEffect(() => {
        fetchClients();
    }, []);

    const fetchClients = async () => {
        try {
            const response = await axios.get('https://localhost:7029/api/Tiers/GetTier');
            setClients(response.data);
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
        handleClose(); // Fermer le popup après l'ajout ou la mise à jour
    };

    const handleEdit = (client) => {
        setRecordForEdit(client);
        handleClickOpen();
    };

    const handleDelete = async (cref) => {
        try {
            await axios.delete(`https://localhost:7029/api/Tiers/DeleteTier/${cref}`);
            setClients(clients.filter(client => client.cref !== cref));
            alert('Client deleted successfully!');
        } catch (error) {
            console.error('Error deleting client', error);
            alert('There was an error deleting the client!');
        }
    };

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        setRecordForEdit(null);
    };

    return (
        <div>
            <Button variant="outlined" onClick={handleClickOpen}>
                Add Client
            </Button>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>{recordForEdit ? 'Edit Client' : 'Add Client'}</DialogTitle>
                <DialogContent>
                    <Client recordForEdit={recordForEdit} addOrEdit={addOrEdit} />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        Cancel
                    </Button>
                </DialogActions>
            </Dialog>
            <table className="table mt-3">
                <thead>
                    <tr>
                        <th>Code Client</th>
                        <th>Type de Client</th>
                        <th>Nom</th>
                        <th>Prénom</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {clients.map(client => (
                        <tr key={client.cref}>
                            <td>{client.cref}</td>
                            <td>{client.typeC}</td>
                            <td>{client.cnom}</td>
                            <td>{client.cprenom}</td>
                            <td>
                                <button onClick={() => handleEdit(client)} className="btn btn-warning btn-sm mr-2">Edit</button>
                                <button onClick={() => handleDelete(client.cref)} className="btn btn-danger btn-sm">Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default ClientList;
