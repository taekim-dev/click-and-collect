import React, { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../assets/styles/Header.css';
import logo from '../assets/images/logo.png';
import cartIcon from '../assets/images/cart-icon.png';
import cartIcon2 from '../assets/images/cart-icon2.png';
import coinIcon from '../assets/images/coin-icon.png';
import AppContext from '../context/AppContext';
import CountUp from 'react-countup';
import { usePrevious } from 'react-use';

function Header() {
  // Get the required values and functions from AppContext
  const { cartItems, coinBalance, username, setUsername } = useContext(AppContext);

  // Initialize navigation functionality
  const navigate = useNavigate();

  // Get the previous coin balance using the usePrevious custom hook from react-use
  const prevCoinBalance = usePrevious(coinBalance);

  // Set the username to 'Guest' if it's not already set
  useEffect(() => {
    if (!username) {
      setUsername('Guest');
    }
  }, [username, setUsername]);

  // Navigate to the cart page when the cart icon is clicked
  function handleCartIconClick() {
    navigate('/cart');
  }

  // Navigate to the home page when the logo is clicked
  function handleLogoClick() {
    navigate('/home');
  }

  return (
    <header className="header">
      <img
        src={logo}
        alt="Logo"
        className="logo"
        onClick={handleLogoClick}
      />
      <div className="header-info">
        <span className="username">{username}</span>
        <img
          src={cartItems.length > 0 ? cartIcon2 : cartIcon}
          alt="Cart"
          className="cart-icon"
          onClick={handleCartIconClick}
        />
        <img src={coinIcon} alt="Coin" className="coin-icon" />
        <CountUp
          start={prevCoinBalance !== undefined ? prevCoinBalance : coinBalance}
          end={coinBalance}
          duration={1}
          separator=","
          className="coin-balance"
          preserveValue
        />
      </div>
    </header>
  );
}

export default Header;
