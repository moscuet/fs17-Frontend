import createBaseSlice from "../../app/baseSlice";
import { OrderCreateDto, OrderReadDto, OrderUpdateDto } from "./orderDto";

const { slice, actions } = createBaseSlice<OrderReadDto, OrderCreateDto, OrderUpdateDto>("Orders", "/api/v1/Orders");

export const ordersReducer = slice.reducer;
export const ordersActions = actions;



