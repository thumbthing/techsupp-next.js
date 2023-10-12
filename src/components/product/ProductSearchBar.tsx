'use client';

import { RootState } from '@/store/productStore';
import { getFilteredProductList } from '@/store/slices/productSlice';
import ProductType from '@/types/product.type';
import { sortByDate, sortById, sortByName, sortByPrice } from '@/util/product/filterProductList';
import React, { ChangeEvent, useCallback, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

interface sortKeywordProps {
  keyword: filterKeyword;
  sortProcess: (
    productList: ProductType[],
    filteredList: ProductType[],
    searchKeyword: string,
    sortRule: string,
    isChecked: boolean,
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
  const [isSearchingInFilteredList, setIsSearchingInFilteredList] = useState<boolean>(false);

  const dispatch = useDispatch();

  const handleList = useCallback(
    (keyword: filterKeyword, rule: SortRule, searchText: string, isChecked: boolean) => {
      const selectedKeyword = sortKeyword.find((item) => item.keyword === keyword);

      if (selectedKeyword) {
        setKeyword(selectedKeyword.keyword);
        const newList = selectedKeyword.sortProcess(productList, filteredList, searchText, rule, isChecked);
        if (newList !== undefined) {
          dispatch(getFilteredProductList(newList));
        }
      }
    },
    [productList, filteredList, dispatch],
  );

  const handleOrderRule = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      const rule = e.currentTarget.textContent;
      if ((rule === 'ASC' && rule !== sortRule) || (rule === 'DESC' && rule !== sortRule)) {
        setSortRule(rule);
        handleList(keyword, rule, searchTerm, isSearchingInFilteredList);
      }
    },
    [keyword, sortRule, searchTerm, isSearchingInFilteredList, handleList],
  );

  const getSearchedList = useCallback(
    (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();

      const inputElement = (e.currentTarget as HTMLFormElement).elements.namedItem('search') as HTMLInputElement | null;

      if (inputElement) {
        const searchTerm = inputElement.value;
        setSearchTerm(searchTerm);
        handleList(keyword, sortRule, searchTerm, isSearchingInFilteredList);
      }
    },
    [keyword, sortRule, isSearchingInFilteredList, handleList],
  );

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const inputText = e.target.value;
    setSearchTerm(inputText);
  };

  const handleSearchInSearched = (e: ChangeEvent<HTMLInputElement>) => {
    const isChecked = e.target.checked;
    setIsSearchingInFilteredList(isChecked);
  };

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
              <button onClick={() => handleList(item.keyword, sortRule, searchTerm, isSearchingInFilteredList)}>
                {item.keyword !== '' ? item.keyword : `order reset`}
              </button>
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
