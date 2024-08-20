import axiosInstance from "../../axiosInstance";

const API_URL = 'https://localhost:7029/api/Articles';

export const fetchArticles = async () => {
    try {
        const response = await axiosInstance.get(API_URL);
        return response.data;
    } catch (error) {
        console.error('Error fetching articles', error);
        throw error;
    }
};

export const deleteArticle = async (aref) => {
    try {
        console.log('Deleting article with aref:', aref);
        await axiosInstance.delete(`${API_URL}/${aref}`);
        console.log('Deleted article with aref:', aref);
    } catch (error) {
        console.error('Error deleting article', error);
        throw error;
    }
};

export const addArticle = async (article) => {
    try {
        const response = await axiosInstance.post(API_URL, article);
        return response.data;
    } catch (error) {
        console.error('Error adding article', error);
        throw error;
    }
};

export const updateArticle = async (aref, article) => {
    try {
        const response = await axiosInstance.put(`${API_URL}/${aref}`, article);
        return response.data;
    } catch (error) {
        console.error('Error updating article', error);
        throw error;
    }
};

// New function for updating stock
export const updateStock = async (articleId, newStock) => {
    try {
        const response = await axiosInstance.put(`${API_URL}/update-stock`, {
            aref: articleId,
            aqteStock: newStock
        });
        return response.data;
    } catch (error) {
        console.error('Error updating stock', error);
        throw error;
    }
};
