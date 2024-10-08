import React, { useState, useEffect, useCallback } from 'react';
import axiosInstance from '../../axiosInstance';
import { Container, Typography, TextField, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton, MenuItem, Select, InputLabel, FormControl, Alert } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

const StockManager = () => {
  const [items, setItems] = useState([]);
  const [selectedAref, setSelectedAref] = useState('');
  const [aqteStock, setAqteStock] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const fetchItems = useCallback(async () => {
    try {
      const response = await axiosInstance.get('https://localhost:7029/api/Articles');
      setItems(response.data);
      if (response.data.length > 0 && !selectedAref) {
        setSelectedAref(response.data[0].aref);
        setAqteStock(response.data[0].aqteStock);
      }
    } catch (error) {
      setError('Erreur lors de la récupération des données de stock.');
      console.error('Error fetching stock data', error);
    }
  }, [selectedAref]);

  useEffect(() => {
    fetchItems();
  }, [fetchItems]);

  const handleUpdateStock = async () => {
    try {
      const updatedItem = { aref: selectedAref, aqteStock: Number(aqteStock) };
      await axiosInstance.put(`https://localhost:7029/api/Articles/${selectedAref}`, updatedItem);
      setAqteStock('');
      setSuccess('Stock mis à jour avec succès.');
      fetchItems();
    } catch (error) {
      setError('Erreur lors de la mise à jour du stock.');
      console.error('Error updating stock', error);
    }
  };

  const handleDeleteItem = async (aref) => {
    try {
      await axiosInstance.delete(`https://localhost:7029/api/Articles/${aref}`);
      setSuccess('Article supprimé avec succès.');
      fetchItems();
    } catch (error) {
      setError('Erreur lors de la suppression de l\'article.');
      console.error('Error deleting item', error);
    }
  };

  const handleSelectChange = (e) => {
    const selectedRef = e.target.value;
    setSelectedAref(selectedRef);
    const selectedItem = items.find(item => item.aref === selectedRef);
    setAqteStock(selectedItem ? selectedItem.aqteStock : '');
  };

  const handleSubmit = (event) => {
    event.preventDefault(); // Prevent the default form submission
    handleUpdateStock();
  };

  return (
    <Container maxWidth="md">
      <Typography variant="h4" gutterBottom>
        Gestion de Stock
      </Typography>
      {error && <Alert severity="error">{error}</Alert>}
      {success && <Alert severity="success">{success}</Alert>}
      <form onSubmit={handleSubmit}>
        <FormControl fullWidth margin="normal">
          <InputLabel>Référence de l'article</InputLabel>
          <Select
            value={selectedAref}
            onChange={handleSelectChange}
            label="Référence de l'article"
            required
          >
            {items.map((item) => (
              <MenuItem key={item.aref} value={item.aref}>
                {item.aref}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <TextField
          type="number"
          label="Quantité en stock"
          value={aqteStock}
          onChange={(e) => setAqteStock(e.target.value)}
          fullWidth
          margin="normal"
          required
        />
        <Button type="submit" variant="contained" color="primary">
          Mettre à Jour le Stock
        </Button>
      </form>
      <TableContainer component={Paper} style={{ marginTop: '20px' }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Référence</TableCell>
              <TableCell>Quantité en Stock</TableCell>
              <TableCell>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {items.map((item) => (
              <TableRow key={item.aref}>
                <TableCell>{item.aref}</TableCell>
                <TableCell>{item.aqteStock}</TableCell>
                <TableCell>
                  <IconButton
                    onClick={() => handleDeleteItem(item.aref)}
                    color="error"
                  >
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
};

export default StockManager;
