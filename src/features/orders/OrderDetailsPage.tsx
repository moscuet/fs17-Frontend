import React, { useEffect } from "react";
import {
  Card,
  CardContent,
  Typography,
  ListItem,
  Divider,
  Box,
  CircularProgress
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { ordersActions } from "./orderSlice";
import { getStatusColor } from "./helpers/getStatusColor";


const OrderDetailsPage: React.FC =  () => {
  const theme = useTheme();
  const dispatch = useAppDispatch();
  const { id } = useParams<{ id: string }>();

  useEffect(() => {
    if (id) {
       dispatch(ordersActions.fetchById(id));
    }
  }, [id, dispatch]);

  const { selectedItem: order, loading, error } = useAppSelector((state) => state.orders);


  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh">
        <CircularProgress />
      </Box>
    );
  }

  if (!order || error) {
    return (
      <Box textAlign="center" pt={5}>
        <Typography variant="h6">Order not found or an error occurred.</Typography>
      </Box>
    );
  }

  console.log(order);

  return (
    <Card raised sx={{ maxWidth: 600, margin: "20px auto" }}>
      <CardContent>
        <Typography variant="h5" component="div">
          Order Details
        </Typography>
        <Typography color="text.primary" gutterBottom>
          Order ID: {order.id}
        </Typography>
        <Typography
          variant="body2"
          style={{ color: getStatusColor(order.status) }}
        >
          Status: {order.status}
        </Typography>
        <Typography variant="body2" sx={{ mb: 2 }}>
          Total:
          <span style={{ color: theme.palette.text.secondary }}>
            ${order.total.toFixed(2)}
          </span>
        </Typography>
        <Divider />

        {order?.items?.map((item, index) => (
          <ListItem
            key={item.id}
            divider={index !== order.items.length - 1}
            sx={{
              display: "flex",
              flexDirection: "row",
              alignItems: "flex-start",
            }}
          >
            <Box sx={{ width: "40px", textAlign: "right", mr: 2 }}>
              <Typography variant="body1">{index + 1}.</Typography>
            </Box>
            <Box sx={{ flex: 1 }}>
              <Typography variant="body2">
                Product ID: {item.productId}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Quantity: {item.quantity} x ${item.price.toFixed(2)} = $
                {(item.price * item.quantity).toFixed(2)}
              </Typography>
            </Box>
          </ListItem>
        ))}
      </CardContent>
    </Card>
  );
};

export default OrderDetailsPage;
