import ProductType from '@/types/product.type';

const sortByName = (
  productList: ProductType[],
  filteredList: ProductType[],
  searchKeyword: string | undefined,
  sortRule: string,
) => {
  if (searchKeyword !== undefined) {
    const searchedList: ProductType[] = filteredList.filter((product) => product.name.includes(searchKeyword));
    const orderedList = searchedList.sort((a, b) =>
      sortRule === 'ASC' ? a.name.localeCompare(b.name) : b.name.localeCompare(a.name),
    );
    return orderedList;
  } else {
    const orderedList = productList.sort((a, b) =>
      sortRule === 'ASC' ? a.name.localeCompare(b.name) : b.name.localeCompare(a.name),
    );
    return orderedList;
  }
};

const sortByPrice = (
  productList: ProductType[],
  filteredList: ProductType[],
  searchKeyword: string,
  sortRule: string,
) => {
  if (searchKeyword !== undefined) {
    const searchedList: ProductType[] = filteredList.filter((product) => product.name.includes(searchKeyword));
    const orderedList = searchedList.sort((a, b) =>
      sortRule === 'ASC' ? a.invest_price - b.invest_price : b.invest_price - a.invest_price,
    );
    return orderedList;
  } else {
    const orderedList = productList.sort((a, b) =>
      sortRule === 'ASC' ? a.invest_price - b.invest_price : b.invest_price - a.invest_price,
    );
    return orderedList;
  }
};

const sortByDate = (
  productList: ProductType[],
  filteredList: ProductType[],
  searchKeyword: string,
  sortRule: string,
) => {
  if (searchKeyword !== undefined) {
    const searchedList: ProductType[] = filteredList.filter((product) => product.name.includes(searchKeyword));
    const orderedList = searchedList.sort((a, b) => {
      const dateA = new Date(a.date).getTime();
      const dateB = new Date(b.date).getTime();
      if (sortRule === 'ASC') {
        return dateA - dateB;
      } else {
        return dateB - dateA;
      }
    });
    return orderedList;
  } else {
    const orderedList: ProductType[] = productList.sort((a, b) => {
      const dateA = new Date(a.date).getTime();
      const dateB = new Date(b.date).getTime();
      if (sortRule === 'ASC') {
        return dateA - dateB;
      } else {
        return dateB - dateA;
      }
    });
    return orderedList;
  }
};

const sortById = (productList: ProductType[], filteredList: ProductType[], searchKeyword: string, sortRule: string) => {
  if (searchKeyword !== undefined) {
    const searchedList: ProductType[] = filteredList.filter((product) => product.name.includes(searchKeyword));
    const orderedList = searchedList.sort((a, b) =>
      sortRule === 'ASC' ? a._id.localeCompare(b._id) : b._id.localeCompare(a._id),
    );
    return orderedList;
  } else {
    const orderedList = productList.sort((a, b) =>
      sortRule === 'ASC' ? a._id.localeCompare(b._id) : b._id.localeCompare(a._id),
    );
    return orderedList;
  }
};

export { sortByName, sortByPrice, sortByDate, sortById };
