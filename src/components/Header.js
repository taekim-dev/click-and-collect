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
  const { cartItems, coinBalance, username, setUsername } = useContext(AppContext);
  const navigate = useNavigate();
  const prevCoinBalance = usePrevious(coinBalance);

  useEffect(() => {
    if (!username) {
      setUsername('Guest');
    }
  }, [username, setUsername]);

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
        {/* <span className="username">{username}</span> */}
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
