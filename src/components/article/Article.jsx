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
    amarge: '',
    apvttc: '',
    aremise: '',
    aprixVntprom: '',
    auniteVnt: '',
    aqteStock:''
};

export const Article = ({ recordForEdit, addOrEdit, onClose }) => {
    const navigate = useNavigate();
    const [values, setValues] = useState(initialFieldValues);
    const [errors, setErrors] = useState({});
    const [imagePreview, setImagePreview] = useState('/img/up.jpg');
    const [loading, setLoading] = useState(false);
    const [step, setStep] = useState(1); // État pour gérer les étapes du formulaire
    const [isQuantityVisible, setQuantityVisible] = useState(false);
    useEffect(() => {
        if (recordForEdit) {
            setValues({
                adesignation: recordForEdit.adesignation || '',
                afamille: recordForEdit.afamille || '',
                asfamille: recordForEdit.asfamille || '',
                image: recordForEdit.image || '',
                apuventeHt: recordForEdit.apuventeHt || '',
                atauxTva: recordForEdit.atauxTva || 19, // TVA fixe à 19%
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

    const calculateValues = (apuventeHt, amarge, apvttc, aremise) => {
        let totalTtc = '';
        let priceAfterMargin = '';
        let priceAfterDiscount = '';

        if (apuventeHt) {
            // Calcul du prix total TTC
            const priceHt = parseFloat(apuventeHt);
            const tvaRate = 19 / 100;
            totalTtc = priceHt * (1 + tvaRate);

            // Calcul du prix après marge
            const marge = parseFloat(amarge) / 100;
            priceAfterMargin = priceHt * (1 + marge);
        }

        if (priceAfterMargin && aremise) {
            const remise = parseFloat(aremise) / 100;
            priceAfterDiscount = priceAfterMargin - (priceAfterMargin * remise);
        }

        return { totalTtc, priceAfterMargin, priceAfterDiscount };
    };

    useEffect(() => {
        const { totalTtc, priceAfterMargin, priceAfterDiscount } = calculateValues(values.apuventeHt, values.amarge, values.apvttc, values.aremise);
        setValues(prev => ({
            ...prev,
            apvttc: totalTtc,
            aprixVntprom: priceAfterDiscount,
            auniteVnt: priceAfterMargin
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
   
       
    
        const toggleQuantityField = () => {
            setQuantityVisible(!isQuantityVisible);
        };
    return (
        <div className="article-container">
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
                                <option value="designiation1">Jeux et jouets</option>
                                <option value="designiation2">Animaux et articles pour animaux de compagnie</option>
                                <option value="designiation3">Véhicules et accessoires</option>
                                <option value="designiation4">Vêtements et accessoires</option>
                                <option value="designiation5">Arts et loisirs</option>
                                <option value="designiation6">Bébés et tout petits</option>
                                <option value="designiation7">Entreprise et industrie</option>
                                <option value="designiation8">Appareils photo, caméra et instruments d'optique</option>
                                <option value="designiation9">Appareils électroniques</option>
                                <option value="designiation10">Alimentation, boissons et tabac</option>
                                <option value="designiation11">Meubles</option>
                                <option value="designiation12">Quincaillerie</option>
                                <option value="designiation13">Santé et beauté</option>
                                <option value="designiation14">Maison et jardin</option>
                                <option value="designiation15">Adultes</option>
                                <option value="designiation16">Médias</option>
                                <option value="designiation17">Fourniture de bureau</option>
                                <option value="designiation18">Offices religieux et cérémonies</option>
                                <option value="designiation20">Logiciels</option>
                                <option value="designiation21">Équipements sportifs</option>
                                <option value="designiation22">Modules complémentaires du produit</option>
                                <option value="designiation23">Services</option>
                                <option value="designiation24">Carte cadeaux</option>
                                <option value="designiation25">Non classé</option>
                            </select>
                            {errors.adesignation && <span className="error-text">{errors.adesignation}</span>}
                        </div>
                        <div className="form-group">
                            <label htmlFor="afamille">Nom de l'article</label>
                            <input
                                type="text"
                                className={`form-control ${errors.afamille ? 'error-input' : ''}`}
                                name="afamille"
                                value={values.afamille}
                                onChange={handleInputChange}
                                placeholder="Entrez la famille de l'article"
                            />
                            {errors.afamille && <span className="error-text">{errors.afamille}</span>}
                        </div>
                        <div className="form-group">
                            <label htmlFor="asfamille">Marque</label>
                            <input
                                type="text"
                                className={`form-control ${errors.asfamille ? 'error-input' : ''}`}
                                name="asfamille"
                                value={values.asfamille}
                                onChange={handleInputChange}
                                placeholder="Entrez la sous-famille de l'article"
                            />
                            {errors.asfamille && <span className="error-text">{errors.asfamille}</span>}
                        </div>
                        <div className="form-group">
                            <button type="button" className="btn btn-primary" onClick={nextStep}>
                                Suivant
                            </button>
                        </div>
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
                                <button 
                                    className="btn btn-primary" 
                                    onClick={toggleQuantityField}
                                >
                                    Suivre la quantité
                                </button>

                                {isQuantityVisible && (
                                    <>
                                        <div className="form-group mt-3">
                                            <label htmlFor="quantity">Quantité</label>
                                            <input
                                                type="number"
                                                className="form-control"
                                                name="quantity"
                                                id="quantity"
                                                placeholder="Entrez la quantité"
                                            />
                                        </div>
                        
                                      </>
                                )}
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
