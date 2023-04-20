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
            {/* Add more options for different categories */}
          </select>
          <h2 className="rating-title">Rating</h2>
          {/* Add the rating range slider component */}
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
          <h2 className="prices-title">Prices</h2>
          {/* Add the prices range slider component */}
          <div className="prices-range-container">
            <input
              type="number"
              min="0"
              max="100"
              defaultValue="0"
              className="min-price-input"
            />
            <input
              type="range"
              min="0"
              max="100"
              defaultValue="0"
              className="price-range"
            />
            <input
              type="number"
              min="0"
              max="100"
              defaultValue="100"
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
            <button className="sort-button economy">Economy</button>
            <button className="sort-button luxury">Luxury</button>
          </div>
          {/* Add the product grid component */}
          {/* Add the pagination component */}
        </div>
      </div>
    </div>
  );
}

export default HomePage;
