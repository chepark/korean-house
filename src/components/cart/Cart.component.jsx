import { useContext, useEffect, useState } from "react";
import SingleCartItem from "../singleCartItem/SingleCartItem.component.jsx";

import { CartContext } from "../../contexts/CartContext";
import { AuthContext } from "../../contexts/AuthContext";

import { getCartItems, removeCartItem } from "../../apis";

import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";

const Cart = () => {
  const { state: authState, dispatch: authDispatch } = useContext(AuthContext);
  const { state: cartState, dispatch: cartDispatch } = useContext(CartContext);

  const [cartItems, setCartItems] = useState();
  const [total, setTotal] = useState(null);
  const [loading, setLoading] = useState();
  const [isError, setIsError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

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

  useEffect(() => {
    console.log(cartItems);
    const cartTotal = cartItems
      .map((item) => item.quantity * item.price)
      .reduce((prevValue, curValue) => {
        return prevValue + curValue;
      }, 0);

    setTotal(cartTotal);
  }, [cartItems, authState.user]);

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
        <List> {cartItems && cartItems.length > 0 && renderCartItems()} </List>
      </Box>
      <Box>
        <Typography>Total: {total}</Typography>
      </Box>
    </>

    // <Box sx={{ display: "flex", flexDirection: "column", width: "100%" }}>
    //   {loading && <CircularProgress />}
    //   {cartItems && cartItems.length > 0 && renderCartItems()}
    //   cart
    // </Box>
  );
};

export default Cart;
