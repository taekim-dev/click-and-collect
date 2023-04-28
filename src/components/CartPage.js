import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import coinIcon from '../assets/images/coin-icon.png';
import emptyCartIcon from '../assets/images/empty-cart-icon.png';
import AppContext from '../context/AppContext';
import '../assets/styles/CartPage.css';

function CartPage() {
  // Destructure the required values from AppContext
  const { cartItems, setCartItems, coinBalance, setCoinBalance } = useContext(AppContext);
  const navigate = useNavigate();

  // Calculate the total number of items and their total price
  const totalItems = cartItems.length;
  const totalPrice = cartItems.reduce((sum, item) => sum + item.price, 0);

  // Function to remove an item from the cart and update the coin balance
  function handleRemoveFromCart(id) {
    const removedItem = cartItems.find((item) => item.id === id);
    setCartItems(cartItems.filter((item) => item.id !== id));
    setCoinBalance(coinBalance + removedItem.price);
  }

  // Function to navigate to the payment page when the Pay button is clicked
  function handlePayButtonClick() {
    navigate('/payment');
  }

  return (
    <div className="cart-page">
      <div className="cart-page-wrapper">
        <div className="cart-container">
          <div className="left-pane">
            {totalItems > 0 ? (
              // Display the cart items if there are any
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
                  <button
                    className="remove-button"
                    onClick={() => handleRemoveFromCart(item.id)}
                  >
                    X
                  </button>
                </div>
              ))
            ) : (
              // Display a message if the cart is empty
              <div className="empty-cart">
                <img src={emptyCartIcon} alt="Empty Cart" className="empty-cart-icon" />
                <div className="empty-cart-message">Your cart is empty</div>
              </div>
            )}
          </div>
          <div className="right-pane">
            <div className="items-count">
              <span className="number">{totalItems > 0 ? totalItems : ''}</span> 
              {totalItems === 0 ? ' No Item' : totalItems === 1 ? ' Item' : ' Items'}
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
