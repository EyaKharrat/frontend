import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Popup from '../Popup';
import { Article } from './Article';
import './Article.css';

function ArticleList() {
    const [articles, setArticles] = useState([]);
    const [recordForEdit, setRecordForEdit] = useState(null);
    const [openPopup, setOpenPopup] = useState(false);
    const navigate = useNavigate();

    const fetchArticles = useCallback(async () => {
        try {
            const response = await axios.get('https://localhost:7029/api/Articles');
            setArticles(response.data);
        } catch (error) {
            console.error('Error fetching articles', error);
        }
    }, []);

    useEffect(() => {
        fetchArticles();
    }, [fetchArticles]);

    // Define the addOrEdit function locally
    const addOrEdit = (article) => {
        if (article.aref) {
            // Update existing article
            setArticles(articles.map(item => (item.aref === article.aref ? article : item)));
        } else {
            // Add new article
            setArticles([...articles, article]);
        }
    };

    const handleEdit = (article) => {
        setRecordForEdit(article);
        setOpenPopup(true); // Open the popup for editing
    };

    const handleDelete = async (aref) => {
        try {
            await axios.delete(`https://localhost:7029/api/Articles/${aref}`);
            setArticles(articles.filter(article => article.aref !== aref));
            alert('Article deleted successfully!');
        } catch (error) {
            console.error('Error deleting article', error);
            alert('There was an error deleting the article!');
        }
    };

    const handleAddArticle = () => {
        navigate('/article'); // Redirect to the article creation page
    };

    return (
        <div className="container">
            <h2>Liste des articles</h2>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '10px' }}>
                <button className="btn btn-primary" onClick={handleAddArticle}>Add Article</button>
            </div>
            {openPopup && (
                <Popup
                    title={recordForEdit ? 'Edit Article' : 'Add Article'}
                    openPopup={openPopup}
                    setOpenPopup={setOpenPopup}
                >
                    <Article
                        recordForEdit={recordForEdit}
                        addOrEdit={addOrEdit}
                        onClose={() => setOpenPopup(false)}
                    />
                </Popup>
            )}
            <table className="table">
                <thead>
                    <tr>
                        <th>Référence</th>
                        <th>Nom</th>
                        <th>Catégorie</th>
                        <th>Marques</th>
                        <th>Image</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {articles.map((article) => (
                        <tr key={article.aref}>
                            <td>{article.aref}</td>
                            <td>{article.adesignation}</td>
                            <td>{article.afamille}</td>
                            <td>{article.asfamille}</td>
                            <td>
                                <img
                                    src={article.image || '/img/default.jpg'}
                                    alt={article.adesignation}
                                    className="article-image"
                                />
                            </td>
                            <td>
                                <button
                                    className="btn btn-warning btn-sm"
                                    onClick={() => handleEdit(article)}
                                >
                                    Modifier
                                </button>
                                <button
                                    className="btn btn-danger btn-sm"
                                    onClick={() => handleDelete(article.aref)}
                                >
                                    Supprimer
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default ArticleList;
