import axiosInstance from "../../axiosInstance";

export const fetchClients = async () => {
    try {
        console.log('Fetching clients...');
        const response = await axiosInstance.get('https://localhost:7029/api/Tiers/GetTier');
        console.log('Fetched clients:', response.data);
        return response.data;
    } catch (error) {
        console.error('Error fetching clients:', error);
        throw error;
    }
};

export const addClient = async (clientData) => {
    try {
        console.log('Adding client:', clientData);
        const response = await axiosInstance.post('https://localhost:7029/api/Tiers/AddTier', clientData);
        console.log('Client added:', response.data);
        return response.data;
    } catch (error) {
        console.error('Error adding client:', error);
        throw error;
    }
};

export const updateClient = async (cref, clientData) => {
    try {
        console.log('Updating client with cref:', cref, 'Data:', clientData);
        await axiosInstance.put(`https://localhost:7029/api/Tiers/UpdateTier/${cref}`, clientData);
        console.log('Client updated successfully');
    } catch (error) {
        console.error('Error updating client:', error);
        throw error;
    }
};

export const deleteClient = async (cref) => {
    try {
        console.log('Deleting client with cref:', cref);
        await axiosInstance.delete(`https://localhost:7029/api/Tiers/DeleteTier/${cref}`);
        console.log('Client deleted successfully');
    } catch (error) {
        console.error('Error deleting client:', error);
        throw error;
    }
};
