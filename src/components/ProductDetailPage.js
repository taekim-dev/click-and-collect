import React, { useContext } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import '../assets/styles/ProductDetailPage.css';
import coinIcon from '../assets/images/coin-icon.png';
import AppContext from '../context/AppContext';

function ProductDetailPage() {
  // Destructure the required values from AppContext
  const { cartItems, setCartItems, coinBalance, setCoinBalance } = useContext(AppContext);
  const location = useLocation();
  const product = location.state.product;
  const navigate = useNavigate();

// Function to handle the collect button click
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
  

  // Function to handle the back button click
  function handleBackButtonClick() {
    navigate(-1);
  }

  // Function to generate stars for the rating display
  function generateStars(rating) {
    let stars = '';
    for (let i = 0; i < rating; i++) {
      stars += '★';
    }
    return stars;
  }

  return (
    <div className="product-detail-page">
      <div className="product-detail-page-wrapper">
        <div className="content">
          <button className="back-button" onClick={handleBackButtonClick}>
            &lt;- Back
          </button>
          <div className="product-detail">
            <div className="product-image-container">
              <img src={product.image} alt={product.title} className="product-image" />
            </div>
            <div className="product-info">
              <div className="ratings">{generateStars(product.rating)}</div>
              <h2 className="product-title">{product.title}</h2>
              <div className="product-price">
                <img src={coinIcon} alt="Coin" className="coin-icon" />
                <span>{product.price}</span>
              </div>
              <p className="product-description">{product.description}</p>
              <button
                className={`collect-button${product.instock ? '' : ' disabled'}`}
                onClick={handleCollectButtonClick}
                disabled={!product.instock}
              >
                {product.instock ? 'COLLECT' : 'Out of Stock'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductDetailPage;
