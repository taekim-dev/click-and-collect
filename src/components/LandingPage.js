import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import '../assets/styles/LandingPage.css';
import logo from '../assets/images/logo.png';
import coinIcon from '../assets/images/coin-icon.png';
import AppContext from '../context/AppContext';

function LandingPage() {
  const { setUsername, coinBalance } = useContext(AppContext);
  const navigate = useNavigate();

  const [inputValue, setInputValue] = useState('');

  function handleInputChange(event) {
    setInputValue(event.target.value);
  }

  function handleSubmit(event) {
    event.preventDefault();
    setUsername(inputValue);
    navigate('/home');
  }

  return (
    <div className="landing-page">
      <img src={logo} alt="Logo" className="logo" />
      <div className="form-container">
        <h2 className="username-text">UserName:</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            className="username-input"
            autoFocus
            value={inputValue}
            onChange={handleInputChange}
          />
          <button className="enter-button" type="submit">
            Enter
          </button>
        </form>
      </div>
      <div className="coin-info">
        <img src={coinIcon} alt="Coin" className="coin-icon" />
        <span className="coin-text">x{coinBalance}</span>
      </div>
    </div>
  );
}

export default LandingPage;
