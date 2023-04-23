import React, { useContext } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import Header from './Header';
import '../assets/styles/ProductDetailPage.css';
import coinIcon from '../assets/images/coin-icon.png';
import AppContext from '../context/AppContext';

function ProductDetailPage() {
  const { cartItems, setCartItems, coinBalance, setCoinBalance } = useContext(AppContext);
  const { id } = useParams();
  const location = useLocation();
  const product = location.state.product;
  const navigate = useNavigate();

  function handleCollectButtonClick() {
    setCartItems([...cartItems, product]);
    setCoinBalance(coinBalance - product.price);
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
              <button className="collect-button" onClick={handleCollectButtonClick}>
                COLLECT
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductDetailPage;
