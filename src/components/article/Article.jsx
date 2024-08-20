import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { addArticle, updateArticle } from './articleService';
import { MenuItem,TextField,Button,Card,CardContent,CircularProgress,InputAdornment,Box,FormControl,FormHelperText,Typography } from '@mui/material';

const initialFieldValues = {
    adesignation: '',
    afamille: '',
    asfamille: '',
    acategorie:'',
    image: '',
    apuventeHt: '',
    atauxTva: 19, // TVA fixe à 19%
    aremise: '',
    amarge: '',
    auniteVnt: '',
    apvttc: '',
    aqteStock: '',
    aprixVntprom: ''
};

export const Article = ({ recordForEdit, addOrEdit, onClose }) => {
    const navigate = useNavigate();
    const [values, setValues] = useState(initialFieldValues);
    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);
    const [imagePreview, setImagePreview] = useState('/img/up.jpg');
    const [step, setStep] = useState(1);

    useEffect(() => {
        if (recordForEdit) {
            setValues({ ...recordForEdit });
            setImagePreview(recordForEdit.image || '/img/up.jpg');
        }
    }, [recordForEdit]);

    const calculateValues = (apuventeHt, amarge, apvttc, aremise, auniteVnt) => {
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
            apvttc,
            aprixVntprom: priceAfterDiscount,
            auniteVnt
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
        temp.acategorie = values.acategorie !== '';
        temp.image = values.image !== '' || recordForEdit;

        setErrors({
            adesignation: temp.adesignation ? '' : 'Ce champ est requis.',
            afamille: temp.afamille ? '' : 'Ce champ est requis.',
            asfamille: temp.asfamille ? '' : 'Ce champ est requis.',
            acategorie: temp.acategorie ? '' : 'Ce champ est requis.',
            image: temp.image ? '' : "L'image est requise.",
        });

        return Object.values(temp).every(x => x);
    };

    const handleFormSubmit = async (event) => {
        event.preventDefault();
        if (validate()) {
            setLoading(true);
            try {
                let newArticle;
                if (recordForEdit) {
                    newArticle = await updateArticle(recordForEdit.aref, values);
                    alert('Article mis à jour avec succès!');
                } else {
                    newArticle = await addArticle(values);
                    alert('Article ajouté avec succès!');
                    navigate('/articlelist');
                }
                addOrEdit(newArticle);
                onClose();
            } catch (error) {
                console.error('Error during form submission', error);
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
        maxWidth: '600px',
        margin: '20px auto',
        padding: '20px',
        border: '1px solid #e0e0e0',
        borderRadius: '8px',
        boxShadow: '0 0 10px rgba(0,0,0,0.1)',
        backgroundColor: '#ffffff',
    };

    return (
        <div style={formContainerStyle}>
            <form autoComplete="off" onSubmit={handleFormSubmit}>
                {step === 1 && (
                    <>
                     <Typography variant="h6" component="div" sx={{ mb: 2 }}>
                        {recordForEdit ? 'Edit Article' : 'Nouveau(-el) Article'}
                    </Typography>
                        <FormControl fullWidth margin="normal">
                                <input
                                    type="file"
                                    accept="image/*"
                                    style={{ display: 'none' }}
                                    id="image-upload"
                                    onChange={showPreview}
                                />
                                <label htmlFor="image-upload">
                                    <Button variant="contained" component="span" fullWidth>
                                        Télécharger une image
                                    </Button>
                                </label>
                                <div style={{ textAlign: 'center', marginTop: '10px' }}>
                                    {imagePreview && (
                                        <img
                                            src={imagePreview}
                                            alt="Article"
                                            style={{ maxWidth: '40%', height: '50%' }}
                                        />
                                    )}
                                </div>
                                {errors.image && <FormHelperText error>{errors.image}</FormHelperText>}
                            </FormControl>
                            <TextField
                                    fullWidth
                                    margin="normal"
                                    label="Catégorie"
                                    name="acategorie"
                                    value={values.acategorie}
                                    onChange={handleInputChange}
                                    select
                                    variant="outlined"
                                    helperText={errors.acategorie}
                                    error={!!errors.acategorie}
                                >
                                    <MenuItem value="">Sélectionnez une désignation</MenuItem>
                                    <MenuItem value="Jeux et jouets">Jeux et jouets</MenuItem>
                                    <MenuItem value="Animaux et articles pour animaux de compagnie">Animaux et articles pour animaux de compagnie</MenuItem>
                                    <MenuItem value="Véhicules et accessoires">Véhicules et accessoires</MenuItem>
                                    <MenuItem value="Vêtements et accessoires">Vêtements et accessoires</MenuItem>
                                    <MenuItem value="Arts et loisirs">Arts et loisirs</MenuItem>
                                    <MenuItem value="Bébés et tout petits">Bébés et tout petits</MenuItem>
                                    <MenuItem value="Entreprise et industrie">Entreprise et industrie</MenuItem>
                                    <MenuItem value="Appareils photo, caméra et instruments d'optique">Appareils photo, caméra et instruments d'optique</MenuItem>
                                    <MenuItem value="Appareils électroniques">Appareils électroniques</MenuItem>
                                    <MenuItem value="Alimentation, boissons et tabac">Alimentation, boissons et tabac</MenuItem>
                                    <MenuItem value="Meubles">Meubles</MenuItem>
                                    <MenuItem value="Informatique">Informatique</MenuItem>
                                    <MenuItem value="Quincaillerie">Quincaillerie</MenuItem>
                                    <MenuItem value="Santé et beauté">Santé et beauté</MenuItem>
                                    <MenuItem value="Maison et jardin">Maison et jardin</MenuItem>
                                    <MenuItem value="Adultes">Adultes</MenuItem>
                                    <MenuItem value="Médias">Médias</MenuItem>
                                    <MenuItem value="Fourniture de bureau">Fourniture de bureau</MenuItem>
                                    <MenuItem value="Offices religieux et cérémonies">Offices religieux et cérémonies</MenuItem>
                                    <MenuItem value="Logiciels">Logiciels</MenuItem>
                                    <MenuItem value="Équipements sportifs">Équipements sportifs</MenuItem>
                                    <MenuItem value="Modules complémentaires du produit">Modules complémentaires du produit</MenuItem>
                                    <MenuItem value="Services">Services</MenuItem>
                                    <MenuItem value="Carte cadeaux">Carte cadeaux</MenuItem>
                                    <MenuItem value="Non classé">Non classé</MenuItem>
                                </TextField>
                            <TextField
                               fullWidth
                               margin="normal"
                               label="Type-Article"
                               name="afamille"
                               value={values.afamille}
                               onChange={handleInputChange}
                               variant="outlined"
                               helperText={errors.afamille}
                               error={!!errors.afamille}
                           />

                            <TextField
                                fullWidth
                                margin="normal"
                                label="Nom-Article"
                                name="asfamille"
                                value={values.asfamille}
                                onChange={handleInputChange}
                                variant="outlined"
                                helperText={errors.asfamille}
                                error={!!errors.asfamille}
                            />
                           <TextField
                                fullWidth
                                margin="normal"
                                label="Désingation"
                                name="adesignation"
                                value={values.description}
                                onChange={handleInputChange}
                                variant="outlined"
                                helperText={errors.adesignation}
                                error={!!errors.adesignation}
                            />
                            <Button
                                variant="contained"
                                color="primary"
                                onClick={nextStep}
                                fullWidth
                                sx={{ marginTop: 2 }}
                            >
                                Suivant
                            </Button>
                    </>
                )}
                {step === 2 && (
                    <>
                        <Typography variant="h6" component="div" sx={{ mb: 2 }}>
                            Informations sur les prix
                        </Typography>
                                <Card sx={{ mb: 3 }}>
                                <CardContent>
                                    <h5>Prix de l'article</h5>
                                    <TextField
                                        fullWidth
                                        margin="normal"
                                        label="Prix de vente HT"
                                        name="apuventeHt"
                                        type="number"
                                        value={values.apuventeHt}
                                        onChange={handleInputChange}
                                        variant="outlined"
                                        InputProps={{
                                            startAdornment: <InputAdornment position="start">dt</InputAdornment>,
                                        }}
                                    />

                                    <TextField
                                        fullWidth
                                        margin="normal"
                                        label="Tx TVA"
                                        name="atauxTva"
                                        type="number"
                                        value={values.atauxTva}
                                        onChange={handleInputChange}
                                        variant="outlined"
                                        InputProps={{
                                            endAdornment: <InputAdornment position="end">%</InputAdornment>,
                                        }}
                                    />

                                    <TextField
                                        fullWidth
                                        margin="normal"
                                        label="Total TTC"
                                        name="apvttc"
                                        value={values.apvttc}
                                        readOnly
                                        variant="outlined"
                                        InputProps={{
                                            startAdornment: <InputAdornment position="start">dt</InputAdornment>,
                                        }}
                                    />

                                    <TextField
                                        fullWidth
                                        margin="normal"
                                        label="Marge (%)"
                                        name="amarge"
                                        type="number"
                                        value={values.amarge}
                                        onChange={handleInputChange}
                                        variant="outlined"
                                        InputProps={{
                                            endAdornment: <InputAdornment position="end">%</InputAdornment>,
                                        }}
                                    />

                                    <TextField
                                        fullWidth
                                        margin="normal"
                                        label="Prix unitaire avec Marge"
                                        name="auniteVnt"
                                        value={values.auniteVnt}
                                        readOnly
                                        variant="outlined"
                                        InputProps={{
                                            startAdornment: <InputAdornment position="start">dt</InputAdornment>,
                                        }}
                                    />

                                    <TextField
                                        fullWidth
                                        margin="normal"
                                        label="Remise (%)"
                                        name="aremise"
                                        type="number"
                                        value={values.aremise}
                                        onChange={handleInputChange}
                                        variant="outlined"
                                        InputProps={{
                                            endAdornment: <InputAdornment position="end">%</InputAdornment>,
                                        }}
                                    />

                                    <TextField
                                        fullWidth
                                        margin="normal"
                                        label="Prix après Remise"
                                        name="aprixVntprom"
                                        value={values.aprixVntprom}
                                        readOnly
                                        variant="outlined"
                                        InputProps={{
                                            startAdornment: <InputAdornment position="start">dt</InputAdornment>,
                                        }}
                                    />
                                    <TextField
                                        variant="outlined"
                                        label="Quantité en Stock"
                                        name="aqteStock"
                                        value={values.aqteStock}
                                        onChange={handleInputChange}
                                        fullWidth
                                        margin="normal"
                                        type="number"
                                        InputProps={{
                                            inputProps: { min: 0 }, 
                                        }}
                                        error={!!errors.aqteStock}
                                        helperText={errors.aqteStock}
                                    />

                                </CardContent>
                            </Card>

                        <Box display="flex" justifyContent="space-between" gap={2}>
                            <Button
                                variant="contained"
                                color="primary"
                                fullWidth
                                onClick={previousStep}
                            >
                                Précédent
                            </Button>

                            <Button
                                type="submit"
                                variant="contained"
                                color="primary"
                                fullWidth
                                disabled={loading}
                            >
                                {loading ? <CircularProgress size={24} /> : 'Enregistrer'}
                            </Button>
                        </Box>
                    </>
                )}
            </form>
        </div>
    );
};
