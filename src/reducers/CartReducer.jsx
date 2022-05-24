import CartItem from "../models/CartItem";
import {
  ADD_TO_CART,
  REMOVE_FROM_CART,
  EDIT_QUANTITY,
  CART_ERROR,
  RESET_CART_ERROR,
} from "../types/types";

export const cartInitialState = {
  cartItems: [],
  cartError: "",
};

export const cartReducer = (state, action) => {
  const { type, payload } = action;

  switch (type) {
    case ADD_TO_CART:
      const existingCartItem = state.cartItems.find(
        (cartItem) => cartItem.name === payload.name
      );
      if (existingCartItem) {
        existingCartItem.editQuantityInCart(payload.quantity);
        return { cartItems: [...state.cartItems] };
      } else {
        const newCartItem = new CartItem(payload);
        return { cartItems: [...state.cartItems, newCartItem] };
      }

    case REMOVE_FROM_CART:
      const removingItem = payload;
      const currentCartItems = state.cartItems;
      return currentCartItems.splice(currentCartItems.indexOf(removingItem), 1);

    case EDIT_QUANTITY:
      existingCartItem.editQuantityInCart(payload);
      return { cartItems: [...state.cartItems] };

    case CART_ERROR:
      return { ...state.cartItems, cartError: payload };

    case RESET_CART_ERROR:
      return { ...state.cartItems, cartError: "" };

    default:
      return cartInitialState;
  }
};
