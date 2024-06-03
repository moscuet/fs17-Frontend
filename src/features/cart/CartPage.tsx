import React, { useState, useEffect } from "react";
import {
  Container,
  Grid,
  Paper,
  Typography,
  Box,
  IconButton,
} from "@mui/material";
import { CartItem, loadCart } from "../cart/cartUtils";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { useNavigate } from "react-router-dom";
import { fetchAddressByUserId } from "../addresses/addressSlice";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import {
  decreaseQuantity,
  increaseQuantity,
  removeFromCart,
  resetCart,
} from "./cartSlice";
import {
  CancelButton,
  ConfirmButton,
} from "../../shared-components/CustomButton";
import theme from "../../theme/theme";
import LoginModal from "../auth/LoginModal";
import AddAddress from "../addresses/AddAddress";
import ConfirmationDialog from "../../shared-components/ConfirmationDialog";
import { ordersActions } from "../orders/orderSlice";

const CartPage: React.FC = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const address = useAppSelector((state) => state.address.items[0]);
  const userId = useAppSelector((state) => state.auth.user?.id);
  const [modalOpen, setModalOpen] = useState(false);
  const [addressModalOpen, setAddressModalOpen] = useState(false);
  const [openConfirmDialog, setOpenConfirmDialog] = useState(false);


  useEffect(() => {
    setCartItems(loadCart());
    if (userId) {
      dispatch(fetchAddressByUserId(userId));
    }
  }, [userId, dispatch]);

  const handleRemoveItem = (id: string) => {
    const updatedItems = cartItems.filter((item) => item.id !== id);
    setCartItems(updatedItems);
    dispatch(removeFromCart(id));
  };

  const handleIncreaseQuantity = (id: string) => {
    const item = cartItems.find((item) => item.id === id);
    if (item) {
      dispatch(increaseQuantity(item.id));
      setCartItems((currentItems) =>
        currentItems.map((item) =>
          item.id === id ? { ...item, quantity: item.quantity + 1 } : item
        )
      );
    }
  };

  const handleDecreaseQuantity = (id: string) => {
    const item = cartItems.find((item) => item.id === id);
    if (item) {
      if (item.quantity > 1) {
        dispatch(decreaseQuantity(item.id));
        setCartItems((currentItems) =>
          currentItems.map((item) =>
            item.id === id ? { ...item, quantity: item.quantity - 1 } : item
          )
        );
      } else {
        dispatch(removeFromCart(item.id));
        setCartItems((currentItems) =>
          currentItems.filter((item) => item.id !== id)
        );
      }
    }
  };

  const handleConfirmOrder = async () => {
    if (!userId) {
      setModalOpen(true);
      return;
    }
    if (!address) {
      setAddressModalOpen(true);
      return;
    }
    const orderPayload = {
      addressId: address?.id,
      items: cartItems.map((item) => ({
        productId: item.id,
        quantity: item.quantity,
      })),
    };
    const orderCreated = await dispatch(ordersActions.createOne(orderPayload));
    if(orderCreated && orderCreated.payload) {
      dispatch(resetCart());
      setCartItems([]);
    }

    setOpenConfirmDialog(false);

  };

  const handleCancelOrder = () => {
    navigate("/");
  };


  function handleLoginModalClose(): void {
    setModalOpen(false);
  }

  return (
    <Container>
      <Typography variant="h4" gutterBottom m={2} textAlign={"center"}>
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
                  <Typography variant="body2">
                    Size: {item.productSizeValue}
                  </Typography>
                </Grid>
                <Grid item xs={2}>
                  <Typography variant="body2">
                    Color: {item.productColorValue}
                  </Typography>
                </Grid>
                <Grid item xs={2}>
                  <Typography variant="body2" color={theme.palette.info.main}>
                    Price: ${item.price.toFixed(2)}
                  </Typography>
                </Grid>
                <Grid
                  item
                  xs={1}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                >
                  <IconButton
                    size="small"
                    onClick={() => handleDecreaseQuantity(item.id)}
                  >
                    <RemoveIcon
                      style={{
                        border: "1px solid #ccc",
                        borderRadius: "50%",
                      }}
                    />
                  </IconButton>
                  <Typography>{item.quantity}</Typography>

                  <IconButton
                    size="small"
                    onClick={() => handleIncreaseQuantity(item.id)}
                  >
                    <AddIcon
                      style={{
                        border: "1px solid #ccc",
                        borderRadius: "50%",
                      }}
                    />
                  </IconButton>
                </Grid>
                <Grid item xs={2}>
                  <IconButton
                    color="warning"
                    onClick={() => handleRemoveItem(item.id)}
                  >
                    <DeleteIcon />
                  </IconButton>
                </Grid>
              </Grid>
            </Paper>
          </Grid>
        ))}
        {cartItems.length === 0 && (
          <Box mt={2} width="100%" textAlign="center">
            <Typography variant="h6" color="text.secondary">
              No items in the cart
            </Typography>
          </Box>
        )}
      </Grid>
      {cartItems.length > 0 && (
        <Box mt={4} mb={4} display="flex" justifyContent="space-between">
          <ConfirmButton onClick={()=>setOpenConfirmDialog(true)} text="Confirm Order" />
          <CancelButton onClick={handleCancelOrder} text=" Cancel" />
        </Box>
      )}
      <LoginModal
        open={modalOpen}
        handleClose={handleLoginModalClose}
        title={"You must be logged in to make order"}
      />
      {addressModalOpen && (
        <AddAddress isModal={true} onClose={() => setAddressModalOpen(false)} />
      )}
      
      <ConfirmationDialog
        open={openConfirmDialog}
        title="Confirm Order"
        onConfirm={handleConfirmOrder}
        onCancel={() => setOpenConfirmDialog(false)}
      >
        <Typography variant="body1">
          Are you sure you want to confirm your order?
        </Typography>
      </ConfirmationDialog>
    </Container>
  );
};

export default CartPage;
