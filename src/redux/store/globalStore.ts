import { configureStore } from '@reduxjs/toolkit';
import loadinglReducer from '../slices/loadingSlice';
import productReducer from '../slices/productSlice';

export const globalStore = configureStore({
  reducer: {
    loading: loadinglReducer,
    product: productReducer,
  },
});

export type GlobalState = ReturnType<typeof globalStore.getState>;

export type AppDispatch = typeof globalStore.dispatch;
