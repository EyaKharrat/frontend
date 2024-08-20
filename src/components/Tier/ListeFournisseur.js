import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Dialog, DialogActions, DialogContent, DialogTitle, Button, InputAdornment, TextField } from '@mui/material';
import { AiOutlineUserDelete } from "react-icons/ai";
import { CiEdit } from "react-icons/ci";
import { IoMdPersonAdd } from "react-icons/io";
import { MdPersonSearch } from "react-icons/md";
import axiosInstance from '../../axiosInstance';

const FournisseurList = () => {
    const [fournisseurs, setfournisseurs] = useState([]);
    const [recordForEdit, setRecordForEdit] = useState(null);
    const [open, setOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
        fetchfournisseurs();
    }, []);

    const fetchfournisseurs = async () => {
        try {
            const response = await axios.get('https://localhost:7029/api/Tiers/GetTier');
            setfournisseurs(response.data);
        } catch (error) {
            console.error('Error fetching fournisseurs', error);
        }
    };

    const addOrEdit = (fournisseur) => {
        if (recordForEdit) {
            setfournisseurs(fournisseurs.map(item => (item.cref === fournisseur.cref ? fournisseur : item)));
        } else {
            setfournisseurs([...fournisseurs, fournisseur]);
        }
        handleClose(); // Close the popup after adding or updating
    };

    const handleEdit = (fournisseur) => {
        setRecordForEdit(fournisseur);
        handleClickOpen();
    };

    const handleDelete = async (cref) => {
        try {
            await axiosInstance.delete(`https://localhost:7029/api/Tiers/DeleteTier/${cref}`);
            setfournisseurs(fournisseurs.filter(fournisseur => fournisseur.cref !== cref));
            alert('fournisseur deleted successfully!');
        } catch (error) {
            console.error('Error deleting fournisseur', error);
            alert('There was an error deleting the fournisseur!');
        }
    };

    const handleAction = (fournisseur, action) => {
        if (action === 'edit') {
            handleEdit(fournisseur);
        } else if (action === 'delete') {
            handleDelete(fournisseur.cref);
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

    const filteredfournisseurs = fournisseurs.filter(fournisseur =>
        fournisseur.typeC.toLowerCase().includes(searchQuery.toLowerCase()) ||
        fournisseur.cnom.toLowerCase().includes(searchQuery.toLowerCase()) ||
        fournisseur.cprenom.toLowerCase().includes(searchQuery.toLowerCase()) ||
        fournisseur.cville.toLowerCase().includes(searchQuery.toLowerCase()) ||
        fournisseur.cadresse.toLowerCase().includes(searchQuery.toLowerCase()) ||
        fournisseur.cmatFiscal.toLowerCase().includes(searchQuery.toLowerCase()) ||
        fournisseur.craisonSocial.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '700px', marginBottom: '10px' }}>
                <Button
                    variant="outlined"
                    onClick={handleClickOpen}
                    style={{ height: '40px' }}
                >
                    <IoMdPersonAdd /> Add fournisseur
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
                <DialogTitle>{recordForEdit ? 'Edit fournisseur' : 'Add fournisseur'}</DialogTitle>
                <DialogContent>
                    <fournisseur recordForEdit={recordForEdit} addOrEdit={addOrEdit} />
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
                        <th>Code fournisseur</th>
                        <th>Type de fournisseur</th>
                        <th>Nom Complet</th>
                        <th>Ville</th>
                        <th>Adresse</th>
                        <th>Matricule Fiscale</th>
                        <th>Raison Sociale</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredfournisseurs.map(fournisseur => (
                        <tr key={fournisseur.cref}>
                            <td>{fournisseur.cref}</td>
                            <td>{fournisseur.typeC}</td>
                            <td>{fournisseur.cnom} {fournisseur.cprenom}</td>
                            <td>{fournisseur.cville}</td>
                            <td>{fournisseur.cadresse}</td>
                            <td>{fournisseur.cmatFiscal}</td>
                            <td>{fournisseur.craisonSocial}</td>
                            <td>
                                <div>
                                    <button 
                                        onClick={() => handleAction(fournisseur, 'edit')} 
                                        className="btn btn-warning btn-sm"
                                    >
                                        <CiEdit />
                                    </button>
                                    <button 
                                        onClick={() => handleAction(fournisseur, 'delete')} 
                                        className="btn btn-danger btn-sm"
                                    >
                                        <AiOutlineUserDelete />
                                    </button>
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default FournisseurList;
