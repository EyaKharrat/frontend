import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, TextField, FormControl, FormControlLabel, RadioGroup, Radio, FormLabel, Card, CardContent, CardActions, Typography } from '@mui/material';
import { addClient, updateClient } from './clientService'; 

export const Client = ({ recordForEdit, addOrEdit, onClose }) => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        cref: '',
        typeC: '',
        cnom: '',
        cprenom: '',
        ccin: '',
        fax: '',
        tel: '',
        cadresse: '',
        cville: '',
        cpays: '',
        ccodePostal: '',
        craisonSocial: '',
        cmatFiscal: '',
        rc: ''
    });

    const [errors, setErrors] = useState({});

    useEffect(() => {
        if (recordForEdit) {
            setFormData(recordForEdit);
        } else {
            setFormData({
                cref: '',
                typeC: '',
                cnom: '',
                cprenom: '',
                ccin: '',
                fax: '',
                tel: '',
                cadresse: '',
                cville: '',
                cpays: '',
                ccodePostal: '',
                craisonSocial: '',
                cmatFiscal: '',
                rc: ''
            });
        }
    }, [recordForEdit]);

    const handleClientTypeChange = (event) => {
        setFormData(prevState => ({
            ...prevState,
            typeC: event.target.value
        }));
    };

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const validate = () => {
        let tempErrors = {};

        if (!formData.typeC) tempErrors.typeC = "Veuillez sélectionner un type de client.";
        if (formData.typeC === 'Personne Physique') {
            if (!formData.cnom) tempErrors.cnom = "Le nom est requis.";
            if (!formData.cprenom) tempErrors.cprenom = "Le prénom est requis.";
            if (!formData.ccin) tempErrors.ccin = "Le CIN est requis.";
            if (!formData.fax) tempErrors.fax = "Le fax est requis.";
        } else if (formData.typeC === 'Société') {
            if (!formData.craisonSocial) tempErrors.craisonSocial = "La raison sociale est requise.";
            if (!formData.cmatFiscal) tempErrors.cmatFiscal = "Le matricule fiscal est requis.";
            if (!formData.rc) tempErrors.rc = "Le numéro RC est requis.";
        }

        if (!formData.tel) tempErrors.tel = "Le téléphone est requis.";
        if (!formData.cadresse) tempErrors.cadresse = "L'adresse est requise.";
        if (!formData.cville) tempErrors.cville = "La ville est requise.";
        if (!formData.cpays) tempErrors.cpays = "Le pays est requis.";
        if (!formData.ccodePostal) tempErrors.ccodePostal = "Le code postal est requis.";

        setErrors(tempErrors);

        return Object.keys(tempErrors).length === 0;
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
    
        if (!validate()) return;
    
        try {
            const { cref, ...dataToSend } = formData;
            
            if (recordForEdit) {
                await updateClient(cref, formData);
                alert('Client updated successfully!');
            } else {
                await addClient(dataToSend);
                alert('Client added successfully!');
                navigate('/clientlist');
            }
            addOrEdit(formData);
            if (onClose) onClose();
        } catch (error) {
            console.error('There was an error submitting the form!', error);
        }
    };

    return (
        <div className="container mt-3">
            <Card>
                <CardContent>
                    <Typography variant="h6" component="div" sx={{ mb: 2 }}>
                        {recordForEdit ? 'Edit Client' : 'Nouveau(-elle) client(e)'}
                    </Typography>
                    <FormControl component="fieldset" error={Boolean(errors.typeC)}>
                        <FormLabel component="legend">Type de Client</FormLabel>
                        <RadioGroup
                            row
                            name="typeC"
                            value={formData.typeC}
                            onChange={handleClientTypeChange}
                        >
                            <FormControlLabel 
                                value="Personne Physique"
                                control={<Radio />} 
                                label="Personne Physique" 
                            />
                            <FormControlLabel 
                                value="Société"
                                control={<Radio />} 
                                label="Société" 
                            />
                        </RadioGroup>
                        {errors.typeC && <Typography color="error">{errors.typeC}</Typography>}
                    </FormControl>
                    {formData.typeC === 'Personne Physique' && (
                        <div>
                            <TextField
                                label="Nom"
                                name="cnom"
                                value={formData.cnom}
                                onChange={handleChange}
                                fullWidth
                                margin="normal"
                                error={Boolean(errors.cnom)}
                                helperText={errors.cnom}
                            />
                            <TextField
                                label="Prénom"
                                name="cprenom"
                                value={formData.cprenom}
                                onChange={handleChange}
                                fullWidth
                                margin="normal"
                                error={Boolean(errors.cprenom)}
                                helperText={errors.cprenom}
                            />
                            <TextField
                                label="CIN"
                                name="ccin"
                                value={formData.ccin}
                                onChange={handleChange}
                                fullWidth
                                margin="normal"
                                error={Boolean(errors.ccin)}
                                helperText={errors.ccin}
                            />
                            <TextField
                                label="Fax"
                                name="fax"
                                value={formData.fax}
                                onChange={handleChange}
                                fullWidth
                                margin="normal"
                                error={Boolean(errors.fax)}
                                helperText={errors.fax}
                            />
                            <TextField
                                label="Téléphone Personnel"
                                name="tel"
                                value={formData.tel}
                                onChange={handleChange}
                                fullWidth
                                margin="normal"
                                error={Boolean(errors.tel)}
                                helperText={errors.tel}
                            />
                        </div>
                    )}
                    {formData.typeC === 'Société' && (
                        <div>
                            <TextField
                                label="Raison Sociale"
                                name="craisonSocial"
                                value={formData.craisonSocial}
                                onChange={handleChange}
                                fullWidth
                                margin="normal"
                                error={Boolean(errors.craisonSocial)}
                                helperText={errors.craisonSocial}
                            />
                            <TextField
                                label="Matricule Fiscale"
                                name="cmatFiscal"
                                value={formData.cmatFiscal}
                                onChange={handleChange}
                                fullWidth
                                margin="normal"
                                error={Boolean(errors.cmatFiscal)}
                                helperText={errors.cmatFiscal}
                            />
                            <TextField
                                label="RC"
                                name="rc"
                                value={formData.rc}
                                onChange={handleChange}
                                fullWidth
                                margin="normal"
                                error={Boolean(errors.rc)}
                                helperText={errors.rc}
                            />
                            <TextField
                                label="Téléphone Bureau"
                                name="tel"
                                value={formData.tel}
                                onChange={handleChange}
                                fullWidth
                                margin="normal"
                            />
                        </div>
                    )}
                    <TextField
                        label="Adresse"
                        name="cadresse"
                        value={formData.cadresse}
                        onChange={handleChange}
                        fullWidth
                        margin="normal"
                        error={Boolean(errors.cadresse)}
                        helperText={errors.cadresse}
                    />
                    <TextField
                        label="Ville"
                        name="cville"
                        value={formData.cville}
                        onChange={handleChange}
                        fullWidth
                        margin="normal"
                        error={Boolean(errors.cville)}
                        helperText={errors.cville}
                    />
                    <TextField
                        label="Délegation"
                        name="cpays"
                        value={formData.cpays}
                        onChange={handleChange}
                        fullWidth
                        margin="normal"
                        error={Boolean(errors.cpays)}
                        helperText={errors.cpays}
                    />
                    <TextField
                        label="Code Postal"
                        name="ccodePostal"
                        value={formData.ccodePostal}
                        onChange={handleChange}
                        fullWidth
                        margin="normal"
                        error={Boolean(errors.ccodePostal)}
                        helperText={errors.ccodePostal}
                    />
                </CardContent>
                <CardActions>
                    <Button 
                        variant="contained" 
                        color="primary" 
                        onClick={handleSubmit}
                        fullWidth
                    >
                        {recordForEdit ? 'Update' : 'Add'} Client
                    </Button>
                    <Button 
                        variant="outlined" 
                        color="secondary" 
                        onClick={onClose} 
                        fullWidth
                    >
                        Cancel
                    </Button>
                </CardActions>
            </Card>
        </div>
    );
};
