import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LandingPage from './components/LandingPage';
import HomePage from './components/HomePage';
import CartPage from './components/CartPage';
import ProductDetailPage from './components/ProductDetailPage';
import PaymentPage from './components/PaymentPage';
import { AppContextProvider } from './context/AppContext';
import './assets/styles/App.css';
import Header from './components/Header';

const LayoutWrapper = ({children}) => {
  return (
    <>
      <Header />
      {children}
    </>
  )
}

function App() {
  return (
    <Router>
      <div className="App">
        <AppContextProvider>
          <Routes>
            <Route index path="/" element={<LandingPage />} />
            <Route path="/home" element={<LayoutWrapper><HomePage /></LayoutWrapper>} />
            <Route path="/cart" element={<LayoutWrapper><CartPage /></LayoutWrapper>} />
            <Route path="/product/:id" element={<LayoutWrapper><ProductDetailPage /></LayoutWrapper>} />
            <Route path="/payment" element={<LayoutWrapper><PaymentPage /></LayoutWrapper>} />
          </Routes>
        </AppContextProvider>
      </div>
    </Router>
  );
}

export default App;
