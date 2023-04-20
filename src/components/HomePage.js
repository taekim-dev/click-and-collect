import React from 'react';
import '../assets/styles/HomePage.css';
import logo from '../assets/images/logo.png';
import cartIcon from '../assets/images/cart-icon.png';
import coinIcon from '../assets/images/coin-icon.png';

function HomePage() {
  return (
    <div className="home-page">
      <header className="header">
        <img src={logo} alt="Logo" className="logo" />
        <div className="header-info">
          <img src={cartIcon} alt="Cart" className="cart-icon" />
          <img src={coinIcon} alt="Coin" className="coin-icon" />
          <span className="coin-balance">100</span>
        </div>
      </header>
      <div className="panes-container">
        <div className="left-pane">
          <h2 className="category-title">Category</h2>
          <select className="category-dropdown">
            <option value="all">All</option>
          </select>
          <h2 className="rating-title">Ratings</h2>
          <input
            type="range"
            min="3"
            max="5"
            defaultValue="3"
            className="rating-range"
          />
          <div className="rating-labels">
            <span className="rating-label">★3</span>
            <span className="rating-label">★4</span>
            <span className="rating-label">★5</span>
          </div>
          <h2 className="prices-title">Prices<img src={coinIcon} alt="Coin" className="prices-coin-icon" /></h2>
          <div className="prices-range-container">
            <input
              type="number"
              min="0"
              max="20"
              defaultValue="0"
              className="min-price-input"
            />
            <input
              type="range"
              min="0"
              max="20"
              defaultValue="0"
              className="price-range"
            />
            <input
              type="number"
              min="0"
              max="20"
              defaultValue="20"
              className="max-price-input"
            />
          </div>
          <div className="checkbox-container">
            <label className="checkbox-label">
              <input type="checkbox" className="discount-checkbox" />
              Discount
            </label>
            <label className="checkbox-label">
              <input type="checkbox" className="in-stock-checkbox" />
              In Stock
            </label>
          </div>
        </div>
        <div className="right-pane">
          <div className="sorting-container">
            <span className="sorted-by-text">Sorted by</span>
            <button className="sort-button top-rated active">
              Top Rated
            </button>
            <button className="sort-button lowest">Lowest Price</button>
            <button className="sort-button highest">Highest Price</button>
          </div>
          <div class="cards-container">
            <div class="card"></div>
            <div class="card"></div>
            <div class="card"></div>
            <div class="card"></div>
            <div class="card"></div>
            <div class="card"></div>
            <div class="card"></div>
            <div class="card"></div>
            <div class="card"></div>
          </div>
          <div class="pagination">
        <button class="pagination-arrow">&lt;</button>
        <span class="pagination-page current">1</span>
        <span class="pagination-page">2</span>
        <span class="pagination-page">3</span>
        <button class="pagination-arrow">&gt;</button>
      </div>
        </div>
      </div>
    </div>
  );
}

export default HomePage;
