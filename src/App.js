import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LandingPage from './components/LandingPage';
import HomePage from './components/HomePage';
import CartPage from './components/CartPage';
import ProductDetailPage from './components/ProductDetailPage';
import PaymentPage from './components/PaymentPage';
import { AppContextProvider } from './context/AppContext';
import './assets/styles/App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <AppContextProvider>
          <Routes>
            <Route index path="/" element={<LandingPage />} />
            <Route path="/home" element={<HomePage />} />
            <Route path="/cart" element={<CartPage />} />
            <Route path="/product/:id" element={<ProductDetailPage />} />
            <Route path="/payment" element={<PaymentPage />} />
          </Routes>
        </AppContextProvider>
      </div>
    </Router>
  );
}

export default App;
