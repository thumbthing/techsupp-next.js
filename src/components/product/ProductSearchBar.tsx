'use client';

import { getFilteredProductList, setOrderDirection, setPageIndex, setPageScope } from '@/redux/slices/productSlice';
import getRetrievedList from '@/util/product/getRetrievedList';
import { useSearchParams, useRouter } from 'next/navigation';
import React, { ChangeEvent, useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import '../../style/product/productPage.style.css';
import { GlobalState } from '@/redux/store/globalStore';

interface sortKeywordProps {
  keyword: filterKeyword;
  order: string;
}

const sortKey: sortKeywordProps[] = [
  {
    keyword: 'reset search result',
    order: 'ASC',
  },
  {
    keyword: 'reset search result',
    order: 'DESC',
  },
  {
    keyword: 'name',
    order: 'ASC',
  },
  {
    keyword: 'name',
    order: 'DESC',
  },
  {
    keyword: 'price',
    order: 'ASC',
  },
  {
    keyword: 'price',
    order: 'DESC',
  },
  {
    keyword: 'date',
    order: 'ASC',
  },
  {
    keyword: 'date',
    order: 'DESC',
  },
];

type filterKeyword = 'name' | 'price' | 'date' | 'reset search result';

function ProductSearchBar() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const scope = useSelector((state: GlobalState) => state.product.pageScope);
  const page = useSelector((state: GlobalState) => state.product.pageIndex);
  const order = useSelector((state: GlobalState) => state.product.orderDirection);
  const productList = useSelector((state: GlobalState) => state.product.productList);
  const filteredList = useSelector((state: GlobalState) => state.product.filteredProductList);

  const [keyword, setKeyword] = useState<filterKeyword>('reset search result');
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [isSearchingInFilteredList, setIsSearchingInFilteredList] = useState<boolean>(false);

  const dispatch = useDispatch();

  const sortProductList = useCallback(
    (keyword: filterKeyword, order: string) => {
      const selectedKeyword = sortKey.find((item) => item.keyword === keyword);

      if (selectedKeyword?.keyword) {
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

      if (inputElement && order) {
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
    if (searchParams) {
      const scope = searchParams.get('scope');
      const page = searchParams.get('page');
      const order = searchParams.get('order');

      if (scope && page && order) {
        dispatch(setOrderDirection(String(order)));
        dispatch(setPageIndex(Number(page)));
        dispatch(setPageScope(Number(scope)));
      }
    }
  }, [dispatch, searchParams]);

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
              <button
                onClick={() => sortProductList(item.keyword, item.order)}
              >{`${item.keyword} ${item.order}`}</button>
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
