'use client';

import ProductItem from '@/components/product/ProductItem';
import ProductList from '@/components/product/ProductList';
import React from 'react';
import styled from 'styled-components';
import ProductProvider from '../../store/ProductProvider';

function ProductPage() {
  return (
    <ProductProvider>
      <Main>
        <ProductList />
      </Main>
    </ProductProvider>
  );
}

const Main = styled.main`
  display: flex;
  justify-content: center;
  align-items: center;
`;

export default ProductPage;
