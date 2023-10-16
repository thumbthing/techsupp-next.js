import React from 'react';
import '../../style/product/productPage.style.css';
import Image from 'next/image';

const LoadingSearchBar = () => {
  return (
    <nav>
      <div className="search-box">
        <ul className="search-ul">
          <li className="search-asc-desc-li">
            <button>ASC</button>
          </li>
          <li className="search-asc-desc-li">
            <button>DESC</button>
          </li>
          <li className="search-category-li">
            <button>id</button>
          </li>
          <li className="search-category-li">
            <button>name</button>
          </li>
          <li className="search-category-li">
            <button>price</button>
          </li>
          <li className="search-category-li">
            <button>date</button>
          </li>
          <li className="search-input-li">
            <form>
              <div>
                <input type="checkboc" />
                <p>검색 결과 내 재 검색</p>
              </div>
              <div>
                <input type="search" placeholder="Search..." />
                <button>검색</button>
              </div>
            </form>
          </li>
        </ul>
      </div>
    </nav>
  );
};

const loadingItem = {
  _id: 'loading',
  name: 'loading',
  category: 'loading',
  total_invest_price: 'loading',
  date: 'loading',
  information: 'loading',
  invest_price: 'loading',
  imgPath: '/loading_img/loading_product_item.png',
};

const LoadingProductItem = () => {
  return (
    <article className="product-item-box">
      <div className="product-image-box">
        <Image src={loadingItem.imgPath} alt="" width={150} height={150}></Image>
      </div>
      <div>
        <div>
          <span className="item-text">제품명:{loadingItem.name}</span>
          <div>
            <span className="item-text">D-day: {loadingItem.date}</span>
            <span className="item-text">개인 투자 금액 : {loadingItem.invest_price}</span>
          </div>
          <div>
            <span className="item-text">투자율: </span>
            <button>즐겨찾기</button>
          </div>
        </div>
      </div>
    </article>
  );
};

const LoadingPageList = () => {
  return (
    <article className="product-box">
      <ul className="product-ul">
        <li className="product li">
          <LoadingProductItem />
        </li>
        <li className="product li">
          <LoadingProductItem />
        </li>
        <li className="product li">
          <LoadingProductItem />
        </li>
        <li className="product li">
          <LoadingProductItem />
        </li>
        <li className="product li">
          <LoadingProductItem />
        </li>
      </ul>
    </article>
  );
};

const LoadingProductPageList = () => {
  return (
    <article>
      <ul className="page-ul">
        <li key={`page-previous`} className="page-li">
          <button>이전</button>
        </li>
        <li className="page-li">
          <button>loading</button>
        </li>
        <li className="page-li">
          <button>이후</button>
        </li>
      </ul>
    </article>
  );
};

function ProductPageLoading() {
  return (
    <main className="main-box">
      <LoadingSearchBar />
      <LoadingPageList />
      <LoadingProductPageList />
    </main>
  );
}

export default ProductPageLoading;
