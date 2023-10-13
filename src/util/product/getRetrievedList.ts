import ProductType from '@/types/product.type';

function getRetrievedList(
  primaryList: ProductType[],
  modifiedList: ProductType[],
  searchText: string,
  orderDirection: string,
  isChecked: boolean,
  keyword: 'name' | 'price' | 'date' | 'reset search result',
) {
  const selectList = (isChecked: boolean, text: string, primaryList: ProductType[], modifiedList: ProductType[]) => {
    if (isChecked) {
      const searchedList = [...modifiedList].filter((product) => product.name.includes(text));
      return searchedList;
    } else {
      const searchInRetrievedList = [...primaryList].filter((product) => product.name.includes(text));
      return searchInRetrievedList;
    }
  };

  const sortByName = (list: ProductType[], orderDirection: String) => {
    const result = [...list].sort((a, b) =>
      orderDirection === 'ASC' ? a.name.localeCompare(b.name) : b.name.localeCompare(a.name),
    );
    return result;
  };

  const sortByPrice = (list: ProductType[], orderDirection: String) => {
    const result = [...list].sort((a, b) =>
      orderDirection === 'ASC' ? a.invest_price - b.invest_price : b.invest_price - a.invest_price,
    );
    return result;
  };

  const sortByDate = (list: ProductType[], orderDirection: String) => {
    const result = [...list].sort((a, b) => {
      const dateA = new Date(a.date).getTime();
      const dateB = new Date(b.date).getTime();
      if (orderDirection === 'ASC') {
        return dateA - dateB;
      } else {
        return dateB - dateA;
      }
    });
    return result;
  };

  const sortById = (list: ProductType[], orderDirection: String) => {
    const result = [...list].sort((a, b) =>
      orderDirection === 'ASC' ? a._id.localeCompare(b._id) : b._id.localeCompare(a._id),
    );
    return result;
  };

  const selectSortingRule = (key: 'name' | 'price' | 'date' | 'reset search result') => {
    if (key === 'name') {
      return sortByName;
    }
    if (key === 'price') {
      return sortByPrice;
    }
    if (key === 'date') {
      return sortByDate;
    }
    if (key === 'reset search result') {
      return sortById;
    }
  };

  const getSearchedList = (
    isChecked: boolean,
    text: string,
    keyword: 'name' | 'price' | 'date' | 'reset search result',
    primaryList: ProductType[],
    modifiedList: ProductType[],
    orderDirection: string,
  ) => {
    const selectedList = selectList(isChecked, text, primaryList, modifiedList);

    const sortRule = selectSortingRule(keyword);

    if (sortRule) {
      const retrievedList = sortRule(selectedList, orderDirection);
      return retrievedList;
    }
  };

  const result = getSearchedList(isChecked, searchText, keyword, primaryList, modifiedList, orderDirection);

  if (result) {
    return result;
  }
}

export default getRetrievedList;
