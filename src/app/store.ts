import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import { productsReducer } from '../features/products/productsSlice';
import { productLinesReducer } from '../features/product-lines/productLinesSlice';
import { categoriesReducer } from '../features/categories/categoriesSlice';
import authReducer from '../features/auth/authSlice';
import { userReducer } from '../features/users/userSlice';
import cartReducer from "../features/cart/cartSlice";
import { addressReducer } from '../features/addresses/addressSlice';
import { ordersReducer } from '../features/order-items/orderSlice';
export const store = configureStore({
  reducer: {
    products: productsReducer,
    auth: authReducer,
    productLines: productLinesReducer,
    categories: categoriesReducer,
    user: userReducer,
    address:addressReducer,
    cart: cartReducer,
    orders:ordersReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
