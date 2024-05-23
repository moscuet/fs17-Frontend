import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import { productsReducer } from '../features/products/productsSlice';
import { productLinesReducer } from '../features/product-lines/productLinesSlice';
import { categoriesReducer } from '../features/categories/categoriesSlice';

export const store = configureStore({
  reducer: {
    products: productsReducer,
    productLines: productLinesReducer,
    categories: categoriesReducer
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
