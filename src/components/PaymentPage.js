import React, { useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import CountUp from 'react-countup';
import '../assets/styles/PaymentPage.css';
import { INITIAL_COIN_BALANCE } from '../context/AppContext';
import AppContext from '../context/AppContext';
import coinIcon from '../assets/images/coin-icon.png';
import Confetti from 'react-confetti';
import Breadcrumbs from './Breadcrumbs';

function PaymentPage() {
  const { username, cartItems, setCartItems, setCoinBalance } = useContext(AppContext);
  const [isOrderCompleted, setIsOrderCompleted] = useState(false);
  const [startCountUp, setStartCountUp] = useState(false);
  const [displayedCoins, setDisplayedCoins] = useState(0);
  const [showConfetti, setShowConfetti] = useState(false);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [windowHeight, setWindowHeight] = useState(window.innerHeight);
  const navigate = useNavigate();

  const totalCoinsSpent = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  useEffect(() => {
    setDisplayedCoins(totalCoinsSpent);
  }, [totalCoinsSpent]);

  useEffect(() => {
    if (isOrderCompleted){
        setShowConfetti(true);
        setTimeout(() => {
            setShowConfetti(false);
        }, 4000)
    }
  }, [isOrderCompleted])

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
      setWindowHeight(window.innerHeight);
    };
  
    window.addEventListener('resize', handleResize);
  
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  // Function to handle the order button click
  function handleOrderClick() {
    setIsOrderCompleted(true);
    setStartCountUp(true);
    setDisplayedCoins(0);
  }

  // Function to handle the shop again button click
  function handleShopAgainClick() {
    setCartItems([]);
    setCoinBalance(INITIAL_COIN_BALANCE);
    navigate('/home');
  }

  const isCartEmpty = cartItems.length === 0;
  const firstItemName = !isCartEmpty ? cartItems[0].title : '';

  return (
    <div className="payment-page">
        <Breadcrumbs
            items={[
                { label: 'Home', path: '/home' },
                { label: 'Cart', path: '/cart' },
                { label: 'Payment'},
            ]}
        />
      <div className="payment-page-wrapper">
        <div className="content">
          <h1 className="ship-to">
            {isOrderCompleted ? 'Thank you for your order' : `Ship To: ${username}`}
          </h1>
          <p className="order-details">
            {isOrderCompleted
              ? 'Items are on the way'
              : isCartEmpty
              ? 'No Item in your cart'
              : `${firstItemName} & ${cartItems.length - 1} other items`}
          </p>
          <div className="total-coins">
            <img src={coinIcon} alt="Coin" className="coin-icon" />
            {startCountUp ? (
              <CountUp
                start={totalCoinsSpent}
                end={displayedCoins}
                duration={1.5}
                onEnd={() => setStartCountUp(false)}
              />
            ) : (
              <span>{displayedCoins}</span>
            )}
          </div>
          <button
            className="order-button"
            onClick={isOrderCompleted ? handleShopAgainClick : handleOrderClick}
            disabled={isCartEmpty}
          >
            {isOrderCompleted ? 'Shop Again' : 'Order'}
          </button>
        </div>
      </div>
      {showConfetti && <Confetti width={windowWidth} height={windowHeight} />}
    </div>
  );
}

export default PaymentPage;
