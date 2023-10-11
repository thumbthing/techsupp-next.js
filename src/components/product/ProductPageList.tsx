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
  const pageIndex = useSelector((state: RootState) => state.product.pageIndex);
  const pageScope = useSelector((state: RootState) => state.product.pageScope);

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
    dispatch(setPageScope(Number(router.query.scope)));
  }, [filteredList, dispatch, router]);

  const changePage = (pageNumber: number) => {
    dispatch(setPageIndex(pageNumber));
  };

  const decreaseScope = () => {
    router.push(`/product?scope=${prevScope}`);
  };

  const increaseScope = () => {
    router.push(`/product?scope=${nextScope}`);
  };

  useEffect(() => {}, []);

  return (
    <article>
      <ul className="page-ul">
        <li key={`page-previous`} className="page-li">
          <button onClick={decreaseScope}>이전</button>
        </li>
        {pageList
          .filter((item, index) => index >= pageScope * 10 && index < pageScope * 10 + 10)
          .map((item) => (
            <li key={`page=${item}`} className="page-li">
              <button onClick={() => changePage(item)}>{item + 1}</button>
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
