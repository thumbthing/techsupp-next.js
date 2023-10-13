import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

interface loadingProps {
  isLoading: boolean;
}

const initialState: loadingProps = {
  isLoading: true,
};

export const loadingSlice = createSlice({
  name: 'loading',
  initialState,
  reducers: {
    setLoadingStatus: (draftState, action: PayloadAction<boolean>) => {
      const loadingStatus = !action.payload;
      draftState.isLoading = loadingStatus;
    },
  },
});

export const { setLoadingStatus } = loadingSlice.actions;

export default loadingSlice.reducer;
