import React, { useState, useEffect } from 'react';
import axios from 'axios';

export const Client = ({ recordForEdit, addOrEdit, onClose }) => {
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

    const handleClientTypeChange = (event) => {
        const { value } = event.target;
        setFormData(prevState => ({
            ...prevState,
            typeC: value 
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
                console.log("this is my form data",formData)
                let data = {
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
                    cmatFiscal:formData.cmatFiscal,
                    rc: formData.rc
                }
                const response = await axios.post('https://localhost:7029/api/Tiers/AddTier', data);
                newClient = response.data;
                alert('Client added successfully!');
            }
            addOrEdit(newClient); // Appeler addOrEdit avec le client ajouté ou mis à jour
        } catch (error) {
            console.error('There was an error submitting the form!', error);
            alert('There was an error submitting the form!');
        }
    };

    return (
        <div className="container mt-3">
            <form onSubmit={handleSubmit}>
                <div className="card">
                    <div className="card-header">
                        {recordForEdit ? 'Edit Client' : 'Client'}
                    </div>
                    <div className="card-body">
                        <div className="row">
                            <div className="col-sm-6 mb-3">
                                <div className="card">
                                    <div className="card-body">
                                        <div className="mb-3">
                                            <label htmlFor="TypeC">Type de Client</label>
                                            <select
                                                className="form-control"
                                                id="TypeC"
                                                name="typeC"
                                                value={formData.typeC}
                                                onChange={handleClientTypeChange}
                                            >
                                                <option value=""></option>
                                                <option value="Personne Physique">Personne Physique</option>
                                                <option value="Société">Société</option>
                                            </select>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-sm-6 mb-3">
                                <div className="card">
                                    <div className="card-body">
                                        <div className="mb-3">
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
                                        <div className="mb-3">
                                            <label htmlFor="Cpays">Gouvernorat</label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                id="Cpays"
                                                placeholder="Gouvernorat"
                                                name="cpays"
                                                value={formData.cpays}
                                                onChange={handleChange}
                                            />
                                        </div>
                                        <div className="mb-3">
                                            <label htmlFor="Cadresse">Adresse</label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                id="Cadresse"
                                                placeholder="Adresse"
                                                name="cadresse"
                                                value={formData.cadresse}
                                                onChange={handleChange}
                                            />
                                        </div>
                                        <div className="mb-3">
                                            <label htmlFor="CcodePostal">Code Postal</label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                id="CcodePostal"
                                                placeholder="Code Postal"
                                                name="ccodePostal"
                                                value={formData.ccodePostal}
                                                onChange={handleChange}
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {formData.typeC === 'Personne Physique' && (
                            <div className="row mt-3">
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
                            <div className="row mt-3">
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
                                                    <label htmlFor="Rc">Registre de Commerce</label>
                                                    <input
                                                        type="text"
                                                        className="form-control"
                                                        id="Rc"
                                                        placeholder="Registre de Commerce"
                                                        name="rc"
                                                        value={formData.rc}
                                                        onChange={handleChange}
                                                    />
                                                </div>
                                            </div>
                                            <div className="mb-3">
                                                <label htmlFor="Tel">Téléphone de la Société</label>
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    id="Tel"
                                                    placeholder="Téléphone de la Société"
                                                    name="tel"
                                                    value={formData.tel}
                                                    onChange={handleChange}
                                                />
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
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
                <div className="card-footer">
                    <button type="submit" className="btn btn-primary">
                        {recordForEdit ? 'Update' : 'Submit'}
                    </button>
                </div>
            </form>
        </div>
    );
};
