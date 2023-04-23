import React, { useState, useEffect, useContext } from 'react';
import Header from './Header';
import { useNavigate } from 'react-router-dom';
import AppContext from '../context/AppContext';
import '../assets/styles/HomePage.css';
import dummyData from '../data/dummyData.json';
import mapDummyJSONToProducts from '../mappers/mapDummyJSONToProducts';
import coinIcon from '../assets/images/coin-icon.png';

const ITEMS_PER_PAGE = 9;

function HomePage() {
  const { cartItems, setCartItems, coinBalance, setCoinBalance } = useContext(AppContext);
  const [activeButton, setActiveButton] = useState('top-rated');
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const navigate = useNavigate();

  useEffect(() => {
    const data = mapDummyJSONToProducts(dummyData.products);
    setProducts(data);
    console.log(products);
  }, []);

  function handleButtonClick(buttonId) {
    setActiveButton(buttonId);
  }

  function handleCollectButtonClick(e, product) {
    e.stopPropagation();
    console.log(`Product ${product.id} added to cart`);

    setCartItems([...cartItems, product]);
    setCoinBalance(coinBalance - product.price);
  }

  function handleCardClick(product) {
    console.log(`Navigating to product detail page for Product ${product.id}`);
    navigate(`/product/${product.id}`, { state: { product } });
  }


  function calculateNumberOfPages() {
    return Math.ceil(products.length / ITEMS_PER_PAGE);
  }

  function generatePageNumbers() {
    const numberOfPages = calculateNumberOfPages();
    const pageNumbers = [];
  
    for (let i = 1; i <= numberOfPages; i++) {
      pageNumbers.push(i);
    }
  
    return pageNumbers;
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
          {products
            .slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE)
            .map((product, index) => (
                <div
                key={index}
                className="card"
                onClick={() => handleCardClick(product)}
                >
                <img src={product.image} alt={product.title} className="product-image" />
                <button
                    className="collect-button"
                    onClick={(e) => handleCollectButtonClick(e, product)}
                >
                    COLLECT
                </button>
                </div>
            ))}
            </div>
            <div className="pagination">
        <button
            className="pagination-arrow"
            onClick={() => setCurrentPage(1)}
            disabled={currentPage === 1}
        >
            &lt;
        </button>
        {generatePageNumbers().map((number) => (
            <span
            key={number}
            className={`pagination-page${currentPage === number ? ' current' : ''}`}
            onClick={() => setCurrentPage(number)}
            >
            {number}
            </span>
        ))}
        <button
            className="pagination-arrow"
            onClick={() => setCurrentPage(calculateNumberOfPages())}
            disabled={currentPage === calculateNumberOfPages()}
        >
            &gt;
        </button>
        </div>
        </div>
      </div>
    </div>
  );
}

export default HomePage;
