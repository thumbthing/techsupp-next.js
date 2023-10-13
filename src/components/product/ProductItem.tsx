'use client';

import React from 'react';
import Image from 'next/image';
import productImage from '@/util/product/product.image';
import styled from 'styled-components';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import ProductType from '@/types/product.type';

interface ProductItemProps {
  product: ProductType;
}

function ProductItem({ product }: ProductItemProps) {
  const { _id, name, category, date, invest_price } = product;
  const productPath = usePathname();
  const detailPath = `${productPath}/detail?name=${name}`;
  const imagePath = productImage(`${category}`);

  return (
    <StyledLink href={detailPath}>
      <ProductBox>
        <ImageBox>
          <Image src={imagePath} alt={category} width={150} height={150} />
        </ImageBox>
        <div>
          <div>
            <Text>{name}</Text>
            <div>
              <Text>{`D-day: ${date}`}</Text>
              <Text>{`개인 투자 금액: ${invest_price}`}</Text>
            </div>
            <div>
              <Text>투자율: </Text>
              <button>즐겨찾기</button>
            </div>
          </div>
        </div>
      </ProductBox>
    </StyledLink>
  );
}

const StyledLink = styled(Link)`
  color: inherit;
  text-decoration: none;
  display: flex;
`;

const ProductBox = styled.article`
  display: flex;
  flex-direction: row;
  border: 2px solid;
  border-radius: 20px;
  margin: 3px;
  width: 50em;
`;

const ImageBox = styled.div`
  margin: 3px;
`;

const Text = styled.span`
  text-decoration: none;
`;

export default ProductItem;
