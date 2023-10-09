'use client';

import React from 'react';
import Image from 'next/image';
import productImage from '@/util/product/product.image';
import styled from 'styled-components';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

function ProductItem() {
  const productPath = usePathname();
  const imagePath = productImage('camera');
  const detailPath = `${productPath}/detail`;

  return (
    <StyledLink
      href={{
        pathname: `${detailPath}/[id]`,
        query: { id: 1 },
      }}
    >
      <ProductBox>
        <ImageBox>
          <Image src={imagePath} alt={'asdf'} width={150} height={150} />
          {/* category */}
        </ImageBox>
        <div>
          <div>
            <Text>제품명</Text>
            {/* name */}
            <div>
              <Text>투자 마감일: </Text>
              {/* date */}
              <Text>개인 투자 금액: </Text>
              {/* invest_price */}
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
