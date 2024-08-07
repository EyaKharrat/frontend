import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { FaUser, FaBuilding, FaArrowRight } from 'react-icons/fa';

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

    const handleClientTypeChange = (type) => {
        setFormData(prevState => ({
            ...prevState,
            typeC: type
        }));
    };

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            let newClient;
            if (recordForEdit) {
                await axios.put(`https://localhost:7029/api/Tiers/UpdateTier/${formData.cref}`, formData);
                alert('Client updated successfully!');
                newClient = formData;
            } else {
                const data = {
                    typeC: formData.typeC,
                    cnom: formData.cnom,
                    cprenom: formData.cprenom,
                    ccin: formData.ccin,
                    fax: formData.fax,
                    tel: formData.tel,
                    cadresse: formData.cadresse,
                    cville: formData.cville,
                    cpays: formData.cpays,
                    ccodePostal: formData.ccodePostal,
                    craisonSocial: formData.craisonSocial,
                    cmatFiscal: formData.cmatFiscal,
                    rc: formData.rc
                };
                const response = await axios.post('https://localhost:7029/api/Tiers/AddTier', data);
                newClient = response.data;
                alert('Client added successfully!');
                navigate('/clientlist');
            }
            addOrEdit(newClient); // Call addOrEdit with the newly added or updated client
            if (onClose) onClose(); // Call onClose if provided
        } catch (error) {
            console.error('There was an error submitting the form!', error);
        }
    };

    return (
        <div className="container mt-3">
            <form onSubmit={handleSubmit}>
                <div className="card">
                    <div className="card-header">
                        <div className="d-flex align-items-center">
                            <FaArrowRight size={20} className="mr-2" />
                            <span>{recordForEdit ? 'Edit Client' : 'Nouveau(-elle) client(e)'}</span>
                        </div>
                    </div>
                    <div className="card-body">
                        <div className="row mb-3">
                            <div className="col text-center">
                                <FaUser 
                                    size={30} 
                                    onClick={() => handleClientTypeChange('Personne Physique')}
                                    className={formData.typeC === 'Personne Physique' ? 'text-primary' : 'text-muted'}
                                    style={{ cursor: 'pointer', marginRight: '20px' }}
                                />
                                <FaBuilding 
                                    size={30} 
                                    onClick={() => handleClientTypeChange('Société')}
                                    className={formData.typeC === 'Société' ? 'text-primary' : 'text-muted'}
                                    style={{ cursor: 'pointer' }}
                                />
                            </div>
                        </div>
                        {formData.typeC && (
                            <>
                                {formData.typeC === 'Personne Physique' && (
                                    <div className="row mb-3">
                                        <div className="col-sm-12">
                                            <div className="card">
                                                <div className="card-body">
                                                    <div className="row mb-3">
                                                        <div className="col">
                                                            <label htmlFor="Cnom">Nom</label>
                                                            <input
                                                                type="text"
                                                                className="form-control"
                                                                id="Cnom"
                                                                name="cnom"
                                                                value={formData.cnom}
                                                                onChange={handleChange}
                                                            />
                                                        </div>
                                                        <div className="col">
                                                            <label htmlFor="Cprenom">Prénom</label>
                                                            <input
                                                                type="text"
                                                                className="form-control"
                                                                id="Cprenom"
                                                                placeholder="Prénom"
                                                                name="cprenom"
                                                                value={formData.cprenom}
                                                                onChange={handleChange}
                                                            />
                                                        </div>
                                                    </div>
                                                    <div className="row mb-3">
                                                        <div className="col">
                                                            <label htmlFor="Ccin">CIN</label>
                                                            <input
                                                                type="text"
                                                                className="form-control"
                                                                id="Ccin"
                                                                placeholder="CIN"
                                                                name="ccin"
                                                                value={formData.ccin}
                                                                onChange={handleChange}
                                                            />
                                                        </div>
                                                        <div className="col">
                                                            <label htmlFor="Fax">Fax</label>
                                                            <input
                                                                type="text"
                                                                className="form-control"
                                                                id="Fax"
                                                                placeholder="Fax"
                                                                name="fax"
                                                                value={formData.fax}
                                                                onChange={handleChange}
                                                            />
                                                        </div>
                                                    </div>
                                                    <div className="mb-3">
                                                        <label htmlFor="Tel">Téléphone Personnel</label>
                                                        <input
                                                            type="text"
                                                            className="form-control"
                                                            id="Tel"
                                                            placeholder="Téléphone Personnel"
                                                            name="tel"
                                                            value={formData.tel}
                                                            onChange={handleChange}
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )}
                                {formData.typeC === 'Société' && (
                                    <div className="row mb-3">
                                        <div className="col-sm-12">
                                            <div className="card">
                                                <div className="card-body">
                                                    <div className="mb-3">
                                                        <label htmlFor="CraisonSocial">Raison Sociale</label>
                                                        <input
                                                            type="text"
                                                            className="form-control"
                                                            id="CraisonSocial"
                                                            placeholder="Raison Sociale"
                                                            name="craisonSocial"
                                                            value={formData.craisonSocial}
                                                            onChange={handleChange}
                                                        />
                                                    </div>
                                                    <div className="row mb-3">
                                                        <div className="col">
                                                            <label htmlFor="CmatFiscal">Matricule Fiscale</label>
                                                            <input
                                                                type="text"
                                                                className="form-control"
                                                                id="CmatFiscal"
                                                                placeholder="Matricule Fiscale"
                                                                name="cmatFiscal"
                                                                value={formData.cmatFiscal}
                                                                onChange={handleChange}
                                                            />
                                                        </div>
                                                        <div className="col">
                                                            <label htmlFor="RC">RC</label>
                                                            <input
                                                                type="text"
                                                                className="form-control"
                                                                id="RC"
                                                                placeholder="RC"
                                                                name="rc"
                                                                value={formData.rc}
                                                                onChange={handleChange}
                                                            />
                                                        </div>
                                                    </div>
                                                    <div className="mb-3">
                                                        <label htmlFor="Tel">Téléphone Bureau</label>
                                                        <input
                                                            type="text"
                                                            className="form-control"
                                                            id="Tel"
                                                            placeholder="Téléphone Bureau"
                                                            name="tel"
                                                            value={formData.tel}
                                                            onChange={handleChange}
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )}
                                <div className="row">
                                    <div className="col-sm-12">
                                        <div className="card">
                                            <div className="card-body">
                                                <div className="row mb-3">
                                                    <div className="col">
                                                        <label htmlFor="Cville">Ville</label>
                                                        <input
                                                            type="text"
                                                            className="form-control"
                                                            id="Cville"
                                                            placeholder="Ville"
                                                            name="cville"
                                                            value={formData.cville}
                                                            onChange={handleChange}
                                                        />
                                                    </div>
                                                    <div className="col">
                                                        <label htmlFor="Cpays">Pays</label>
                                                        <input
                                                            type="text"
                                                            className="form-control"
                                                            id="Cpays"
                                                            placeholder="Pays"
                                                            name="cpays"
                                                            value={formData.cpays}
                                                            onChange={handleChange}
                                                        />
                                                    </div>
                                                </div>
                                                <div className="row mb-3">
                                                    <div className="col">
                                                        <label htmlFor="CodePostal">Code Postal</label>
                                                        <input
                                                            type="text"
                                                            className="form-control"
                                                            id="CodePostal"
                                                            placeholder="Code Postal"
                                                            name="ccodePostal"
                                                            value={formData.ccodePostal}
                                                            onChange={handleChange}
                                                        />
                                                    </div>
                                                    <div className="col">
                                                        <label htmlFor="Adresse">Adresse</label>
                                                        <input
                                                            type="text"
                                                            className="form-control"
                                                            id="Adresse"
                                                            placeholder="Adresse"
                                                            name="cadresse"
                                                            value={formData.cadresse}
                                                            onChange={handleChange}
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </>
                        )}
                    </div>
                    <div className="card-footer text-center">
                        <button type="submit" className="btn btn-primary">
                            {recordForEdit ? 'Update' : 'Add'} Client
                        </button>
                    </div>
                </div>
            </form>
        </div>
    );
};
