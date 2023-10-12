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
import styled from 'styled-components';

function ProductList() {
  const router = useRouter();

  const productList = useSelector((state: RootState) => state.product.productList);
  const filteredList = useSelector((state: RootState) => state.product.filteredProductList);
  const pageScope = useSelector((state: RootState) => state.product.pageScope);
  const pageIndex = useSelector((state: RootState) => state.product.pageIndex);

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
    <article className="product-box">
      <ul className="product-ul">
        {filteredList
          .filter((product, index) => index >= pageIndex && index < pageIndex + 5)
          .map((product) => (
            <li key={product._id} className="product-li">
              <ProductItem product={product} />
            </li>
          ))}
      </ul>
    </article>
  );
}

export default ProductList;
