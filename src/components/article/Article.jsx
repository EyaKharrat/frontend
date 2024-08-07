import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const initialFieldValues = {
    adesignation: '',
    afamille: '',
    asfamille: '',
    image: '',
    apuventeHt: '',
    atauxTva: 19, // TVA fixe à 19%
    aremise: '',
    amarge: '',
    auniteVnt: '',
    apvttc: '',
    aqteStock:'',
    aprixVntprom: ''
};

export const Article = ({ recordForEdit, addOrEdit, onClose }) => {
    const navigate = useNavigate();
    const [values, setValues] = useState(initialFieldValues);
    const [errors, setErrors] = useState({});
    const [imagePreview, setImagePreview] = useState('/img/up.jpg');
    const [loading, setLoading] = useState(false);
    const [step, setStep] = useState(1);
    
    useEffect(() => {
        if (recordForEdit) {
            setValues({
                adesignation: recordForEdit.adesignation || '',
                afamille: recordForEdit.afamille || '',
                asfamille: recordForEdit.asfamille || '',
                image: recordForEdit.image || '',
                apuventeHt: recordForEdit.apuventeHt || '',
                atauxTva: recordForEdit.atauxTva || 19,
                amarge: recordForEdit.amarge || '',
                apvttc: recordForEdit.apvttc || '',
                aremise: recordForEdit.aremise || '',
                aprixVntprom: recordForEdit.aprixVntprom || '',
                auniteVnt: recordForEdit.auniteVnt || '',
                aqteStock: recordForEdit.aqteStock || '',
            });
            setImagePreview(recordForEdit.image || '/img/up.jpg');
        } else {
            setValues(initialFieldValues);
            setImagePreview('/img/up.jpg');
        }
    }, [recordForEdit]);

    const calculateValues = (apuventeHt, amarge, apvttc, aremise,auniteVnt) => {
        let priceAfterDiscount = '';

        if (apuventeHt) {
            const priceHt = parseFloat(apuventeHt);
            const tvaRate = 19 / 100;
            apvttc = priceHt * (1 + tvaRate);

            const marge = parseFloat(amarge) / 100;
            auniteVnt = priceHt * (1 + marge);
        }

        if (auniteVnt && aremise) {
            const remise = parseFloat(aremise) / 100;
            priceAfterDiscount = auniteVnt - (auniteVnt * remise);
        }

        return { apvttc, auniteVnt, priceAfterDiscount };
    };

    useEffect(() => {
        const { apvttc, auniteVnt, priceAfterDiscount } = calculateValues(values.apuventeHt, values.amarge, values.apvttc, values.aremise);
        setValues(prev => ({
            ...prev,
            apvttc: apvttc,
            aprixVntprom: priceAfterDiscount,
            auniteVnt: auniteVnt
        }));
    }, [values.apuventeHt, values.amarge, values.apvttc, values.aremise]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setValues({
            ...values,
            [name]: value
        });
    };

    const showPreview = (e) => {
        if (e.target.files.length) {
            const file = e.target.files[0];
            const reader = new FileReader();
            reader.onloadend = () => {
                setValues({
                    ...values,
                    image: reader.result
                });
                setImagePreview(reader.result);
            };
            reader.readAsDataURL(file);
        } else {
            setValues({
                ...values,
                image: ''
            });
            setImagePreview('/img/up.jpg');
        }
    };
    
    const validate = () => {
        let temp = {};
        temp.adesignation = values.adesignation !== '';
        temp.afamille = values.afamille !== '';
        temp.asfamille = values.asfamille !== '';
        temp.image = values.image !== '' || recordForEdit;
    
        setErrors({
            adesignation: temp.adesignation ? '' : 'Ce champ est requis.',
            afamille: temp.afamille ? '' : 'Ce champ est requis.',
            asfamille: temp.asfamille ? '' : 'Ce champ est requis.',
            image: temp.image ? '' : "L'image est requise.",
        });
    
        console.log(Object.values(temp));
        return Object.values(temp).every(x => x);
    };

    const handleFormSubmit = async (event) => {
        event.preventDefault();
        if (validate()) {
            setLoading(true);
            const formData = {
                adesignation: values.adesignation,
                afamille: values.afamille,
                asfamille: values.asfamille,
                image: values.image,
                apuventeHt: values.apuventeHt,
                atauxTva: values.atauxTva,
                amarge: values.amarge,
                apvttc: values.apvttc,
                aremise: values.aremise,
                aprixVntprom: values.aprixVntprom,
                auniteVnt: values.auniteVnt,
                aqteStock: values.aqteStock,
            };
            console.log("Submitting form with data:", formData);

            try {
                let newArticle;
                if (recordForEdit) {
                    await axios.put(`https://localhost:7029/api/Articles/${recordForEdit.aref}`, formData);
                    alert('Article mis à jour avec succès!');
                    newArticle = { ...recordForEdit, ...values };
                } else {
                    await axios.post('https://localhost:7029/api/Articles', formData);
                    alert('Article ajouté avec succès!');
                    newArticle = { ...values };
                    navigate('/articlelist');
                }
                addOrEdit(newArticle);
                onClose();
            } catch (error) {
                console.error('Il y a eu une erreur lors de la soumission du formulaire!', error);
            } finally {
                setLoading(false);
            }
        }
    };

    const nextStep = () => {
        if (validate()) {
            setStep(step + 1);
        }
    };

    const previousStep = () => {
        setStep(step - 1);
    };
   

    const formContainerStyle = {
        maxWidth: '600px', // Adjust the max width
        margin: '20px auto', // Center the form horizontally
        padding: '20px', // Add padding for better appearance
        border: '1px solid #ccc', // Add a border
        borderRadius: '8px', // Add rounded corners
        boxShadow: '0 0 10px rgba(0,0,0,0.1)', // Add a subtle shadow
        backgroundColor: '#fff', // White background
    };

    return (
        <div style={formContainerStyle}>
            <form className="form" autoComplete="off" onSubmit={handleFormSubmit}>
                {step === 1 && (
                    <>
                        <div className="form-group">
                            <input
                                type="file"
                                accept="image/*"
                                className="form-control-file"
                                onChange={showPreview}
                            />
                            <div className="card-img-top-container">
                                {imagePreview && (
                                    <img
                                        src={imagePreview}
                                        className="card-img-top"
                                        alt="Article"
                                        style={{ maxWidth: '100%', height: 'auto' }}
                                    />
                                )}
                            </div>
                            {errors.image && <span className="error-text">{errors.image}</span>}
                        </div>
                        <div className="form-group">
                            <label htmlFor="adesignation">Catégorie</label>
                            <select
                                className={`form-control ${errors.adesignation ? 'error-input' : ''}`}
                                name="adesignation"
                                value={values.adesignation}
                                onChange={handleInputChange}
                            >
                                 <option value="">Sélectionnez une désignation</option>
                                <option value="Jeux et jouets">Jeux et jouets</option>
                                <option value="Animaux et articles pour animaux de compagnie">Animaux et articles pour animaux de compagnie</option>
                                <option value="Véhicules et accessoires">Véhicules et accessoires</option>
                                <option value="Vêtements et accessoires">Vêtements et accessoires</option>
                                <option value="Arts et loisirs">Arts et loisirs</option>
                                <option value="Bébés et tout petits">Bébés et tout petits</option>
                                <option value="Entreprise et industrie">Entreprise et industrie</option>
                                <option value="Appareils photo, caméra et instruments d'optique">Appareils photo, caméra et instruments d'optique</option>
                                <option value="Appareils électroniques">Appareils électroniques</option>
                                <option value="Alimentation, boissons et tabac">Alimentation, boissons et tabac</option>
                                <option value="Meubles">Meubles</option>
                                <option value="Quincaillerie">Quincaillerie</option>
                                <option value="Santé et beauté">Santé et beauté</option>
                                <option value="Maison et jardin">Maison et jardin</option>
                                <option value="Adultes">Adultes</option>
                                <option value="Médias">Médias</option>
                                <option value="Fourniture de bureau">Fourniture de bureau</option>
                                <option value="Offices religieux et cérémonies">Offices religieux et cérémonies</option>
                                <option value="Logiciels">Logiciels</option>
                                <option value="Équipements sportifs">Équipements sportifs</option>
                                <option value="Modules complémentaires du produit">Modules complémentaires du produit</option>
                                <option value="Services">Services</option>
                                <option value="Carte cadeaux">Carte cadeaux</option>
                                <option value="Non classé">Non classé</option>
                            </select>
                            {errors.adesignation && <span className="error-text">{errors.adesignation}</span>}
                        </div>

                        <div className="form-group">
                            <label htmlFor="afamille">Famille</label>
                            <input
                                className={`form-control ${errors.afamille ? 'error-input' : ''}`}
                                name="afamille"
                                value={values.afamille}
                                onChange={handleInputChange}
                            />
                            {errors.afamille && <span className="error-text">{errors.afamille}</span>}
                        </div>

                        <div className="form-group">
                            <label htmlFor="asfamille">Sous-Famille</label>
                            <input
                                className={`form-control ${errors.asfamille ? 'error-input' : ''}`}
                                name="asfamille"
                                value={values.asfamille}
                                onChange={handleInputChange}
                            />
                            {errors.asfamille && <span className="error-text">{errors.asfamille}</span>}
                        </div>

                        <button
                            type="button"
                            className="btn btn-primary"
                            onClick={nextStep}
                        >
                            Suivant
                        </button>
                    </>
                )}
                         {step === 2 && (
                    <>
                     <div className="card mb-3">
                            <div className="card-body">
                            <h5>Prix de l'article</h5>
                                <div className="row">
                                    <div className="form-group col-md-4">
                                        <label htmlFor="apuventeHt">Prix de vente HT</label>
                                        <input
                                            type="number"
                                            className="form-control"
                                            name="apuventeHt"
                                            value={values.apuventeHt}
                                            onChange={handleInputChange}
                                            placeholder="Entrez le prix de vente HT"
                                        />
                                    </div>
                                    <div className="form-group col-md-4">
                                        <label>TxTVA</label>
                                        <input
                                            type="number"
                                            className="form-control"
                                            name="atauxTva"
                                            value={values.atauxTva}
                                            onChange={handleInputChange}
                                        />
                                    </div>
                                    <div className="form-group col-md-4">
                                        <label htmlFor="apvttc">Total TTC</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            name="apvttc"
                                            value={values.apvttc}
                                            readOnly
                                            placeholder="prix total TTC"
                                        />
                                    </div>
                                </div>

                                <div className="row">
                                    <div className="form-group col-md-6">
                                        <label htmlFor="amarge">Marge (%)</label>
                                        <input
                                            type="number"
                                            className="form-control"
                                            name="amarge"
                                            value={values.amarge}
                                            onChange={handleInputChange}
                                            placeholder="Entrez la marge en pourcentage"
                                        />
                                    </div>
                                    <div className="form-group col-md-6">
                                        <label htmlFor="auniteVnt">Prix unitaire avec marge</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            name="auniteVnt"
                                            value={values.auniteVnt}
                                            readOnly
                                            placeholder="prix unitaire avec marge"
                                        />
                                    </div>
                                </div>

                                <div className="row">
                                    <div className="form-group col-md-6">
                                        <label htmlFor="aremise">Remise (%)</label>
                                        <input
                                            type="number"
                                            className="form-control"
                                            name="aremise"
                                            value={values.aremise}
                                            onChange={handleInputChange}
                                            placeholder="Entrez la remise en pourcentage"
                                        />
                                    </div>
                                    <div className="form-group col-md-6">
                                        <label htmlFor="aprixVntprom">Prix promotionnel</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            name="aprixVntprom"
                                            value={values.aprixVntprom}
                                            readOnly
                                            placeholder="Prix après la promotion"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>    
                        <div className="card mb-3">
                        <div className="card-body">
                            <h5>Stock</h5>
                            <div className="form-group mt-3">
                        <label htmlFor="aqteStock">Quantité</label>
                        <input
                            type="number"
                            className={`form-control ${errors.aqteStock ? 'error-input' : ''}`}
                            name="aqteStock"
                            id="aqteStock"
                            value={values.aqteStock}
                            onChange={handleInputChange}
                            placeholder="Entrez la quantité"
                            min="0" // Assurez-vous que la quantité est un nombre positif
                        />
                        {errors.aqteStock && <span className="error-text">{errors.aqteStock}</span>}
                    </div> 
                         </div>
                     </div>
                     <div className="form-group">
                            <button type="button" 
                            className="btn btn-secondary "  margin-right= "10px"
                            onClick={previousStep}>
                                Précédent
                            </button>
                            <button 
                                type="button" 
                                className="btn btn-secondary" 
                                onClick={handleFormSubmit}
                                disabled={loading}
                            >
                                {loading ? 'Soumission en cours...' : 'Soumettre'}
                            </button>
                        </div>
                   </>
                )}
            </form>
        </div>
    );
};
