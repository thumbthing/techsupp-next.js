import ProductType from '@/types/product.type';
import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

interface productProps {
  productList: ProductType[];
  singleProduct: ProductType;
  filteredProductList: ProductType[];
  pageIndex: number;
  pageList: number[];
  pageScope: number;
  orderDirection: string;
}

export const singleDefaultProduct = {
  _id: '',
  name: 'string',
  category: 'string',
  total_invest_price: 0,
  date: '',
  information: '',
  invest_price: 0,
  isInvesting: true,
};

const initialState: productProps = {
  productList: [],
  singleProduct: singleDefaultProduct,
  filteredProductList: [],
  pageIndex: 0,
  pageList: [],
  pageScope: 0,
  orderDirection: 'ASC',
};

export const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {
    setProductList: (draftState, action: PayloadAction<ProductType[]>) => {
      const productList = action.payload;
      draftState.productList = productList;
    },
    setFilteredProductList: (draftState, action: PayloadAction<ProductType[]>) => {
      const filteredList = action.payload;
      draftState.filteredProductList = filteredList;
    },
    setSingleProductItem: (draftState, action: PayloadAction<ProductType>) => {
      const singleItem = action.payload;
      draftState.singleProduct = singleItem;
    },
    removeSingleProduct: (draftState) => {
      draftState.singleProduct = singleDefaultProduct;
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
    setOrderDirection: (draftState, action: PayloadAction<string>) => {
      const order = action.payload;
      draftState.orderDirection = order;
    },
  },
});

export const {
  setProductList,
  setFilteredProductList,
  setSingleProductItem,
  removeSingleProduct,
  setPageIndex,
  setPageList,
  setPageScope,
  setOrderDirection,
} = productSlice.actions;

export default productSlice.reducer;
