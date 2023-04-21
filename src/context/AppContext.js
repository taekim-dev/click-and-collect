import { createContext, useState } from 'react';

const AppContext = createContext();

export const AppContextProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [coinBalance, setCoinBalance] = useState(100);

  const value = {
    cartItems,
    setCartItems,
    coinBalance,
    setCoinBalance,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export default AppContext;
