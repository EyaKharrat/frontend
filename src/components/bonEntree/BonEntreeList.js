import React, { useEffect, useState } from 'react';
import {
  Table, TableHead, TableRow, TableCell, TableBody, Container, Typography, Paper, TableContainer
} from '@mui/material';
import axiosInstance from '../../axiosInstance';

const BonEntreeList = () => {
  const [bonEntreeList, setBonEntreeList] = useState([]);

  useEffect(() => {
    const fetchBonEntree = async () => {
      try {
        const response = await axiosInstance.get('https://localhost:7029/api/DocumentDetailCommandes');
        setBonEntreeList(response.data);
      } catch (error) {
        console.error('Erreur lors de la récupération des bons d\'entrée:', error);
      }
    };

    fetchBonEntree();
  }, []);

  return (
    <Container sx={{ mt: 4 }}>
      <Typography variant="h5" gutterBottom sx={{ fontWeight: 'bold', color: '#333' }}>
        Liste des Bons d'Entrée
      </Typography>
      <TableContainer component={Paper} sx={{ boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.1)', borderRadius: 4 }}>
        <Table>
          <TableHead sx={{ backgroundColor: '#f5f5f5' }}>
            <TableRow>
              <TableCell sx={{ fontWeight: 'bold' }}>Réf Bon d'Entrée</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>Réf Article</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>Date</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>Quantité</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {bonEntreeList.map((bon, index) => (
              <TableRow key={index} sx={{ '&:nth-of-type(odd)': { backgroundColor: '#f9f9f9' } }}>
                <TableCell>{bon.docRef}</TableCell>
                <TableCell>{bon.docArt}</TableCell>
                <TableCell>{bon.date}</TableCell>
                <TableCell>{bon.docQte}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
};

export default BonEntreeList;
