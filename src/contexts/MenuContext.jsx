import { createContext, useReducer } from "react";
import { menuReducer, menuInitialState } from "../reducers/MenuReducer";

export const MenuContext = createContext();

export const MenuProvider = ({ children }) => {
  const [state, dispatch] = useReducer(menuReducer, menuInitialState);

  const value = { state, dispatch };
  return <MenuContext.Provider value={value}>{children}</MenuContext.Provider>;
};
