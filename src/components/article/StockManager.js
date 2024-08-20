import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { Container, Typography, TextField, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton, MenuItem, Select, InputLabel, FormControl } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

const StockManager = () => {
  const [items, setItems] = useState([]);
  const [selectedAref, setSelectedAref] = useState('');
  const [aqteStock, setAqteStock] = useState('');

  const fetchItems = useCallback(async () => {
    try {
      const response = await axios.get('https://localhost:7029/api/Articles');
      setItems(response.data);
      if (response.data.length > 0 && !selectedAref) {
        setSelectedAref(response.data[0].aref);
        setAqteStock(response.data[0].aqteStock);
      }
    } catch (error) {
      console.error('Error fetching stock data', error);
    }
  }, [selectedAref]);

  useEffect(() => {
    fetchItems();
  }, [fetchItems]);

  const handleUpdateStock = async (e) => {
    e.preventDefault();
    try {
      const updatedItem = { aref: selectedAref, aqteStock: Number(aqteStock) };
      await axios.put('https://localhost:7029/api/Articles/update-stock', updatedItem);
      setAqteStock('');
      fetchItems();
    } catch (error) {
      console.error('Error updating stock', error);
    }
  };

  const handleDeleteItem = async (aref) => {
    try {
      await axios.delete(`https://localhost:7029/api/Articles/${aref}`);
      fetchItems();
    } catch (error) {
      console.error('Error deleting item', error);
    }
  };

  const handleSelectChange = (e) => {
    const selectedRef = e.target.value;
    setSelectedAref(selectedRef);
    const selectedItem = items.find(item => item.aref === selectedRef);
    setAqteStock(selectedItem ? selectedItem.aqteStock : '');
  };

  return (
    <Container maxWidth="md">
      <Typography variant="h4" gutterBottom>
        Gestion de Stock
      </Typography>
      <form onSubmit={handleUpdateStock}>
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
