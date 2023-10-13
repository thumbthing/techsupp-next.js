import React from 'react';
import '../../style/product/productPage.style.css';

function productMainLoading() {
  return (
    <main>
      <nav>
        <div className="search-box">
          <ul className="search-ul">
            <li className="search-asc-desc-li">ASC</li>
            <li className="search-asc-desc-li">DESC</li>
            <li className="search-category-li">id</li>
            <li className="search-category-li">name</li>
            <li className="search-category-li">price</li>
            <li className="search-category-li">date</li>
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
    </main>
  );
}

export default productMainLoading;
