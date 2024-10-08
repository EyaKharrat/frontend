import React, { useState, useEffect } from 'react';
import { Paper, Typography, Table, TableHead, TableRow, TableCell, TableBody, Snackbar, Alert, IconButton, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../../axiosInstance';
import { MdDelete } from "react-icons/md";
import { CiEdit } from "react-icons/ci";
const OrderListPage = () => {
    const [orders, setOrders] = useState([]);
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const [snackbarSeverity, setSnackbarSeverity] = useState('success');
    const navigate = useNavigate();

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const response = await axiosInstance.get('https://localhost:7029/api/DocumentDetailCommandes');
                setOrders(response.data);
            } catch (error) {
                console.error('Error fetching orders:', error);
            }
        };

        fetchOrders();
    }, []);

    const handleDelete = async (orderId) => {
        if (!orderId) {
            console.error('Order ID is undefined');
            setSnackbarMessage('Erreur: ID de commande non défini');
            setSnackbarSeverity('error');
            setOpenSnackbar(true);
            return;
        }

        try {
            await axiosInstance.delete(`https://localhost:7029/api/DocumentDetailCommandes/${orderId}`);
            setOrders(orders.filter(order => order.uniqueId !== orderId));
            setSnackbarMessage('Commande supprimée avec succès');
            setSnackbarSeverity('success');
            setOpenSnackbar(true);
        } catch (error) {
            setSnackbarMessage('Erreur lors de la suppression de la commande');
            setSnackbarSeverity('error');
            setOpenSnackbar(true);
            console.error('Error deleting order:', error);
        }
    };

    const handleModify = (orderId) => {
        navigate(`/document/${orderId}`);
    };

    const handleRowClick = (uniqueId) => {
        navigate(`/order/${uniqueId}`);
    };

    const handleCloseSnackbar = () => {
        setOpenSnackbar(false);
    };

    return (
        <Box p={3} bgcolor="#f4f6f8" minHeight="100vh">
            <Paper elevation={5} sx={{ padding: '30px', backgroundColor: '#fff', borderRadius: '12px' }}>
                <Typography variant="h4" gutterBottom align="center" color="primary" sx={{ fontWeight: 'bold', marginBottom: '20px' }}>
                    Liste des Bons de Commande
                </Typography>
                <Table sx={{ minWidth: 650 }}>
                    <TableHead>
                        <TableRow sx={{ backgroundColor: '#007bff', color: '#fff' }}>
                            <TableCell sx={{ color: '#fff', fontWeight: 'bold' }}>Référence</TableCell>
                            <TableCell sx={{ color: '#fff', fontWeight: 'bold' }}>Date de Livraison</TableCell>
                            <TableCell sx={{ color: '#fff', fontWeight: 'bold', textAlign: 'right' }}></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {orders.map((order) => (
                            <TableRow
                                key={order.uniqueId}
                                hover
                                onClick={() => handleRowClick(order.uniqueId)}
                                sx={{
                                    cursor: 'pointer',
                                    transition: 'background-color 0.3s ease',
                                    '&:hover': { backgroundColor: '#f1f3f5' },
                                }}
                            >
                                <TableCell>{order.uniqueId}</TableCell>
                                <TableCell>{new Date(order.date).toLocaleDateString()}</TableCell>
                                <TableCell align="right">
                                    <IconButton
                                        color="primary"
                                        onClick={(e) => {
                                            e.stopPropagation(); // Prevent row click
                                            handleModify(order.uniqueId);
                                        }}
                                        style={{ marginRight: '10px' }}
                                    >
                                        <CiEdit />
                                    </IconButton>
                                    <IconButton
                                        color="secondary"
                                        onClick={(e) => {
                                            e.stopPropagation(); // Prevent row click
                                            handleDelete(order.uniqueId);
                                        }}
                                    >
                                        <MdDelete />
                                    </IconButton>
                                    <IconButton
                                        color="primary"
                                        onClick={(e) => {
                                            e.stopPropagation(); // Prevent row click
                                            handleRowClick(order.uniqueId);
                                        }}
                                    >
                                        
                                    </IconButton>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </Paper>

            <Snackbar
                open={openSnackbar}
                autoHideDuration={6000}
                onClose={handleCloseSnackbar}
            >
                <Alert onClose={handleCloseSnackbar} severity={snackbarSeverity} sx={{ width: '100%' }}>
                    {snackbarMessage}
                </Alert>
            </Snackbar>
        </Box>
    );
};

export default OrderListPage;
