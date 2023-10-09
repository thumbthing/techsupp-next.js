import { configureStore } from '@reduxjs/toolkit';
import productReducer from '../store/slices/productSlice';

export const productStore = configureStore({
  reducer: {
    product: productReducer,
  },
});

export type RootState = ReturnType<typeof productStore.getState>;

export type AppDispatch = typeof productStore.dispatch;
