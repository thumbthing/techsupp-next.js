import ProductType from '@/types/product.type';
import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

interface productProps {
  productList: ProductType[];
  singleProduct: ProductType | undefined;
  filteredProductList: ProductType[];
  pageIndex: number;
  pageList: number[];
  pageScope: number;
}

const initialState: productProps = {
  productList: [],
  singleProduct: undefined,
  filteredProductList: [],
  pageIndex: 0,
  pageList: [],
  pageScope: 0,
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
    setPageIndex: (draftState, action: PayloadAction<number>) => {
      const index = action.payload;
      draftState.pageIndex = index;
    },
    setPageList: (draftState, action: PayloadAction<number[]>) => {
      const pageList = action.payload;
      draftState.pageList = pageList;
    },
    setPageScope: (draftState, action: PayloadAction<number>) => {
      const scope = action.payload;
      draftState.pageScope = scope;
    },
  },
});

export const {
  getProductList,
  getFilteredProductList,
  getSingleProduct,
  removeSingleProduct,
  setPageIndex,
  setPageList,
  setPageScope,
} = productSlice.actions;

export default productSlice.reducer;
