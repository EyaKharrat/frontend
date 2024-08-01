import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Client } from './Client';
import { Dialog, DialogActions, DialogContent, DialogTitle, Button, InputAdornment, TextField } from '@mui/material';
import { AiOutlineUserDelete } from "react-icons/ai";
import { CiEdit } from "react-icons/ci";
import { IoMdPersonAdd } from "react-icons/io";
import { MdPersonSearch } from "react-icons/md";

const ClientList = () => {
    const [clients, setClients] = useState([]);
    const [recordForEdit, setRecordForEdit] = useState(null);
    const [open, setOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');

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
        handleClose(); // Close the popup after adding or updating
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
        <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '700px', marginBottom: '10px' }}>
                <Button
                    variant="outlined"
                    onClick={handleClickOpen}
                    style={{  height: '40px' }}
                >
                    <IoMdPersonAdd /> Add Client
                </Button>
                <TextField
                    variant="outlined"
                    placeholder="Search"
                    value={searchQuery}
                    onChange={handleSearch}
                    style={{ flex: 1, height: '40px' }}
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <MdPersonSearch />
                            </InputAdornment>
                        ),
                    }}
                />
            </div>
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
                        <th>Nom Complet</th>
                        <th>Ville</th>
                        <th>Adresse</th>
                        <th>Matricule Fiscale</th>
                        <th>Raison Sociale</th>
                        <th>Modifier</th>
                        <th>Supprimer</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredClients.map(client => (
                        <tr key={client.cref}>
                            <td>{client.cref}</td>
                            <td>{client.typeC}</td>
                            <td>{client.cnom} {client.cprenom}</td>
                            <td>{client.cville}</td>
                            <td>{client.cadresse}</td>
                            <td>{client.cmatFiscal}</td>
                            <td>{client.craisonSocial}</td>
                            <td>
                                <button onClick={() => handleEdit(client)} className="btn btn-warning btn-sm mr-2"><CiEdit /></button>
                            </td>
                            <td>
                                <button onClick={() => handleDelete(client.cref)} className="btn btn-danger btn-sm"><AiOutlineUserDelete /></button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default ClientList;
