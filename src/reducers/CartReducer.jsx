import CartItem from "../models/CartItem";
import { ADD_TO_CART, REMOVE_FROM_CART, EDIT_QUANTITY } from "../types/types";

export const cartInitialState = {
  cartItems: [],
};

export const cartReducer = (state, action) => {
  const { type, payload } = action;
  const existingCartItem = state.cartItems.find(
    (cartItem) => cartItem.name === payload.name
  );

  switch (type) {
    case ADD_TO_CART:
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

    default:
      return cartInitialState;
  }
};
