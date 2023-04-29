import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import coinIcon from '../assets/images/coin-icon.png';
import emptyCartIcon from '../assets/images/empty-cart-icon.png';
import AppContext from '../context/AppContext';
import '../assets/styles/CartPage.css';
import Breadcrumbs from './Breadcrumbs';

function CartPage() {
  const { cartItems, setCartItems, coinBalance, setCoinBalance } = useContext(AppContext);
  const navigate = useNavigate();

  const totalItems = cartItems.length;
  const totalPrice = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const totalQuantity = cartItems.reduce((sum, item) => sum + item.quantity, 0);


  function handleRemoveFromCart(id) {
    const removedItem = cartItems.find((item) => item.id === id);
    setCartItems(cartItems.filter((item) => item.id !== id));
    setCoinBalance(coinBalance + removedItem.price * removedItem.quantity);
  }

  function handlePayButtonClick() {
    navigate('/payment');
  }

  function handleQuantityChange(id, newQuantity) {
    const itemIndex = cartItems.findIndex((item) => item.id === id);
    const updatedCartItems = [...cartItems];
    const previousQuantity = updatedCartItems[itemIndex].quantity;
    const priceDifference = updatedCartItems[itemIndex].price * (newQuantity - previousQuantity);

    if (coinBalance - priceDifference >= 0) {
      updatedCartItems[itemIndex].quantity = newQuantity;
      setCartItems(updatedCartItems);
      setCoinBalance(coinBalance - priceDifference);
    } else {
      alert("Not enough coins for the updated quantity!");
    }
  }

  return (
    <div className="cart-page">
        <Breadcrumbs
            items={[
                { label: 'Home', path: '/home' },
                { label: 'Cart', path: '/cart' },
            ]}
        />
      <div className="cart-page-wrapper">
        <div className="cart-container">
          <div className="left-pane">
            {totalItems > 0 ? (
              cartItems.map((item) => (
                <div key={item.id} className="cart-item">
                  <div className="product-image-container">
                    <img src={item.image} alt={item.title} className="product-image" />
                  </div>
                  <span className="product-title">{item.title}</span>
                  <div className="product-price">
                    <img src={coinIcon} alt="Coin" className="coin-icon" />
                    <span>{item.price}</span>
                  </div>
                  <div className="quantity-container">
                  <span className="quantity-text">Qty: </span>
                    <input
                    type="number"
                    min="1"
                    value={item.quantity}
                    className="quantity-input"
                    onChange={(e) => handleQuantityChange(item.id, parseInt(e.target.value))}
                    />
                  </div>
                  <button
                    className="remove-button"
                    onClick={() => handleRemoveFromCart(item.id)}
                  >
                    X
                  </button>
                </div>
              ))
            ) : (
              <div className="empty-cart">
                <img src={emptyCartIcon} alt="Empty Cart" className="empty-cart-icon" />
                <div className="empty-cart-message">Your cart is empty</div>
              </div>
            )}
          </div>
          <div className="right-pane">
          <div className="summary">
                <div className="unique-items-count">
                    Unique Items:&nbsp; <span className="number">{totalItems > 0 ? totalItems : 0}</span>
                </div>
                <div className="total-quantity">
                    Total Quantity:&nbsp; <span className="number">{totalQuantity > 0 ? totalQuantity : 0}</span>
                </div>
            </div>
            <div className="total-text">Total Price:</div>
            <div className="total-price">
              <img src={coinIcon} alt="Coin" className="coin-icon" />
              <span>{totalPrice}</span>
            </div>
            <button className="pay-button" onClick={handlePayButtonClick}>
              PAY
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CartPage;
