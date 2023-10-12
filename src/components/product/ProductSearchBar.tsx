'use client';

import { RootState } from '@/store/productStore';
import { getFilteredProductList } from '@/store/slices/productSlice';
import ProductType from '@/types/product.type';
import { sortByDate, sortById, sortByName, sortByPrice } from '@/util/product/filterProductList';
import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

interface sortKeywordProps {
  keyword: filterKeyword;
  sortProcess: (
    productList: ProductType[],
    filteredList: ProductType[],
    searchKeyword: string,
    sortRule: string,
  ) => ProductType[] | undefined;
}

const sortKeyword: sortKeywordProps[] = [
  {
    keyword: 'name',
    sortProcess: sortByName,
  },
  {
    keyword: 'price',
    sortProcess: sortByPrice,
  },
  {
    keyword: 'date',
    sortProcess: sortByDate,
  },
  {
    keyword: '',
    sortProcess: sortById,
  },
];

type SortRule = 'ASC' | 'DESC';
type filterKeyword = 'name' | 'price' | 'date' | '';

function ProductSearchBar() {
  const productList = useSelector((state: RootState) => state.product.productList);
  const filteredList = useSelector((state: RootState) => state.product.filteredProductList);
  const [sortRule, setSortRule] = useState<SortRule>('ASC');
  const [keyword, setKeyword] = useState<filterKeyword>('');
  const [searchTerm, setSearchTerm] = useState<string>('');

  const dispatch = useDispatch();

  const handleList = useCallback(
    (keyword: filterKeyword, rule: SortRule) => {
      const selectedKeyword = sortKeyword.find((item) => item.keyword === keyword);

      if (selectedKeyword) {
        setKeyword(selectedKeyword.keyword);
        const newList = selectedKeyword.sortProcess(productList, filteredList, searchTerm, rule);
        if (newList !== undefined) {
          dispatch(getFilteredProductList(newList));
        }
      }
    },
    [productList, filteredList, searchTerm, dispatch],
  );

  const handleOrderRule = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      const rule = e.currentTarget.textContent;
      if ((rule === 'ASC' && rule !== sortRule) || (rule === 'DESC' && rule !== sortRule)) {
        setSortRule(rule);
        handleList(keyword, rule);
      }
    },
    [keyword, sortRule, handleList],
  );

  return (
    <nav>
      <div className="search-box">
        <ul className="search-ul">
          <li className="search-asc-desc-li">
            <button onClick={(e) => handleOrderRule(e)}>ASC</button>
          </li>
          <li className="search-asc-desc-li">
            <button onClick={(e) => handleOrderRule(e)}>DESC</button>
          </li>
          {sortKeyword.map((item) => (
            <li className="search-category-li" key={item.keyword}>
              <button onClick={() => handleList(item.keyword, sortRule)}>
                {item.keyword !== '' ? item.keyword : `reset`}
              </button>
            </li>
          ))}
          <li className="search-input-li">
            <div>
              <input placeholder="Search..."></input>
            </div>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default ProductSearchBar;
