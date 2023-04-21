import React, { useContext } from 'react';
import '../assets/styles/Header.css';
import logo from '../assets/images/logo.png';
import cartIcon from '../assets/images/cart-icon.png';
import cartIcon2 from '../assets/images/cart-icon2.png';
import coinIcon from '../assets/images/coin-icon.png';
import AppContext from '../context/AppContext';

function Header() {
  const { cartItems, coinBalance } = useContext(AppContext);

  return (
    <header className="header">
      <img src={logo} alt="Logo" className="logo" />
      <div className="header-info">
        <img 
            src={cartItems.length > 0 ? cartIcon2 : cartIcon} 
            alt="Cart" 
            className="cart-icon" />
        <img src={coinIcon} alt="Coin" className="coin-icon" />
        <span className="coin-balance">{coinBalance}</span>
      </div>
    </header>
  );
}

export default Header;
