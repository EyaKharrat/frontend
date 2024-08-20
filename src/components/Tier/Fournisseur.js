import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaUser, FaBuilding, FaArrowRight } from 'react-icons/fa';
import axiosInstance from '../../axiosInstance';

export const Fournisseur = ({ recordForEdit, addOrEdit, onClose }) => {
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

    const handlefournisseurTypeChange = (type) => {
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
            let newfournisseur;
            if (recordForEdit) {
                await axiosInstance.put(`Tiers/UpdateTier/${formData.cref}`, formData); // Use axiosInstance
                alert('fournisseur updated successfully!');
                newfournisseur = formData;
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
                const response = await axiosInstance.post('Tiers/AddTier', data); // Use axiosInstance
                newfournisseur = response.data;
                alert('fournisseur added successfully!');
                navigate('/fournisseurlist');
            }
            addOrEdit(newfournisseur); // Call addOrEdit with the newly added or updated fournisseur
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
                            <span>{recordForEdit ? 'Edit fournisseur' : 'Nouveau(-elle) fournisseur(e)'}</span>
                        </div>
                    </div>
                    <div className="card-body">
                        <div className="row mb-3">
                            <div className="col text-center">
                                <FaUser 
                                    size={30} 
                                    onClick={() => handlefournisseurTypeChange('Personne Physique')}
                                    className={formData.typeC === 'Personne Physique' ? 'text-primary' : 'text-muted'}
                                    style={{ cursor: 'pointer', marginRight: '20px' }}
                                />
                                <FaBuilding 
                                    size={30} 
                                    onClick={() => handlefournisseurTypeChange('Société')}
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
                                                                placeholder="nom"
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
                                                    <div className="mb-3">
                                                        <label htmlFor="Tel">Téléphone</label>
                                                        <input
                                                            type="text"
                                                            className="form-control"
                                                            id="Tel"
                                                            placeholder="Téléphone"
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
                            </>
                        )}
                    </div>
                    <div className="card-footer text-right">
                        <button type="submit" className="btn btn-primary">
                            {recordForEdit ? 'Update fournisseur' : 'Ajouter fournisseur'}
                        </button>
                    </div>
                </div>
            </form>
        </div>
    );
};
