import React, { useContext } from 'react';
import Header from './Header';
import coinIcon from '../assets/images/coin-icon.png';
import AppContext from '../context/AppContext';
import '../assets/styles/CartPage.css';

function CartPage() {
  const { cartItems, setCartItems } = useContext(AppContext);

  const handleRemoveFromCart = (id) => {
    setCartItems(cartItems.filter((item) => item.id !== id));
  };

  const totalItems = cartItems.length;
  const totalPrice = cartItems.reduce((sum, item) => sum + item.price, 0);

  return (
    <div className="cart-page">
      <Header />
      <div className="cart-container">
        <div className="left-pane">
          {cartItems.map((item) => (
            <div key={item.id} className="cart-item">
              <div className="product-image-container">
                <img src={item.image} alt={item.title} className="product-image" />
              </div>
              <span className="product-title">{item.title}</span>
              <div className="product-price">
                <img src={coinIcon} alt="Coin" className="coin-icon" />
                <span>{item.price}</span>
              </div>
              <button className="remove-button" onClick={() => handleRemoveFromCart(item.id)}>
                X
              </button>
            </div>
          ))}
        </div>
        <div className="right-pane">
          <div className="items-count">
            <span className="number">{totalItems}</span> Items
          </div>
          <div className="total-text">Total</div>
          <div className="total-price">
            <img src={coinIcon} alt="Coin" className="coin-icon" />
            <span>{totalPrice}</span>
          </div>
          <button className="pay-button">PAY</button>
        </div>
      </div>
    </div>
  );
}

export default CartPage;
