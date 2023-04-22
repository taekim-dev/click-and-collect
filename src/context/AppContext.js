import { createContext, useState } from 'react';

const AppContext = createContext();

export const AppContextProvider = ({ children }) => {
  const [username, setUsername] = useState('');
  const [cartItems, setCartItems] = useState([]);
  const [coinBalance, setCoinBalance] = useState(100);

  const value = {
    cartItems,
    setCartItems,
    coinBalance,
    setCoinBalance,
    username,
    setUsername,
  };
  

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export default AppContext;
