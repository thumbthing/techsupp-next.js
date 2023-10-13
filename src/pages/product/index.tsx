'use client';

import ProductList from '@/components/product/ProductList';
import React from 'react';
import ProductProvider from '../../store/provider/ProductProvider';
import ProductPageList from '@/components/product/ProductPageList';
import '../../style/product/productPage.style.css';
import ProductSearchBar from '@/components/product/ProductSearchBar';
import LoadingProvider from '@/store/provider/LoadingProvider';

function ProductPage() {
  return (
    <LoadingProvider>
      <ProductProvider>
        <main className="main-box">
          <ProductSearchBar />
          <ProductList />
          <ProductPageList />
        </main>
      </ProductProvider>
    </LoadingProvider>
  );
}

export default ProductPage;
