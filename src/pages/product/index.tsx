'use client';

import ProductList from '@/components/product/ProductList';
import React from 'react';
import styled from 'styled-components';
import ProductProvider from '../../store/ProductProvider';
import ProductPageList from '@/components/product/ProductPageList';
import '../../style/product/productPage.style.css';

function ProductPage() {
  return (
    <ProductProvider>
      <main className="main-box">
        <ProductList />
        <ProductPageList />
      </main>
    </ProductProvider>
  );
}

export default ProductPage;
