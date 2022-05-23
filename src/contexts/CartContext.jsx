import { createContext } from "react";

// create context
const CartContext = createContext();

// create provider
const CartProvider = ({ children }) => {
  return <CartContext.Provider>{children}</CartContext.Provider>;
};
