import React, { useState, useEffect, useContext, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import AppContext from '../context/AppContext';
import '../assets/styles/HomePage.css';
import mapJSONToProducts from '../mappers/mapJSONToProducts';
import coinIcon from '../assets/images/coin-icon.png';
import axios from 'axios';
import ReactLoading from 'react-loading';

const ITEMS_PER_PAGE = 9;
const PRODUCTS_API = process.env.REACT_APP_PRODUCTS_API;
const CATEGORIES_API = process.env.REACT_APP_CATEGORIES_API;


function HomePage() {
  // Destructure context values and hooks
  const { cartItems, setCartItems, coinBalance, setCoinBalance } = useContext(AppContext);
  const navigate = useNavigate();

  // State variables for HomePage component
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
  const [searchQuery, setSearchQuery] = useState('');
  const [searchTimeout, setSearchTimeout] = useState('');
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  // Filter and sort products based on active filters and sorting option
  const filteredProducts = sortProducts(
    (selectedCategory === 'all'
      ? products
      : products.filter((product) => formatCategory(product.category) === selectedCategory)
    )
    .filter((product) => product.price >= minPrice && product.price <= maxPrice)
    .filter((product) => product.rating >= ratingRange)
    .filter((product) => !discountFilter || product.discount > 0)
    .filter((product) => !inStockFilter || product.instock)
    .filter((product) => product.title.toLowerCase().includes(searchQuery.toLowerCase()))
  );  

    // Fetch products based on active filters
    const fetchProducts = useCallback(async () => {

      setIsLoading(true);

      let endpoint = PRODUCTS_API;

      if (inStockFilter) {
        endpoint += 'in-stock/';
      } else if (discountFilter) {
        endpoint += 'discounted/';
      } else {
        endpoint += 'all/';
      }
  
      try {
        const response = await axios.get(endpoint);
        const data = response.data;
  
        const mappedData = mapJSONToProducts(data.products);
        setProducts(mappedData);
        setIsLoading(false);

      } catch (error) {
        console.error('There was a problem with the request:', error);
      }
    }, [inStockFilter, discountFilter]);
  
    // Fetch categories from the categories API
    const fetchCategories = useCallback(async () => {
      const endpoint = CATEGORIES_API;
      try {
        const response = await axios.get(endpoint);
        const data = response.data;
  
        // Sort the categories alphabetically
        data.categories.sort((a, b) => a.localeCompare(b));
        setCategories(data.categories);
      } catch (error) {
        console.error('There was a problem with the request:', error);
      }
    }, []);
  
    // Fetch products and categories when filters change or the component mounts
    useEffect(() => {
      fetchProducts();
      fetchCategories();
    }, [fetchProducts, fetchCategories]);

  // Load filter state from local storage
  useEffect(() => {
    const storedFilterState = localStorage.getItem("filterState");
    if (storedFilterState) {
      const { selectedCategory, activeButton, ratingRange } = JSON.parse(storedFilterState);
      setSelectedCategory(selectedCategory);
      setActiveButton(activeButton);
      setRatingRange(ratingRange || 3); 
    }
  }, []);

  // Handle sorting button click
  function handleButtonClick(buttonId) {
    setActiveButton(buttonId);
  }

  // Add product to cart and update coin balance
  function handleCollectButtonClick(e, product) {
    e.stopPropagation();
  
    const newCoinBalance = coinBalance - product.price;
  
    if (newCoinBalance >= 0) {
      const itemIndex = cartItems.findIndex((item) => item.id === product.id);
  
      if (itemIndex !== -1) {
        const updatedCartItems = [...cartItems];
        updatedCartItems[itemIndex].quantity += 1;
        setCartItems(updatedCartItems);
      } else {
        setCartItems([...cartItems, { ...product, quantity: 1 }]);
      }
  
      setCoinBalance(newCoinBalance);
    } else {
      alert("Not enough coins for this item!");
    }
  }


  // Handle product card click and navigate to the product details page
  function handleCardClick(product) {
    // Save filter state to local storage
    localStorage.setItem("filterState", JSON.stringify({ selectedCategory, activeButton, ratingRange }));

    // Navigate to product details page
    navigate(`/product/${product.id}`, {
      state: { product },
    });
  }

  // Calculate the number of pages based on the number of filtered products
  function calculateNumberOfPages() {
    return Math.ceil(filteredProducts.length / ITEMS_PER_PAGE);
  }

  // Format category string (capitalize the first letter)
  function formatCategory(category) {
    return category.charAt(0).toUpperCase() + category.slice(1);
  }

  // Handle category dropdown change
  function handleCategoryChange(e) {
    setSelectedCategory(e.target.value);
  }

    // Generate an array of page numbers
    function generatePageNumbers() {
        const numberOfPages = calculateNumberOfPages();
        const pageNumbers = [];
        const maxPages = 5; // Set the maximum number of pages to display
    
        for (let i = 1; i <= Math.min(numberOfPages, maxPages); i++) {
        pageNumbers.push(i);
        }
    
        return pageNumbers;
    }
  
  // Display pagination up to 5 pages with handling more than 5 pages
    function displayLimitedPagination() {
        const numberOfPages = calculateNumberOfPages();
        const maxPages = 5;
        let pageNumbers = [];
    
        if (numberOfPages <= maxPages) {
        pageNumbers = generatePageNumbers();
        } else {
        const mid = Math.floor(maxPages / 2);
        const isNearStart = currentPage <= mid;
        const isNearEnd = numberOfPages - currentPage < mid;
        if (isNearStart) {
            pageNumbers = Array.from({ length: maxPages }, (_, i) => i + 1);
        } else if (isNearEnd) {
            pageNumbers = Array.from({ length: maxPages }, (_, i) => numberOfPages - maxPages + i + 1);
        } else {
            pageNumbers = Array.from({ length: maxPages }, (_, i) => currentPage - mid + i);
        }
        }
    
        return pageNumbers;
    }
  

  // Sort products based on the active sorting button
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

  // Handle minimum price input change
  function handleMinPriceChange(e) {
    const newMinPrice = parseInt(e.target.value, 10);
    if (newMinPrice > maxPrice) {
      setMinPrice(maxPrice);
    } else {
      setMinPrice(newMinPrice);
    }
  }

  // Handle maximum price input change
  function handleMaxPriceChange(e) {
    const newMaxPrice = parseInt(e.target.value, 10);
    if (newMaxPrice < minPrice) {
      setMaxPrice(minPrice);
    } else {
      setMaxPrice(newMaxPrice);
    }
  }

  // Handle discount filter checkbox change
  function handleDiscountFilterChange(e) {
    setDiscountFilter(e.target.checked);
  }

  // Handle in-stock filter checkbox change
  function handleInStockFilterChange(e) {
    setInStockFilter(e.target.checked);
  }
    
  return (
    <div className="home-page">
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
          <h2 className="sorting-title">Sorted By</h2>
          <select
              className="sorting-dropdown"
              value={activeButton}
              onChange={(e) => handleButtonClick(e.target.value)}
            >
              <option value="top-rated">Top Rated</option>
              <option value="lowest">Lowest Price</option>
              <option value="highest">Highest Price</option>
          </select>
          <h2 className="rating-title">Ratings</h2>
          <input
                type="range"
                min="3"
                max="5"
                value={ratingRange}
                className="rating-range"
                onChange={(e) => setRatingRange(e.target.value)}
                style={{ "--range-percentage": `${((ratingRange - 3) / 2) * 100}%` }}
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
                style={{ "--range-percentage": `${(minPrice / maxPrice) * 100}%` }}
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
          <div className="sorting-container">

          </div>
        </div>
        <div className="right-pane">
        <div class="search-wrapper">
        <div className="search-container">
        <input
            type="text"
            placeholder="&#128269;"
            value={inputValue}
            onChange={(e) => {
              const newInputValue = e.target.value;
              setInputValue(newInputValue);
              if (searchTimeout) {
                clearTimeout(searchTimeout);
              }
              setSearchTimeout(
                setTimeout(() => {
                  setSearchQuery(newInputValue);
                }, 1000)
              );
            }}
            className="search-input"
          />
            </div>
            </div>


    <div className={`cards-container ${isLoading ? "loading" : ""}`}>
    {isLoading ? (
         <div className="loading-container">
          <ReactLoading type={"bars"} color={"#000"} />
        </div>
          ) : (
              filteredProducts
                  .slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE)
                  .map((product, index) => (
                      <div
                          key={index}
                          className="card"
                          onClick={() => handleCardClick(product)}
                      >
                          <img src={product.image} alt={product.title} className="product-image" />
                          <div className="product-rating">★{product.rating}</div>
                          <div className="product-price">
                              <img src={coinIcon} alt="Coin" className="price-coin-icon" />
                              {product.price}
                          </div>
                          {product.instock ? (
                              <button
                                  className="collect-button"
                                  onClick={(e) => handleCollectButtonClick(e, product)}
                              >
                                  COLLECT
                              </button>
                          ) : (
                              <div className="out-of-stock">Out of stock</div>
                          )}
                          <div className="product-title">{product.title}</div>
                      </div>
                  ))
              )}
          </div>

        {!isLoading && (
        <div className="pagination">
        <button
            className="pagination-arrow"
            onClick={() => setCurrentPage(1)}
            disabled={currentPage === 1}
        >
            &lt;
        </button>
        {displayLimitedPagination().map((number) => (
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
        )}
        </div>
      </div>
    </div>
  );
}

export default HomePage;
