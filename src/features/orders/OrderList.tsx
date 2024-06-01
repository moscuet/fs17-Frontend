import React, { useEffect } from "react";
import { Container, Typography } from "@mui/material";
import { useParams } from "react-router-dom";
import { useAppSelector, useAppDispatch } from "../../app/hooks";
import { ordersActions } from "./orderSlice";
import OrderItem from "./OrderItem";


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