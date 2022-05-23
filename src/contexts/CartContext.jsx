import { createContext, useReducer } from "react";
import { cartInitialState, cartReducer } from "../reducers/CartReducer";

// create context
export const CartContext = createContext();

// create provider
export const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, cartInitialState);

  const value = { state, dispatch };
  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
