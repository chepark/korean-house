import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { CartContext } from "../../contexts/CartContext";
import { AuthContext } from "../../contexts/AuthContext";
import { getCartItems } from "../../apis";
import SingleCartItem from "../singleCartItem/SingleCartItem.component.jsx";

import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import ProductionQuantityLimitsIcon from "@mui/icons-material/ProductionQuantityLimits";

import { cartLoadingStyle, cartTitleStyle } from "./cartMuistyle";

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
  }, [authState.user, cartState]);

  const renderCartItems = () => {
    return cartItems.map((cartItem) => {
      return (
        <SingleCartItem
          key={cartItem.name}
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

  const redirectToMenu = () => {
    navigate("/", { replace: true });
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
        <Typography variant="h3" component="h1" sx={cartTitleStyle}>
          Cart
        </Typography>

        {loading && (
          <Box sx={cartLoadingStyle}>
            <CircularProgress />
          </Box>
        )}
        {cartItems && cartItems.length > 0 && (
          <>
            <List>{renderCartItems()}</List>
            <Box sx={{ marginTop: "1rem" }}>
              <Typography
                sx={{
                  fontSize: "20px",
                  fontWeight: "bold",
                  marginBottom: "1rem",
                }}
              >
                TOTAL: € {renderCartTotal()}
              </Typography>
            </Box>
            <Button variant="contained" onClick={redirectToCheckout}>
              Go to Checkout
            </Button>
          </>
        )}

        {(loading && !cartItems) ||
          (cartItems?.length <= 0 && (
            <>
              <Box>
                <Typography>The cart is empty.</Typography>
                <ProductionQuantityLimitsIcon />
              </Box>
              <Button onClick={redirectToMenu}>Go to Menu</Button>
            </>
          ))}
      </Box>
    </>
  );
};

export default Cart;
