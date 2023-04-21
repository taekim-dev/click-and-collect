import React, { useContext } from 'react';
import '../assets/styles/LandingPage.css';
import logo from '../assets/images/logo.png';
import coinIcon from '../assets/images/coin-icon.png';
import AppContext from '../context/AppContext';

function LandingPage(){
  const {coinBalance} = useContext(AppContext);

  return (
    <div className="landing-page">
      <img src={logo} alt="Logo" className="logo" />
      <h2 className="username-text">UserName:</h2>
      <input type="text" className="username-input" autoFocus />
      <button className="enter-button">Enter</button>
      <div className="coin-info">
        <img src={coinIcon} alt="Coin" className="coin-icon" />
        <span className="coin-text">x{coinBalance}</span>
      </div>
    </div>
  );
};

export default LandingPage;