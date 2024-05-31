import React, { useEffect } from 'react';
import { Container, Grid, Paper, Typography, Box, Button } from '@mui/material';
import { useParams, useNavigate } from 'react-router-dom';
import { useAppSelector, useAppDispatch } from '../../app/hooks';
import { ordersActions } from './orderSlice';
import theme from '../../theme/theme';

const OrderDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      dispatch(ordersActions.fetchById(id));
    }
  }, [id, dispatch]);

  const order = useAppSelector((state) => state.orders.selectedItem);

  if (!order) {
    return <Typography>Loading...</Typography>;
  }

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Order Details
      </Typography>
      <Paper sx={{ padding: 3, marginBottom: 3 }}>
        <Typography variant="h6">Order ID: {order.id}</Typography>
        <Typography variant="body1" color = { theme.palette.info.main }>Total: ${order.total.toFixed(2)}</Typography>
        <Typography variant="body1">Status: {order.status}</Typography>
      </Paper>
      <Grid container spacing={3}>
        {order.Items.map((item) => (
          <Grid item xs={12} key={item.id}>
            <Paper sx={{ padding: 2 }}>
              <Grid container spacing={2} alignItems="center">
                <Grid item xs={3}>
                  <Typography variant="h6">Product ID: {item.productId}</Typography>
                </Grid>
                <Grid item xs={2}>
                  <Typography variant="body2">Quantity: {item.quantity}</Typography>
                </Grid>
                <Grid item xs={2}>
                

                  <Typography color = { theme.palette.info.main } variant="body2">Price: ${item.price.toFixed(2)}</Typography>
                </Grid>
              </Grid>
            </Paper>
          </Grid>
        ))}
      </Grid>
      <Box mt={4} display="flex" justifyContent="space-between">
        <Button variant="contained" color="secondary" onClick={() => navigate('/')}>
          Cancel
        </Button>
      </Box>
    </Container>
  );
};

export default OrderDetails;
