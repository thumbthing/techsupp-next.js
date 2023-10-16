'use client';

import ProductList from '@/components/product/ProductList';
import React, { useEffect } from 'react';
import ProductPageList from '@/components/product/ProductPageList';
import '../../style/product/productPage.style.css';
import ProductSearchBar from '@/components/product/ProductSearchBar';
import ProductPageLoading from '@/components/loading/Product.Loading';
import { useDispatch, useSelector } from 'react-redux';
import { GlobalState } from '@/redux/store/globalStore';
import { setLoadingStatus } from '@/redux/slices/loadingSlice';

function ProductPage() {
  const loadingState = useSelector((state: GlobalState) => state.loading.isLoading);
  const dispatch = useDispatch();

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (loadingState === true) {
      timer = setTimeout(() => {
        dispatch(setLoadingStatus(loadingState));
      }, 2000);
    }
    return () => {
      clearTimeout(timer);
    };
  }, [loadingState, dispatch]);

  return (
    <>
      {loadingState ? (
        <ProductPageLoading />
      ) : (
        <main className="main-box">
          <ProductSearchBar />
          <ProductList />
          <ProductPageList />
        </main>
      )}
    </>
  );
}

export default ProductPage;
