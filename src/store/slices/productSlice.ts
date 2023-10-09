import ProductType from '@/types/product.type';
import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

interface productProps {
  productList: ProductType[];
  singleProduct: ProductType | undefined;
  filteredProductList: ProductType[];
}

const initialState: productProps = {
  productList: [],
  singleProduct: undefined,
  filteredProductList: [],
};

export const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {
    getProductList: (draftState, action: PayloadAction<ProductType[]>) => {
      const productList = action.payload;
      draftState.productList = productList;
    },
    getFilteredProductList: (draftState, action: PayloadAction<ProductType[]>) => {
      const filteredList = action.payload;
      draftState.filteredProductList = filteredList;
    },
    getSingleProduct: (draftState, action: PayloadAction<ProductType>) => {
      const singleItem = action.payload;
      draftState.singleProduct = singleItem;
    },
    removeSingleProduct: (draftState) => {
      draftState.singleProduct = undefined;
    },
  },
});

export const { getProductList, getFilteredProductList, getSingleProduct, removeSingleProduct } = productSlice.actions;

export default productSlice.reducer;
