import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import '../assets/styles/Header.css';
import logo from '../assets/images/logo.png';
import cartIcon from '../assets/images/cart-icon.png';
import cartIcon2 from '../assets/images/cart-icon2.png';
import coinIcon from '../assets/images/coin-icon.png';
import AppContext from '../context/AppContext';

function Header() {
  const { cartItems, coinBalance, username } = useContext(AppContext);
  const navigate = useNavigate();

  function handleCartIconClick() {
    navigate('/cart');
  }

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
        {username && <span className="username">Hello, {username}</span>}
        <img
          src={cartItems.length > 0 ? cartIcon2 : cartIcon}
          alt="Cart"
          className="cart-icon"
          onClick={handleCartIconClick}
        />
        <img src={coinIcon} alt="Coin" className="coin-icon" />
        <span className="coin-balance">{coinBalance}</span>
      </div>
    </header>
  );
}

export default Header;
