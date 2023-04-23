import React, { useState, useEffect, useContext } from 'react';
import Header from './Header';
import { useNavigate } from 'react-router-dom';
import AppContext from '../context/AppContext';
import '../assets/styles/HomePage.css';
import coinIcon from '../assets/images/coin-icon.png';
import product1 from '../assets/images/product-1.png';
import product2 from '../assets/images/product-2.png';
import product3 from '../assets/images/product-3.png';

function HomePage() {
  const { cartItems, setCartItems, coinBalance, setCoinBalance } = useContext(AppContext);

  const [activeButton, setActiveButton] = useState('top-rated');
  const [products, setProducts] = useState([]);
  const productImages = [product1, product2, product3];
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchData() {
      let data;

      try {
        const response = await fetch('https://dummyjson.com/products');
        data = await response.json();
        console.log(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }

      return data;
    }

    fetchData().then((data) => {
      setProducts(data);
    });
  }, []);

  function handleButtonClick(buttonId) {
    setActiveButton(buttonId);
  }

  function handleCollectButtonClick(e, productId) {
    e.stopPropagation();
    console.log(`Product ${productId} added to cart`);

    const product = {
      id: productId,
      image: productImages[productId - 1],
      title: `Product ${productId}`,
      price: 10 * productId,
      description: `This is a description for Product ${productId}`,
    };

    setCartItems([...cartItems, product]);
    setCoinBalance(coinBalance - product.price);
  }

  function handleCardClick(productId) {
    console.log(`Navigating to product detail page for Product ${productId}`);
    navigate(`/product/${productId}`);
  }
    
  return (
    <div className="home-page">
        <Header />
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
            <button
  className={`sort-button top-rated${activeButton === 'top-rated' ? ' active' : ''}`}
  onClick={() => handleButtonClick('top-rated')}
>
  Top Rated
</button>
<button
  className={`sort-button lowest${activeButton === 'lowest' ? ' active' : ''}`}
  onClick={() => handleButtonClick('lowest')}
>
  Lowest Price
</button>
<button
  className={`sort-button highest${activeButton === 'highest' ? ' active' : ''}`}
  onClick={() => handleButtonClick('highest')}
>
  Highest Price
</button>

          </div>
          <div className="cards-container">
    {productImages.map((image, index) => (
    <div key={index} className="card" onClick={() => handleCardClick(index + 1)}>
      <img src={image} alt={`Product ${index + 1}`} className="product-image" />
      <button className="collect-button" onClick={(e) => handleCollectButtonClick(e, index + 1)}>COLLECT</button>
    </div>
  ))}

  <div className="card"></div>
  <div className="card"></div>
  <div className="card"></div>
  <div className="card"></div>
  <div className="card"></div>
  <div className="card"></div>
</div>

    <div className="pagination">
        <button className="pagination-arrow">&lt;</button>
        <span className="pagination-page current">1</span>
        <span className="pagination-page">2</span>
        <span className="pagination-page">3</span>
        <button className="pagination-arrow">&gt;</button>
    </div>
        </div>
      </div>
    </div>
  );
}

export default HomePage;
