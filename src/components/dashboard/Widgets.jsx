import React from 'react';
import { Grid, Paper, Typography } from '@mui/material';

const Widget = ({ title, value }) => (
  <Paper style={{ padding: '16px', textAlign: 'center' }}>
    <Typography variant="h6">{title}</Typography>
    <Typography variant="h4">{value}</Typography>
  </Paper>
);

const Widgets = () => {
  return (
    <Grid container spacing={3}>
      <Grid item xs={12} sm={6} md={3}>
        <Widget title="Total Users" value="1,234" />
      </Grid>
      <Grid item xs={12} sm={6} md={3}>
        <Widget title="Total Orders" value="567" />
      </Grid>
      <Grid item xs={12} sm={6} md={3}>
        <Widget title="Revenue" value="$12,345" />
      </Grid>
      <Grid item xs={12} sm={6} md={3}>
        <Widget title="Pending Requests" value="89" />
      </Grid>
    </Grid>
  );
};

export default Widgets;
