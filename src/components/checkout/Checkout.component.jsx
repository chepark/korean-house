import { useEffect, useState, useContext } from "react";
import { loadStripe } from "@stripe/stripe-js";

import { AuthContext } from "../../contexts/AuthContext";

import { getCartItems } from "../../apis/cartApi";

let stripePromise;

const getStripe = () => {
  if (!stripePromise) {
    stripePromise = loadStripe(process.env.REACT_APP_STRIPE_KEY);
  }

  return stripePromise;
};

const Checkout = () => {
  const { state: authState, dispatch: authDispatch } = useContext(AuthContext);
  const [cartItems, setCartItems] = useState();
  const [stripeCheckOutList, setStripeCheckoutList] = useState();
  //   const [checkoutOptions, setCheckoutOptions] = useState();
  const [stripeError, setStripeError] = useState(null);
  const [isLoading, setLoading] = useState(false);

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
    const priceAndQuantity = cartItems?.map((cartItem) => {
      return {
        price: cartItem.stripePriceID,
        quantity: cartItem.quanty,
      };
    });

    setStripeCheckoutList(priceAndQuantity);
  }, [setCartItems]);

  //   useEffect(() => {
  //     if (stripeCheckOutList)
  //       setCheckoutOptions({
  //         lineItems: [{ price: "price_1L41lpHbDFztQzbD7qzmKDLo", quantity: 1 }],
  //         mode: "payment",
  //         successUrl: `${window.location.origin}/success`,
  //         cancelUrl: `${window.location.origin}/cancel`,
  //       });
  //   }, [setStripeCheckoutList]);

  const checkoutOptions = {
    lineItems: [
      { price: "price_1L41lpHbDFztQzbD7qzmKDLo", quantity: 1 },
      { price: "price_1L41l2HbDFztQzbDXYoJ1lm5", quantity: 3 },
    ],
    mode: "payment",
    successUrl: `${window.location.origin}/success`,
    cancelUrl: `${window.location.origin}/cancel`,
  };

  const redirectToCheckout = async () => {
    console.log("redirect to checkout");
    const stripe = await getStripe();
    const { error } = await stripe.redirectToCheckout(checkoutOptions);
    console.log("error in stripe", error);
  };

  return (
    <div>
      {console.log(cartItems)}
      <button onClick={redirectToCheckout}>Buy</button>
    </div>
  );
};

export default Checkout;
