import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LandingPage from './components/LandingPage';
import HomePage from './components/HomePage';
import CartPage from './components/CartPage';
import ProductDetailPage from './components/ProductDetailPage';
import PaymentPage from './components/PaymentPage';
import './assets/styles/App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route exact path="/" component={LandingPage} />
          <Route path="/home" component={HomePage} />
          <Route path="/cart" component={CartPage} />
          <Route path="/product/:id" component={ProductDetailPage} />
          <Route path="/payment" component={PaymentPage} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
