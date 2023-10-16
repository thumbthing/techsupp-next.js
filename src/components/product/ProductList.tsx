'use client';

import ProductType from '@/types/product.type';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ProductItem from './ProductItem';
import { getProductListFromDB } from '../../../httpservice/Product/ProductApiService';
import { setSingleProductItem, setFilteredProductList, setProductList } from '@/redux/slices/productSlice';
import { useRouter } from 'next/navigation';
import '../../style/product/productPage.style.css';
import { GlobalState } from '@/redux/store/globalStore';

function ProductList() {
  const router = useRouter();

  const productList = useSelector((state: GlobalState) => state.product.productList);
  const filteredList = useSelector((state: GlobalState) => state.product.filteredProductList);
  const pageScope = useSelector((state: GlobalState) => state.product.pageScope);
  const pageIndex = useSelector((state: GlobalState) => state.product.pageIndex);

  const dispatch = useDispatch();

  useEffect(() => {
    const getDataFromDB = async () => {
      try {
        const list: ProductType[] = await getProductListFromDB();
        dispatch(setProductList(list));
        dispatch(setFilteredProductList(list));
      } catch (error) {
        alert('fail to get data :(');
      }
    };
    if (productList.length === 0) {
      getDataFromDB();
    }
  }, [dispatch, productList]);

  const setSingleProduct = (product: ProductType) => {
    dispatch(setSingleProductItem(product));
  };

  return (
    <article className="product-box">
      <ul className="product-ul">
        {filteredList
          .filter((product, index) => index >= pageIndex && index < pageIndex + 5)
          .map((product) => (
            <li key={product._id} className="product-li" onClick={() => setSingleProduct(product)}>
              <ProductItem product={product} />
            </li>
          ))}
      </ul>
    </article>
  );
}

export default ProductList;
