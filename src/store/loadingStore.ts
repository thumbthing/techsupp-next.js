import { configureStore } from '@reduxjs/toolkit';
import loadingReducer from '../store/slices/loadingSlice';

export const loadingStore = configureStore({
  reducer: {
    loading: loadingReducer,
  },
});

export type RootState = ReturnType<typeof loadingStore.getState>;

export type AppDispatch = typeof loadingStore.dispatch;
