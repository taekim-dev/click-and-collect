import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from './Header';
import '../assets/styles/PaymentPage.css';
import { INITIAL_COIN_BALANCE } from '../context/AppContext';
import AppContext from '../context/AppContext';
import coinIcon from '../assets/images/coin-icon.png';

function PaymentPage() {
  const { username, cartItems, setCartItems, coinBalance, setCoinBalance } = useContext(AppContext);
  const [isOrderCompleted, setIsOrderCompleted] = useState(false);
  const navigate = useNavigate();

  const totalCoinsSpent = cartItems.reduce((total, item) => total + item.price, 0);

  function handleOrderClick() {
    setIsOrderCompleted(true);
  }

  function handleShopAgainClick() {
    setCartItems([]);
    setCoinBalance(INITIAL_COIN_BALANCE);
    navigate('/home');
  }

  function handleBackToCartClick() {
    navigate('/cart');
  }

  return (
    <div className="payment-page">
      <Header />
      <div className="payment-page-wrapper">
        <div className="content">
          <h1 className="ship-to">
            {isOrderCompleted ? 'Thank you for your order' : `Ship To: ${username}`}
          </h1>
          <p className="order-details">
            {isOrderCompleted ? 'Items are on the way' : `Product 1 & ${cartItems.length - 1} other items`}
          </p>
          <div className="total-coins">
            <img src={coinIcon} alt="Coin" className="coin-icon" />
            <span>{totalCoinsSpent}</span>
          </div>
          <button
            className="action-button"
            onClick={isOrderCompleted ? handleShopAgainClick : handleOrderClick}
          >
            {isOrderCompleted ? 'Shop Again' : 'Order'}
          </button>
          {!isOrderCompleted && (
            <button
                className="back-to-cart-button"
                onClick={handleBackToCartClick}
            >
             &lt;- Cart
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default PaymentPage;
