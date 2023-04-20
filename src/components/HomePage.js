import React from 'react';
import '../assets/styles/HomePage.css';
import logo from '../assets/images/logo.png';
import cartIcon from '../assets/images/cart-icon.png';
import coinIcon from '../assets/images/coin-icon.png';

function HomePage() {
  return (
    <div className="home-page">
      <header className="header">
        <img src={logo} alt="Logo" className="logo" />
        <div className="header-info">
          <img src={cartIcon} alt="Cart" className="cart-icon" />
          <img src={coinIcon} alt="Coin" className="coin-icon" />
          <span className="coin-balance">100</span>
        </div>
      </header>
      {/* Add the Left Pane and Right Pane components here */}
      <div className="left-pane">
        {/* Add the Left Pane content here */}
      </div>
      <div className="right-pane">
        {/* Add the Right Pane content here */}
      </div>
    </div>
  );
}

export default HomePage;
