import React, { useState, useEffect } from 'react';
import { Container, Grid, Paper, Typography, Button, Box } from '@mui/material';
import { CartItem, loadCart, saveCart } from '../cart/cartUtils';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { useNavigate } from 'react-router-dom';
import { ordersActions } from '../order-items/orderSlice';
import { fetchAddressByUserId } from '../addresses/addressSlice';

const CartPage: React.FC = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const order = useAppSelector((state) => state.orders.selectedItem);
  const address = useAppSelector((state) => state.address.items[0]);
  const userId = useAppSelector((state) => state.auth.user?.id);

  useEffect(() => {
    setCartItems(loadCart());
    if (userId) {
      dispatch(fetchAddressByUserId(userId));
    }
  }, [userId,dispatch]);

  const handleRemoveItem = (id: string) => {
    const updatedCart = cartItems.filter((item) => item.id !== id);
    setCartItems(updatedCart);
    saveCart(updatedCart);
  };

  const handleIncreaseQuantity = (id: string) => {
    const updatedCart = cartItems.map((item) =>
      item.id === id ? { ...item, quantity: item.quantity + 1 } : item
    );
    setCartItems(updatedCart);
    saveCart(updatedCart);
  };

  const handleDecreaseQuantity = (id: string) => {
    const updatedCart = cartItems.map((item) =>
      item.id === id && item.quantity > 1 ? { ...item, quantity: item.quantity - 1 } : item
    );
    setCartItems(updatedCart);
    saveCart(updatedCart);
  };

  const handleConfirmOrder = () => {
    const orderPayload = {
      addressId: address?.id,
      items: cartItems.map((item) => ({
        productId: item.id,
        quantity: item.quantity,
      })),
    };

    dispatch(ordersActions.createOne(orderPayload));
  };

  const handleCancelOrder = () => {
    navigate('/');
  };

  useEffect(() => {
    if (order) {
      navigate(`/order-details/${order.id}`);
    }
  }, [order, navigate]);

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Shopping Cart
      </Typography>
      <Grid container spacing={3}>
        {cartItems.map((item) => (
          <Grid item xs={12} key={item.id}>
            <Paper sx={{ padding: 2 }}>
              <Grid container spacing={2} alignItems="center">
                <Grid item xs={3}>
                  <Typography variant="h6">{item.productLineName}</Typography>
                </Grid>
                <Grid item xs={2}>
                  <Typography variant="body2">Size: {item.productSizeValue}</Typography>
                </Grid>
                <Grid item xs={2}>
                  <Typography variant="body2">Color: {item.productColorValue}</Typography>
                </Grid>
                <Grid item xs={2}>
                  <Typography variant="body2">Price: ${item.price.toFixed(2)}</Typography>
                </Grid>
                <Grid item xs={1}>
                  <Button onClick={() => handleDecreaseQuantity(item.id)}>-</Button>
                  <Typography>{item.quantity}</Typography>
                  <Button onClick={() => handleIncreaseQuantity(item.id)}>+</Button>
                </Grid>
                <Grid item xs={2}>
                  <Button variant="contained" color="secondary" onClick={() => handleRemoveItem(item.id)}>
                    Remove
                  </Button>
                </Grid>
              </Grid>
            </Paper>
          </Grid>
        ))}
        {cartItems.length === 0 && (
          <Box mt={2}>
            <Typography>No items in the cart</Typography>
          </Box>
        )}
      </Grid>
      {cartItems.length > 0 && (
        <Box mt={4} display="flex" justifyContent="space-between">
          <Button variant="contained" color="primary" onClick={handleConfirmOrder}>
            Confirm Order
          </Button>
          <Button variant="contained" color="secondary" onClick={handleCancelOrder}>
            Cancel
          </Button>
        </Box>
      )}
    </Container>
  );
};

export default CartPage;
