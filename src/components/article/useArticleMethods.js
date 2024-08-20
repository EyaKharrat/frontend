import { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchArticles, deleteArticle } from './articleService';

export const useArticleMethods = () => {
    const [articles, setArticles] = useState([]);
    const [recordForEdit, setRecordForEdit] = useState(null);
    const [openPopup, setOpenPopup] = useState(false);
    const navigate = useNavigate();

    const getArticles = useCallback(async () => {
        try {
            const data = await fetchArticles();
            setArticles(data);
        } catch (error) {
            console.error('Error fetching articles', error);
        }
    }, []);

    useEffect(() => {
        getArticles();
    }, [getArticles]);

    const addOrEdit = (article) => {
        if (article.aref) {
            setArticles(articles.map(item => (item.aref === article.aref ? article : item)));
        } else {
            setArticles([...articles, article]);
        }
    };

    const handleEdit = (article) => {
        setRecordForEdit(article);
        setOpenPopup(true);
    };

    const handleDelete = async (aref) => {
        try {
            await deleteArticle(aref);
            setArticles(articles.filter(article => article.aref !== aref));
            alert('Article deleted successfully!');
        } catch (error) {
            console.error('Error deleting article', error);
            alert('There was an error deleting the article!');
        }
    };

    const handleAddArticle = () => {
        navigate('/article');
    };
    return {
        articles,
        openPopup,
        recordForEdit,
        handleAddArticle,
        handleEdit,
        handleDelete,
        setOpenPopup,
        addOrEdit,
    };
};
