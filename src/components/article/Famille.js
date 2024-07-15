import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { MdDeleteOutline } from "react-icons/md";

const FamilleForm = ({ recordForEdit }) => {
    const [formData, setFormData] = useState({
        Aref: '',
        Adesignation: '', // Changed to match the attribute name in formData
        NomImage: null      // Changed to match the attribute name in formData
    });

    // Load existing data if editing
    useEffect(() => {
        if (recordForEdit) {
            setFormData({
                Aref: recordForEdit.Aref || '',
                designaition: recordForEdit.designaition || '',
                NomImage: null // You may want to load existing image here if available
            });
        }
    }, [recordForEdit]);

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleImageChange = (event) => {
        const file = event.target.files[0];
        setFormData(prevState => ({
            ...prevState,
            NomImage: file
        }));
    };

    const handleDeleteImage = () => {
        setFormData(prevState => ({
            ...prevState,
            NomImage: null
        }));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            if (recordForEdit) {
                // Edit existing client
                const response = await axios.put(`https://localhost:7029/api/Articles/${formData.Aref}`, formData);
                console.log(response);
                alert('Form updated successfully!');
            } else {
                // Create new client
                const response = await axios.post('https://localhost:7029/api/ArticleSources', formData);
                console.log(response);
                alert('Form submitted successfully!');
            }
        } catch (error) {
            console.error('There was an error submitting the form!', error);
            alert('There was an error submitting the form!');
        }
    };

    return (
        <div className="container mt-3">
            <div className="card">
                <div className="card-header">
                    <h2 className="text-center">Formulaire Famille</h2>
                </div>
                <div className="card-body">
                    <form onSubmit={handleSubmit}>
                        <div className="mb-3">
                            <label htmlFor="Aref" className="form-label">Code</label>
                            <input
                                type="text"
                                className="form-control"
                                id="Aref"
                                name="Aref"
                                value={formData.Aref}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="designaition" className="form-label">Designation</label>
                            <input
                                type="text"
                                className="form-control"
                                id="Adesignation"
                                name="Adesignation"
                                value={formData.Adesignation}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="NomImage" className="form-label">Ajouter une image</label>
                            <input
                                type="file"
                                className="form-control"
                                id="NomImage"
                                name="NomImage"
                                accept="NomImage/*"
                                onChange={handleImageChange}
                            />
                        </div>
                        {formData.image && (
                            <div className="mb-3">
                                <img
                                    src={URL.createObjectURL(formData.image)}
                                    alt="Uploaded"
                                    style={{ maxWidth: '100px', maxHeight: '100px' }}
                                />
                                <button
                                    type="button"
                                    className="btn btn-sm btn-danger ms-2"
                                    onClick={handleDeleteImage}
                                >
                                    <MdDeleteOutline /> Supprimer
                                </button>
                            </div>
                        )}
                        <div className="d-flex justify-content-between mt-4">
                            <button type="submit" className="btn btn-primary">
                              Valider
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default FamilleForm;
