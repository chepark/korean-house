import { useContext } from "react";
import { CartContext } from "../../contexts/CartContext";

const Cart = () => {
  const { state: cartState, dispatch: cartDispatch } = useContext(CartContext);

  return (
    <div>
      {cartState && cartState.carItems ? console.log(cartState.carItems) : null}
      cart
    </div>
  );
};

export default Cart;
