import React, { useState, useEffect, useContext, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from './Header';
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
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [ratingRange, setRatingRange] = useState(3);
  const [discountFilter, setDiscountFilter] = useState(false);
  const [inStockFilter, setInStockFilter] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(20);

  const navigate = useNavigate();

  const filteredProducts = sortProducts(
    (selectedCategory === 'all'
      ? products
      : products.filter((product) => formatCategory(product.category) === selectedCategory)
    )
    .filter((product) => product.price >= minPrice && product.price <= maxPrice)
    .filter((product) => product.rating >= ratingRange)
    .filter((product) => !discountFilter || product.discount > 0)
    .filter((product) => !inStockFilter || product.instock)
  );  

  const getUniqueCategories = useCallback((products) => {
    const categoriesSet = new Set(products.map((product) => formatCategory(product.category)));
    const sortedCategories = Array.from(categoriesSet).sort((a, b) => a.localeCompare(b));
    return sortedCategories;
  }, []);

  useEffect(() => {
    const data = mapDummyJSONToProducts(dummyData.products);
    setProducts(data);
    setCategories(getUniqueCategories(data));
  }, [getUniqueCategories]);  
  
  useEffect(() => {
    const storedFilterState = localStorage.getItem("filterState");
    if (storedFilterState) {
      const { selectedCategory, activeButton, ratingRange } = JSON.parse(storedFilterState);
      setSelectedCategory(selectedCategory);
      setActiveButton(activeButton);
      setRatingRange(ratingRange || 3); 
    }
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
  
    localStorage.setItem("filterState", JSON.stringify({ selectedCategory, activeButton, ratingRange }));
  
    navigate(`/product/${product.id}`, {
      state: { product },
    });
  }
  

  function calculateNumberOfPages() {
    return Math.ceil(filteredProducts.length / ITEMS_PER_PAGE);
  }

  function formatCategory(category) {
    return category.charAt(0).toUpperCase() + category.slice(1);
  }

  function handleCategoryChange(e) {
    setSelectedCategory(e.target.value);
  }

  function generatePageNumbers() {
    const numberOfPages = calculateNumberOfPages();
    const pageNumbers = [];
  
    for (let i = 1; i <= numberOfPages; i++) {
      pageNumbers.push(i);
    }
  
    return pageNumbers;
  }

    function sortProducts(products) {
        return products.sort((a, b) => {
          switch (activeButton) {
            case 'top-rated':
              return b.rating - a.rating;
            case 'lowest':
              return a.price - b.price;
            case 'highest':
              return b.price - a.price;
            default:
              return 0;
          }
        });
      }
    
      function handleMinPriceChange(e) {
        const newMinPrice = parseInt(e.target.value, 10);
        if (newMinPrice > maxPrice) {
          setMinPrice(maxPrice);
        } else {
          setMinPrice(newMinPrice);
        }
      }
    
      function handleMaxPriceChange(e) {
        const newMaxPrice = parseInt(e.target.value, 10);
        if (newMaxPrice < minPrice) {
          setMaxPrice(minPrice);
        } else {
          setMaxPrice(newMaxPrice);
        }
      }
    
      function handleDiscountFilterChange(e) {
        setDiscountFilter(e.target.checked);
      }
      
      function handleInStockFilterChange(e) {
        setInStockFilter(e.target.checked);
      }      
    
  return (
    <div className="home-page">
        <Header />
      <div className="panes-container">
        <div className="left-pane">
          <h2 className="category-title">Category</h2>
          <select
            className="category-dropdown"
            value={selectedCategory}
            onChange={handleCategoryChange} 
          >
            <option value="all">All</option>
            {categories.map((category, index) => (
              <option key={index} value={category}>
                {formatCategory(category)}
              </option>
            ))}
          </select>
          <h2 className="rating-title">Ratings</h2>
          <input
                type="range"
                min="3"
                max="5"
                value={ratingRange}
                className="rating-range"
                onChange={(e) => setRatingRange(e.target.value)}
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
                value={minPrice}
                className="min-price-input"
                onChange={handleMinPriceChange}
                />
                <input
                type="range"
                min="0"
                max={maxPrice}
                value={minPrice}
                className="price-range"
                onChange={handleMinPriceChange}
                />
                <input
                type="number"
                min="0"
                max="20"
                value={maxPrice}
                className="max-price-input"
                onChange={handleMaxPriceChange}
            />

          </div>
          <div className="checkbox-container">
            <label className="checkbox-label">
              <input type="checkbox" 
              className="discount-checkbox" 
              onChange={handleDiscountFilterChange}
              />
              Discount
            </label>
            <label className="checkbox-label">
            <input
                type="checkbox"
                className="in-stock-checkbox"
                onChange={handleInStockFilterChange}
            />
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
          {filteredProducts 
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
