import React, { useContext } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Header from './Header';
import '../assets/styles/ProductDetailPage.css';
import coinIcon from '../assets/images/coin-icon.png';
import AppContext from '../context/AppContext';

function ProductDetailPage() {
  const { cartItems, setCartItems, coinBalance, setCoinBalance } = useContext(AppContext);
  const location = useLocation();
  const product = location.state.product;
  const navigate = useNavigate();

  function handleCollectButtonClick() {

    const itemExists = cartItems.some((item) => item.id === product.id);

    if (itemExists) {
      alert("Item already in the cart");
    } else {
      const newCoinBalance = coinBalance - product.price;

      if (newCoinBalance >= 0) {
        setCartItems([...cartItems, product]);
        setCoinBalance(newCoinBalance);
      } else {
        alert("Not enough coins for this item!");
      }
    }
  }

  function handleBackButtonClick() {
    navigate(-1);
  }

  function generateStars(rating) {
    let stars = '';
    for (let i = 0; i < rating; i++) {
      stars += '★';
    }
    return stars;
  }
  
  return (
    <div className="product-detail-page">
      <Header />
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
