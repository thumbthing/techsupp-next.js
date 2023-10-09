'use client';

import { RootState } from '@/store/productStore';
import ProductType from '@/types/product.type';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ProductItem from './ProductItem';
import { getProductListFromDB } from '../../../api/Product/ProductApiService';
import { getFilteredProductList, getProductList } from '@/store/slices/productSlice';
import axios from 'axios';

function ProductList() {
  const productList = useSelector((state: RootState) => state.product.productList);
  const filteredList = useSelector((state: RootState) => state.product.filteredProductList);
  const dispatch = useDispatch();

  useEffect(() => {
    const getDataFromDB = async () => {
      try {
        const list = await getProductListFromDB();
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

  const selectList = (list: ProductType[], modifiedList: ProductType[] | undefined): ProductType[] => {
    if (modifiedList === undefined) {
      return list;
    } else {
      return modifiedList;
    }
  };

  return (
    <article>
      <ul>
        {filteredList.map((product) => (
          <li key={product._id}>
            <ProductItem product={product} />
          </li>
        ))}
      </ul>
    </article>
  );
}

export default ProductList;
