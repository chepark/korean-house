import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import SingleCartItem from "../singleCartItem/SingleCartItem.component.jsx";

import { CartContext } from "../../contexts/CartContext";
import { AuthContext } from "../../contexts/AuthContext";
import { ADD_TO_CART } from "../../types/types";
import { getCartItems, removeCartItem } from "../../apis";

import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";

const Cart = () => {
  const { state: authState, dispatch: authDispatch } = useContext(AuthContext);
  const { state: cartState, dispatch: cartDispatch } = useContext(CartContext);

  const [cartItems, setCartItems] = useState();
  const [total, setTotal] = useState(null);
  const [loading, setLoading] = useState();
  const [isError, setIsError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true);

    const fetchCartItems = async () => {
      if (authState.user && authState.user.uid) {
        await getCartItems(authState.user.uid, (cartItems) => {
          setCartItems(cartItems);
        });
        setLoading(false);
      }
    };

    fetchCartItems();
  }, [authState.user]);

  // useEffect(() => {
  //   const cartTotal = cartItems
  //     .map((item) => item.quantity * item.price)
  //     .reduce((prevValue, curValue) => {
  //       return prevValue + curValue;
  //     }, 0);

  //   setTotal(cartTotal);
  // }, [cartState.cartItems]);

  const renderCartItems = () => {
    return cartItems.map((cartItem) => {
      return (
        <SingleCartItem
          cartItem={cartItem}
          user={authState.user}
          setCartItems={setCartItems}
          cartItems={cartItems}
        />
      );
    });
  };

  const renderCartTotal = () => {
    const cartTotal = cartItems
      .map((item) => item.quantity * item.price)
      .reduce((prevValue, curValue) => {
        return prevValue + curValue;
      }, 0);

    return cartTotal;
  };

  const handleCheckout = (e) => {
    e.preventDefault();
    navigate("/checkout", { replace: true });
  };

  return (
    <>
      <Box>
        <Typography variant="h3" component="h1">
          Cart
        </Typography>

        {/* {cartState.cartError ? (
      <Alert severity="error">{cartState.cartError}</Alert>
    ) : null} */}
        {loading && <CircularProgress />}
        <List>{cartItems && cartItems.length > 0 && renderCartItems()}</List>
      </Box>
      <Box>
        <Typography>
          Total: {cartItems && cartItems.length > 0 ? renderCartTotal() : null}
        </Typography>
      </Box>
      <Button onClick={handleCheckout}>Checkout</Button>
    </>

    // <Box sx={{ display: "flex", flexDirection: "column", width: "100%" }}>
    //   {loading && <CircularProgress />}
    //   {cartItems && cartItems.length > 0 && renderCartItems()}
    //   cart
    // </Box>
  );
};

export default Cart;
