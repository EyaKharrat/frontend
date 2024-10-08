import React, { useState, useEffect } from 'react';
import { Dialog, DialogActions, DialogContent, DialogTitle, Button, TextField, IconButton, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import { IoMdPersonAdd } from "react-icons/io";
import { MdPersonSearch } from "react-icons/md";
import { fetchfournisseurs, deletefournisseur } from './fournisseurService';
import { Fournisseur } from './Fournisseur';
import { AiOutlineUserDelete } from "react-icons/ai";
import { FaUserEdit } from "react-icons/fa";

const FournisseurList = () => {
    const [fournisseurs, setfournisseurs] = useState([]);
    const [recordForEdit, setRecordForEdit] = useState(null);
    const [open, setOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
        fetchfournisseursList();
    }, []);

    const fetchfournisseursList = async () => {
        try {
            const data = await fetchfournisseurs();
            setfournisseurs(data);
        } catch (error) {
            console.error('Erreur lors de la récupération des fournisseurs', error);
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
            await deletefournisseur(cref);
            setfournisseurs(fournisseurs.filter(fournisseur => fournisseur.cref !== cref));
            alert('Fournisseur supprimé avec succès!');
        } catch (error) {
            console.error('Erreur lors de la suppression du fournisseur', error);
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
        <div style={{ padding: '20px' }}>
            <div style={{ display: 'flex', alignItems: 'center', marginBottom: '20px' }}>
                <Button
                    variant="contained"
                    color="primary"
                    startIcon={<IoMdPersonAdd />}
                    onClick={handleClickOpen}
                    style={{ marginRight: '20px' }}
                >
                    Ajouter fournisseur
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
                        {filteredfournisseurs.map((fournisseur) => (
                            <TableRow key={fournisseur.cref}>
                                <TableCell>{fournisseur.cref}</TableCell>
                                <TableCell>{fournisseur.typeC}</TableCell>
                                <TableCell>{fournisseur.cnom} {fournisseur.cprenom}</TableCell>
                                <TableCell>{fournisseur.cadresse}</TableCell>
                                <TableCell>{fournisseur.cville}</TableCell>
                                <TableCell>{fournisseur.ccodePostal}</TableCell>
                                <TableCell>{fournisseur.cpays}</TableCell>
                                <TableCell>{fournisseur.craisonSocial}</TableCell>
                                <TableCell>
                                    <Button onClick={() => handleAction(fournisseur, 'edit')} color="primary"><FaUserEdit /></Button>
                                    <Button onClick={() => handleAction(fournisseur, 'delete')} color="secondary"><AiOutlineUserDelete /></Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

            <Dialog open={open} onClose={handleClose}>
            <DialogTitle>{recordForEdit ? 'Modifier fournisseur' : 'Ajouter fournisseur'}</DialogTitle>
                <DialogContent>
                    <Fournisseur
                        recordForEdit={recordForEdit}
                        addOrEdit={addOrEdit}
                        onClose={handleClose}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Fermer</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
};

export default FournisseurList;
