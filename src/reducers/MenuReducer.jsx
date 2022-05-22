import { GET_MENU } from "../types/types";

export const menuInitialState = {
  menu: null,
};

export const menuReducer = (state, action) => {
  const { type, payload } = action;

  switch (type) {
    case GET_MENU:
      return { ...state, menu: payload };
    default:
      return menuInitialState;
  }
};
