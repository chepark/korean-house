import { useContext, useEffect, useState } from "react";

import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import {
  headerStyle,
  headerRightStyle,
  headerLeftStyle,
  cartStyle,
  cartNumStyle,
} from "./headerMaterialStyle";
import { CartContext } from "../../contexts/CartContext";
import "./header.style.css";
import { AuthContext } from "../../contexts/AuthContext";
import { cartCounter, getCartItems, userLogOut } from "../../apis";

const Header = () => {
  const { state: authState, dispatch: authDispatch } = useContext(AuthContext);
  const { state: cartState, dispatch: cartDispatch } = useContext(CartContext);
  // const [cartItems, setCartItems] = useState(null);
  const [cartNums, setCartNums] = useState();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchCartItems = async () => {
      if (authState.user && authState.user.uid) {
        const firestoreCartItems = await getCartItems(
          authState.user.uid,
          () => {}
        );
        setCartNums(firestoreCartItems.length);
      }
    };

    fetchCartItems();
  }, [authState.user, cartState.cartItems]);

  const onCartClick = (e) => {
    e.preventDefault();

    // user && save cartItems data in firestore.
    // 1. get user uid.
    // 2. search user document with user uid in firestore.
    // 3. save cartItems in cartItems fields.
    // 3.1 any repetitive items?
    // !user && save cartItems in localStorage.
  };

  const handleLogout = async () => {
    await userLogOut();
  };

  const renderLogInAndSignup = () => {
    return (
      <>
        <a className="header-link link-text" href="/login">
          <Typography>Log In</Typography>
        </a>
        <a className="header-link link-text" href="/signup">
          <Typography>Sign Up</Typography>
        </a>
      </>
    );
  };

  const renderLogOutAndCart = () => {
    return (
      <>
        <Typography onClick={handleLogout}>Log Out</Typography>
        <Box sx={cartStyle}>
          <a className="header-link" href="/cart">
            <ShoppingCartOutlinedIcon />
            <Typography sx={cartNumStyle}>{cartNums}</Typography>
          </a>
        </Box>
      </>
    );
  };

  return (
    <Box sx={headerStyle}>
      <a className="header-link link-text" href="/">
        <Box sx={headerLeftStyle}>
          <Typography>Food Delivery</Typography>
        </Box>
      </a>
      <Box sx={headerRightStyle}>
        {!authState.user ? renderLogInAndSignup() : renderLogOutAndCart()}
      </Box>
    </Box>
  );
};

export default Header;
