import { useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthContext";
import { getCartItems, removeCartItemsFromFirestore } from "../../apis/cartApi";
import { addOrderToFirestore } from "../../apis/orderApi";

const CheckoutSuccess = () => {
  const { state: authState, dispatch: authDispatch } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    let orderItems;

    setTimeout(async () => {
      const itemsToOrder = await getCartItems(authState.user.uid, () => {});
      await addOrderToFirestore(authState.user.uid, itemsToOrder, () => {});
      await removeCartItemsFromFirestore(authState.user.uid, () => {
        navigate("/");
      });
    }, 5000);
  }, [authState.user]);

  return <div>Payment made successfully.</div>;
};

export default CheckoutSuccess;
