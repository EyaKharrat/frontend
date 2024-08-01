import React, { useState } from 'react';
import axios from 'axios';
import DetailBonCommande from './DocumentDetail';
const Addbondecommande = ({ recordForEdit, addOrEdit, onClose }) => {
    const [formData, setFormData] = useState({
        docAnnee: '',
        docType: '',
        docRef: '',
        docDate: '',
        docTiers: '',
        docDateEcheance: '',
        docRefExt: '',
        docNumDoc: '',
        docCommentaire: '',
        docLancement: '',
        docCloture: ''
    });
    const [detailData] = useState({
        docType: "",
        docRef: "",
        docArt: "",
        docPunit: 0,
        docQte: 0,
        docRemise: 0,
        docTotalHt: 0,
        docTxTva: 0,
        docTotalTva: 0,
        docTotalTtc: 0,
        docRemiseTotale: 0,
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };
    const handleDetailSave = async (detailFormData) => {
        try {
            const response = await axios.post('https://localhost:7029/api/DocumentDetailCommandes', detailFormData);
            console.log('Response:', response);
            if (response.data.uniqueId) {
                alert("Data Saved Successfully");
            } else {
                alert('Data not Saved');
            }
        } catch (error) {
            console.error('There was an error!', error);
            alert('There was an error!');
        }
    };
    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const payload = { ...formData };
            const response = await axios.post('https://localhost:7029/api/DocumentBonCommandes', payload);
            console.log('Response:', response);
            if (response.data.uniqueId) {
                alert("Data Saved Successfully");
            } else {
                alert('Data not Saved');
            }
        } catch (error) {
            console.error('There was an error!', error);
            alert('There was an error!');
        }
    };

    return (
        <div className="container">
            <div className="card mb-3">
                <div className="card-body">
                    <h5 className="card-title">Document Bon de Commande</h5>
                    <form onSubmit={handleSubmit}>
                        <div className="row">
                            <div className="col-md-6">
                                <div className="form-group">
                                    <label htmlFor="docNumDoc">Num Document:</label>
                                    <input
                                        type="text"
                                        className="form-control form-control-sm"
                                        name="docNumDoc"
                                        id="docNumDoc"
                                        placeholder="Num Doc"
                                        value={formData.docNumDoc}
                                        onChange={handleChange}
                                    />
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className="form-group">
                                    <label htmlFor="docAnnee">Année:</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        name="docAnnee"
                                        id="docAnnee"
                                        placeholder="Année"
                                        value={formData.docAnnee}
                                        onChange={handleChange}
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-6">
                                <div className="form-group">
                                    <label htmlFor="docLancement">Date Lancement:</label>
                                    <input
                                        type="date"
                                        className="form-control"
                                        name="docLancement"
                                        id="docLancement"
                                        value={formData.docLancement}
                                        onChange={handleChange}
                                    />
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className="form-group">
                                    <label htmlFor="docCloture">Date Cloture:</label>
                                    <input
                                        type="date"
                                        className="form-control"
                                        name="docCloture"
                                        id="docCloture"
                                        value={formData.docCloture}
                                        onChange={handleChange}
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="form-group">
                            <label htmlFor="docTiers">Tiers:</label>
                            <select
                                className="form-control"
                                name="docTiers"
                                id="docTiers"
                                value={formData.docTiers}
                                onChange={handleChange}
                            >
                                <option value="">Select Type</option>
                                <option value="Client">Client</option>
                                <option value="Fournisseur">Fournisseur</option>
                                <option value="Representant">Representant</option>
                            </select>
                        </div>
                        <div className="row">
                            <div className="col-md-6">
                                <div className="form-group">
                                    <label htmlFor="docRef">Ref:</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        name="docRef"
                                        id="docRef"
                                        placeholder="Ref"
                                        value={formData.docRef}
                                        onChange={handleChange}
                                    />
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className="form-group">
                                    <label htmlFor="docRefExt">Ref Ext:</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        name="docRefExt"
                                        id="docRefExt"
                                        placeholder="Ref Ext"
                                        value={formData.docRefExt}
                                        onChange={handleChange}
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-6">
                                <div className="form-group">
                                    <label htmlFor="docDate">Date Début:</label>
                                    <input
                                        type="date"
                                        className="form-control"
                                        name="docDate"
                                        id="docDate"
                                        value={formData.docDate}
                                        onChange={handleChange}
                                    />
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className="form-group">
                                    <label htmlFor="docDateEcheance">Date Echéance:</label>
                                    <input
                                        type="date"
                                        className="form-control"
                                        name="docDateEcheance"
                                        id="docDateEcheance"
                                        value={formData.docDateEcheance}
                                        onChange={handleChange}
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="form-group">
                            <label htmlFor="docType">Doc Type:</label>
                            <select
                                className="form-control"
                                name="docType"
                                id="docType"
                                value={formData.docType}
                                onChange={handleChange}
                            >
                                <option value="">Select Type Document</option>
                                <option value="Bon De Commande">Bon De Commande</option>
                                <option value="Bon de livraison">Bon de livraison</option>
                                <option value="Bon d'entrée">Bon d'entrée</option>
                            </select>
                        </div>
                        <div className="form-group">
                            <label htmlFor="docCommentaire">Doc Commentaire:</label>
                            <textarea
                                className="form-control"
                                name="docCommentaire"
                                id="docCommentaire"
                                placeholder="Doc Commentaire"
                                value={formData.docCommentaire}
                                onChange={handleChange}
                            />
                        </div>
                        <button type="submit" className="btn btn-primary">Submit</button>
                    </form>
                </div>
            </div>

            {/* Second card below the form card */}
            <div className="card mb-3">
                <div className="card-body">
                    <h5 className="card-title">Second Card</h5>
                    <div className="mb-3">
                    <DetailBonCommande
                initialData={detailData}
                onSave={handleDetailSave}
            />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Addbondecommande;
