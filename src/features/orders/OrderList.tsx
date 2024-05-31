import React, { useEffect } from "react";
import { Container, Paper, Typography, Box, Button } from "@mui/material";
import { useParams, useNavigate } from "react-router-dom";
import { useAppSelector, useAppDispatch } from "../../app/hooks";
import { ordersActions } from "./orderSlice";
import { PrimaryButton } from "../../shared-components/CustomButton";
import OrderItem from "./OrderItem";
import { OrderReadDto } from "./orderDto";


const OrderList: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (id) {
      dispatch(ordersActions.fetchAll());
    }
  }, [id, dispatch]);

  const orders = useAppSelector((state) => state.orders);

  console.log(orders);
  if (orders.loading) {
    return <Typography>Loading...</Typography>;
  }

  if (orders.items.length < 1) {
    return <Typography>No order found</Typography>;
  }

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Order Lists
      </Typography>
      {orders.items.map((order) => (
        <OrderItem key={order.id} order={order} />
      ))}
    </Container>
  );
};

export default OrderList;
