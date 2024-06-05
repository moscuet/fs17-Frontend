import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import { productsReducer } from '../features/products/productsSlice';
import { productLinesReducer } from '../features/product-lines/productLinesSlice';
import { categoriesReducer } from '../features/categories/categoriesSlice';
import { userReducer } from '../features/users/userSlice';
import cartReducer from "../features/cart/cartSlice";
import { addressReducer } from '../features/addresses/addressSlice';
import toastMiddleware from '../middleware/toastNotificationMiddleware';
import { ordersReducer } from '../features/orders/orderSlice';
import { authReducer } from '../features/auth/authSlice';
import { colorsReducer } from '../features/product-colors/productColorSlice';
import { sizesReducer } from '../features/product-sizes/productSizeSlice';
export const store = configureStore({
  reducer: {
    products: productsReducer,
    productLines: productLinesReducer,
    categories: categoriesReducer,
    user: userReducer,
    address:addressReducer,
    cart: cartReducer,
    orders:ordersReducer,
    auth: authReducer,
    colors:colorsReducer,
    sizes:sizesReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(toastMiddleware),
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
