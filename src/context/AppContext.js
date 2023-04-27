import { createContext, useState } from 'react';

// Create a new context for the application
const AppContext = createContext();

// Set the initial coin balance for users
export const INITIAL_COIN_BALANCE = 100;

// AppContextProvider component wraps around other components and provides
// the shared state (context) to them
export const AppContextProvider = ({ children }) => {
  // Define the shared states
  const [username, setUsername] = useState('');
  const [cartItems, setCartItems] = useState([]);
  const [coinBalance, setCoinBalance] = useState(INITIAL_COIN_BALANCE);

  // Create an object containing the shared state values and their setters
  const value = {
    cartItems,
    setCartItems,
    coinBalance,
    setCoinBalance,
    username,
    setUsername,
  };

  // Return the AppContext.Provider, passing in the value object and rendering
  // children components
  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export default AppContext;
