import axiosInstance from "../../axiosInstance";

export const fetchClients = async () => {
    try {
        const response = await axiosInstance.get('https://localhost:7029/api/Tiers/GetTier');
        return response.data;
    } catch (error) {
        console.error('Error fetching clients:', error);
        throw error;
    }
};

export const fetchClientDetails = async (clientCode) => {
    try {
        const response = await axiosInstance.get(`https://localhost:7029/api/Tiers/GetTier/${clientCode}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching client details:', error);
        throw error;
    }
};

export const fetchArticles = async () => {
    try {
        const response = await axiosInstance.get('https://localhost:7029/api/Articles');
        return response.data;
    } catch (error) {
        console.error('Error fetching articles:', error);
        throw error;
    }
};

export const fetchArticleDetails = async (articleCode) => {
    try {
        const response = await axiosInstance.get(`https://localhost:7029/api/Articles/${articleCode}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching article details:', error);
        throw error;
    }
};

export const saveBonDeCommande = async (payload) => {
    try {
        const response = await axiosInstance.post('https://localhost:7029/api/DocumentBonCommandes', payload);
        return response.data;
    } catch (error) {
        console.error('Error saving bon de commande:', error);
        throw error;
    }
};
