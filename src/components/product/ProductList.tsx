'use client';

import { RootState } from '@/store/productStore';
import ProductType from '@/types/product.type';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ProductItem from './ProductItem';
import { getProductListFromDB } from '../../../api/Product/ProductApiService';
import { getFilteredProductList, getProductList } from '@/store/slices/productSlice';
import { useRouter } from 'next/router';
import '../../style/product/productPage.style.css';

function ProductList() {
  const router = useRouter();

  const productList = useSelector((state: RootState) => state.product.productList);
  const filteredList = useSelector((state: RootState) => state.product.filteredProductList);
  const productScope = useSelector((state: RootState) => state.product.pageScope);
  const pageIndex = useSelector((state: RootState) => state.product.pageIndex);
  const pageScope = productScope * 50 + pageIndex * 5;

  const dispatch = useDispatch();

  useEffect(() => {
    const getDataFromDB = async () => {
      try {
        const list: ProductType[] = await getProductListFromDB();
        dispatch(getProductList(list));
        dispatch(getFilteredProductList(list));
      } catch (error) {
        alert('fail to get data :(');
      }
    };
    if (productList.length === 0) {
      getDataFromDB();
    }
  }, [dispatch, productList]);

  return (
    <article>
      <ul className="page-list">
        {filteredList
          .filter((product, index) => index >= pageScope && index < pageScope + 5)
          .map((product) => (
            <li key={product._id} className="page-button">
              <ProductItem product={product} />
            </li>
          ))}
      </ul>
    </article>
  );
}

export default ProductList;
