import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { CartContext } from "../../contexts/CartContext";
import { AuthContext } from "../../contexts/AuthContext";
import { ADD_TO_CART } from "../../types/types";
import { getCartItems, removeCartItem } from "../../apis";
import SingleCartItem from "../singleCartItem/SingleCartItem.component.jsx";

import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";

import { loadStripe } from "@stripe/stripe-js";

let stripePromise;

const getStripe = () => {
  if (!stripePromise) {
    stripePromise = loadStripe(`${process.env.REACT_APP_STRIPE_KEY}`);
  }

  return stripePromise;
};

const Cart = () => {
  const { state: authState, dispatch: authDispatch } = useContext(AuthContext);
  const { state: cartState, dispatch: cartDispatch } = useContext(CartContext);

  const [cartItems, setCartItems] = useState();
  const [total, setTotal] = useState(null);
  const [loading, setLoading] = useState();
  const [isError, setIsError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [stripeCheckoutList, setStripeCheckoutList] = useState();

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

  const redirectToCheckout = async (e) => {
    e.preventDefault();
    let stripeCheckoutList = [];

    cartItems.forEach((cartItem) => {
      stripeCheckoutList.push({
        price: cartItem.stripePriceID,
        quantity: parseInt(cartItem.quantity),
      });
    });

    const checkoutOptions = {
      lineItems: [...stripeCheckoutList],
      mode: "payment",
      successUrl: `${window.location.origin}/success`,
      cancelUrl: `${window.location.origin}/cancel`,
    };

    const stripe = await getStripe();
    const { error } = await stripe.redirectToCheckout(checkoutOptions);
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
      <Button onClick={redirectToCheckout}>Checkout</Button>
    </>

    // <Box sx={{ display: "flex", flexDirection: "column", width: "100%" }}>
    //   {loading && <CircularProgress />}
    //   {cartItems && cartItems.length > 0 && renderCartItems()}
    //   cart
    // </Box>
  );
};

export default Cart;
