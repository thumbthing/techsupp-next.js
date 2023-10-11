'use client';

import ProductList from '@/components/product/ProductList';
import React from 'react';
import styled from 'styled-components';
import ProductProvider from '../../store/ProductProvider';
import ProductPageList from '@/components/product/ProductPageList';

function ProductPage() {
  return (
    <ProductProvider>
      <Main>
        <ProductList />
        <ProductPageList />
      </Main>
    </ProductProvider>
  );
}

const Main = styled.main`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

export default ProductPage;
