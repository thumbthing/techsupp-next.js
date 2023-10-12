'use client';

import { RootState } from '@/store/productStore';
import { setPageIndex, setPageList, setPageScope } from '@/store/slices/productSlice';
import ProductType from '@/types/product.type';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import '../../style/product/productPage.style.css';

function ProductPageList() {
  const dispatch = useDispatch();
  const router = useRouter();

  const filteredList = useSelector((state: RootState) => state.product.filteredProductList);
  const pageList = useSelector((state: RootState) => state.product.pageList);
  const pageScope = useSelector((state: RootState) => state.product.pageScope);
  const orderDirection = useSelector((state: RootState) => state.product.orderDirection);
  const pageIndex = useSelector((state: RootState) => state.product.pageIndex);

  const prevScope = pageScope - 1 >= 0 ? pageScope - 1 : 0;
  const nextScope = pageScope + 1 < Math.ceil(filteredList.length / 50) ? pageScope + 1 : pageScope;

  useEffect(() => {
    const getPages = (productList: ProductType[]) => {
      const maxPageIndex = Math.ceil(productList.length / 5);
      const pages = [];
      for (let i = 0; i < maxPageIndex; i++) {
        pages.push(i);
      }
      return pages;
    };

    const filteredPageList = getPages(filteredList);
    dispatch(setPageList(filteredPageList));
    dispatch(setPageIndex(Number(router.query.page)));
    dispatch(setPageScope(Number(router.query.scope)));
  }, [filteredList, dispatch, router]);

  const changePage = (pageNumber: number) => {
    router.push(`/product?scope=${pageScope}&page=${pageNumber}&order=${orderDirection}`);
  };

  const decreaseScope = () => {
    const prevPageIndex = prevScope * 50;
    dispatch(setPageIndex(prevPageIndex));
    const firstPageOfScope = prevScope * 10;
    router.push(`/product?scope=${prevScope}&page=${firstPageOfScope}&order=${orderDirection}`);
  };

  const increaseScope = () => {
    const nextPageIndex = nextScope * 50;
    dispatch(setPageIndex(nextPageIndex));
    const firstPageOfScope = nextScope * 10;
    router.push(`/product?scope=${nextScope}&page=${firstPageOfScope}&order=${orderDirection}`);
  };

  return (
    <article>
      <ul className="page-ul">
        <li key={`page-previous`} className="page-li">
          <button onClick={decreaseScope}>이전</button>
        </li>
        {pageList
          .filter((item, index) => index >= pageScope * 10 && index < pageScope * 10 + 10)
          .map((pageListIndex) => (
            <li key={`page-${pageListIndex}`} className="page-li">
              <button onClick={() => changePage(pageListIndex)}>{pageListIndex + 1}</button>
            </li>
          ))}
        <li key={`page-next`} className="page-li">
          <button onClick={increaseScope}>이후</button>
        </li>
      </ul>
    </article>
  );
}

export default ProductPageList;
