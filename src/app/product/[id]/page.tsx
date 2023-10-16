'use client';

import useDateParser from '@/hooks/useDateParser';
import {
  setFilteredProductList,
  setProductList,
  setSingleProductItem,
  singleDefaultProduct,
} from '@/redux/slices/productSlice';
import { GlobalState } from '@/redux/store/globalStore';
import ProductType from '@/types/product.type';
import productImage from '@/util/product/product.image';
import Image from 'next/image';
import { useParams, usePathname, useRouter, useSearchParams } from 'next/navigation';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { getProductListFromDB, getSingleProductFromDB } from '../../../../httpservice/Product/ProductApiService';

const defaultProduct = singleDefaultProduct;
const productPagePath = `/product?scope=0&page=0&order=ASC`;

function ProductDetailPage() {
  const router = useRouter();
  const searchParam = useSearchParams();
  const pathName = usePathname();
  const params = useParams();
  const dispatch = useDispatch();

  const primaryProductList: ProductType[] = useSelector((state: GlobalState) => state.product.productList);
  const singleProduct: ProductType = useSelector((state: GlobalState) => state.product.singleProduct);
  const { _id, name, category, total_invest_price, date, information, invest_price, isInvesting } = singleProduct;

  const isSingleProductDefault = JSON.stringify(singleProduct) === JSON.stringify(defaultProduct);

  const imagePath = productImage(`${category}`);
  const productDate = useDateParser(date);

  useEffect(() => {
    const checkPrimaryList = async (productList: ProductType[]) => {
      try {
        const isProductListEmpty = productList.length === 0;
        if (isProductListEmpty) {
          const productList = await getProductListFromDB();
          dispatch(setProductList(productList));
          dispatch(setFilteredProductList(productList));
        }
      } catch (error) {
        console.error(error);
        return Promise.reject({
          status: 500,
          message: 'Internal server error PS',
        });
      }
    };

    checkPrimaryList(primaryProductList);
  }, [primaryProductList, dispatch]);

  useEffect(() => {
    const getSingleProductFromUrl = async (productList: ProductType[], product: ProductType) => {
      try {
        if (productList.length !== 0) {
          if (isSingleProductDefault) {
            const productId = params?.id;

            const isProductIdValid =
              productId !== undefined && !Array.isArray(productId) && typeof productId === 'string';
            if (isProductIdValid) {
              const singleProduct = productList.find((item) => item._id === productId);
              if (singleProduct) {
                dispatch(setSingleProductItem(singleProduct));
              }
            }
          }
        } else {
          const productId = params?.id;
          const isProductIdValid =
            productId !== undefined && !Array.isArray(productId) && typeof productId === 'string';
          if (isProductIdValid) {
            const dataFromDb = await getSingleProductFromDB(productId);
            dispatch(setSingleProductItem(dataFromDb));
          }
        }
      } catch (error) {
        console.error(error);
        return Promise.reject({
          status: 500,
          message: 'Internal server error SP',
        });
      }
    };
    getSingleProductFromUrl(primaryProductList, singleProduct);
  }, [isSingleProductDefault, primaryProductList, singleProduct, router, searchParam, pathName, params, dispatch]);

  return (
    <Main>
      <Content key={_id}>
        <ProductContainer>
          <ImageBox>
            <Image src={imagePath} alt={name} width={400} height={400} />
          </ImageBox>
          <InformationBox>
            <span>제품 설명</span>
            <div>
              <span>{information}</span>
            </div>
          </InformationBox>
        </ProductContainer>
        <ProductContainer>
          <ContentBox>
            <span>제품명</span>
            <div>
              <span>{name}</span>
            </div>
          </ContentBox>
          <ContentBox>
            <span>투자 마감일</span>
            <div>
              <span>{productDate}</span>
              {/* <span>{date}</span> */}
            </div>
          </ContentBox>
          <ContentBox>
            <span>기준 현재 투자율:</span>
            <div>
              <span>계산 필요</span>
            </div>
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
