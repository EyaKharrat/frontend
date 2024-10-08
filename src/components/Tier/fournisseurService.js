import axiosInstance from "../../axiosInstance";

export const fetchfournisseurs = async () => {
    try {
        console.log('Fetching fournisseurs...');
        const response = await axiosInstance.get('https://localhost:7029/api/Tiers/GetTier');
        console.log('Fetched fournisseurs:', response.data);
        return response.data;
    } catch (error) {
        console.error('Error fetching fournisseurs:', error);
        throw error;
    }
};

export const addfournisseur = async (fournisseurData) => {
    try {
        console.log('Adding fournisseur:', fournisseurData);
        const response = await axiosInstance.post('https://localhost:7029/api/Tiers/AddTier', fournisseurData);
        console.log('fournisseur added:', response.data);
        return response.data;
    } catch (error) {
        console.error('Error adding fournisseur:', error);
        throw error;
    }
};

export const updatefournisseur = async (cref, fournisseurData) => {
    try {
        console.log('Updating fournisseur with cref:', cref, 'Data:', fournisseurData);
        await axiosInstance.put(`https://localhost:7029/api/Tiers/UpdateTier/${cref}`, fournisseurData);
        console.log('fournisseur updated successfully');
    } catch (error) {
        console.error('Error updating fournisseur:', error);
        throw error;
    }
};

export const deletefournisseur = async (cref) => {
    try {
        console.log('Deleting fournisseur with cref:', cref);
        await axiosInstance.delete(`https://localhost:7029/api/Tiers/DeleteTier/${cref}`);
        console.log('fournisseur deleted successfully');
    } catch (error) {
        console.error('Error deleting fournisseur:', error);
        throw error;
    }
};
