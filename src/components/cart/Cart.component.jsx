import { useContext } from "react";
import { CartContext } from "../../contexts/CartContext";

const Cart = () => {
  const { state, dispatch } = useContext(CartContext);

  return (
    <div>
      {state && state.carItems ? console.log(state.carItems) : null}cart
    </div>
  );
};

export default Cart;
