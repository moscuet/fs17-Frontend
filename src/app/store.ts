import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import { productsReducer } from '../features/products/productsSlice';
import { productLinesReducer } from '../features/product-lines/productLinesSlice';
import { categoriesReducer } from '../features/categories/categoriesSlice';
import authReducer from '../features/auth/authSlice';
import { productLineDetailsReducer } from '../features/product-lines/productLineDetailsSlice';
import { userReducer } from '../features/users/userSlice';
import { addressReducer } from '../features/addresses/addressSlice';
import { cartReducer } from '../features/cart/cartSlice';
export const store = configureStore({
  reducer: {
    products: productsReducer,
    auth: authReducer,
    productLines: productLinesReducer,
    productLineDetails: productLineDetailsReducer,
    categories: categoriesReducer,
    user: userReducer,
    address:addressReducer,
    cart: cartReducer,

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
