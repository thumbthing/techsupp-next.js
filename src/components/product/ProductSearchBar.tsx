'use client';

import { RootState } from '@/store/productStore';
import { getFilteredProductList, setOrderDirection, setPageIndex, setPageScope } from '@/store/slices/productSlice';
import ProductType from '@/types/product.type';
import getRetrievedList from '@/util/product/getRetrievedList';
import { useRouter } from 'next/router';
import React, { ChangeEvent, useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

interface sortKeywordProps {
  keyword: filterKeyword;
}

const sortKey: sortKeywordProps[] = [
  {
    keyword: '',
  },
  {
    keyword: 'name',
  },
  {
    keyword: 'price',
  },
  {
    keyword: 'date',
  },
];

type filterKeyword = 'name' | 'price' | 'date' | '';
type routerQuery = {
  scope: string;
  page: string;
  order: string;
};

function ProductSearchBar() {
  const router = useRouter();
  const { scope, page, order } = router.query as routerQuery;

  const productList = useSelector((state: RootState) => state.product.productList);
  const filteredList = useSelector((state: RootState) => state.product.filteredProductList);
  const orderDirection = useSelector((state: RootState) => state.product.orderDirection);

  const [keyword, setKeyword] = useState<filterKeyword>('');
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [isSearchingInFilteredList, setIsSearchingInFilteredList] = useState<boolean>(false);

  const dispatch = useDispatch();

  const sortProductList = useCallback(
    (keyword: filterKeyword, order: string) => {
      const selectedKeyword = sortKey.find((item) => item.keyword === keyword);

      if (selectedKeyword) {
        setKeyword(selectedKeyword.keyword);
        const newList = getRetrievedList(
          productList,
          filteredList,
          searchTerm,
          order,
          isSearchingInFilteredList,
          selectedKeyword.keyword,
        );

        if (newList !== undefined) {
          dispatch(getFilteredProductList(newList));
        }
      }
    },
    [productList, filteredList, dispatch, isSearchingInFilteredList, searchTerm],
  );

  const selectOrderDirection = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      const orderValue = e.currentTarget.textContent;

      if (orderValue) {
        dispatch(setOrderDirection(orderValue));
        sortProductList(keyword, orderValue);

        router.push(`/product?scope=${scope}&page=${page}&order=${orderValue}`);
      }
    },
    [keyword, sortProductList, dispatch, router, scope, page],
  );

  const getSearchedList = useCallback(
    (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();

      const inputElement = (e.currentTarget as HTMLFormElement).elements.namedItem('search') as HTMLInputElement | null;

      if (inputElement) {
        const searchTerm = inputElement.value;
        setSearchTerm(searchTerm);
        sortProductList(keyword, order);
      }
    },
    [keyword, order, sortProductList],
  );

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const inputText = e.target.value;
    setSearchTerm(inputText);
  };

  const handleSearchInSearched = (e: ChangeEvent<HTMLInputElement>) => {
    const isChecked = e.target.checked;
    setIsSearchingInFilteredList(isChecked);
  };

  useEffect(() => {
    const { page, scope, order } = router.query as routerQuery;
    dispatch(setOrderDirection(order));
    dispatch(setPageIndex(Number(page)));
    dispatch(setPageScope(Number(scope)));
  }, [dispatch, router]);

  return (
    <nav>
      <div className="search-box">
        <ul className="search-ul">
          <li className="search-asc-desc-li">
            <button onClick={(e) => selectOrderDirection(e)}>ASC</button>
          </li>
          <li className="search-asc-desc-li">
            <button onClick={(e) => selectOrderDirection(e)}>DESC</button>
          </li>
          {sortKey.map((item) => (
            <li className="search-category-li" key={item.keyword}>
              <button onClick={() => sortProductList(item.keyword, order)}>{item.keyword}</button>
            </li>
          ))}
          <li className="search-input-li">
            <form onSubmit={(e) => getSearchedList(e)}>
              <div>
                <input
                  type="checkbox"
                  onChange={(e) => handleSearchInSearched(e)}
                  checked={isSearchingInFilteredList}
                />
                <p>검색 결과 내 재 검색</p>
              </div>
              <div>
                <input type="search" name="search" placeholder="Search..." onChange={(e) => handleInputChange(e)} />
                <button type="submit">검색</button>
              </div>
            </form>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default ProductSearchBar;
