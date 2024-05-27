
import createBaseSlice from "../../app/baseSlice";
import { OrderCreateDto, OrderReadDto } from "../orders/orderDto";

const { slice, actions } = createBaseSlice<OrderReadDto, OrderCreateDto, OrderCreateDto>("orders", "/api/v1/orders");

export const ordersReducer = slice.reducer;
export const ordersActions = actions;
