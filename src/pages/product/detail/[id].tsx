import productImage from '@/util/product/product.image';
import Image from 'next/image';
import React from 'react';
import styled from 'styled-components';

function ProductDetailPage() {
  const image = productImage('camera');
  const date = Date();
  return (
    <Main>
      <Content>
        <ProductContainer>
          <ImageBox>
            <Image src={image} alt={'test'} width={400} height={400} />
          </ImageBox>
          <InformationBox>제품 설명</InformationBox>
        </ProductContainer>
        <ProductContainer>
          <ContentBox>
            <span>제품명</span>
          </ContentBox>
          <ContentBox>
            <span>투자 마감일</span>
          </ContentBox>
          <ContentBox>
            <span>{date}</span>
            <span>기준 현재 투자율:</span>
          </ContentBox>
          <ButtonBox>
            <button>투자하기</button>
            <button>즐겨찾기</button>
          </ButtonBox>
        </ProductContainer>
      </Content>
    </Main>
  );
}

const Main = styled.main`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Content = styled.section`
  display: flex;
  flex-direction: row;
  position: relative;
  border: 1px solid;
`;

const ProductContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  border: 1px solid;
  width: 400px;
  height: 1000px;
`;

const ImageBox = styled.div`
  width: 400px;
  height: 400px;
  margin: 2px;
`;

const InformationBox = styled.div`
  width: 350px;
  height: 350px;
  border: 1px solid;
`;

const ContentBox = styled.div`
  width: 350px;
  height: 100px;
  border: 1px solid;
  margin: 10px;
`;

const ButtonBox = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  width: 350px;
  height: 100px;
  border: 1px solid;
  margin: 10px;
`;

export default ProductDetailPage;
