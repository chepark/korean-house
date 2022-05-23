import {
  ADD_TO_CART,
  REMOVE_FROM_CART,
  INCREASE_QUANTITY,
  DECREASE_QUANTITY,
  EDIT_QUANTITY,
} from "../types/types";

const cartInitialState = {
  cartItems: [],
};

const cartReducer = (state, action) => {
  const { type, payload } = action;

  switch (type) {
    case ADD_TO_CART:
      const newCartItem = payload;
      const existingCartItem = state.cartItems.find(
        (cartItem) => cartItem.name === newCartItem.name
      );

      if (existingCartItem) {
        existingCartItem.editQuantityInCart(newCartItem.quantity);
        return { cartItems: [...state.cartItems] };
      } else {
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
