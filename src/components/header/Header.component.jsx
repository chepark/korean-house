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
  headerLayout,
} from "./headerMuiStyle";
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
        if (firestoreCartItems?.length > 0) {
          setCartNums(firestoreCartItems.length);
        } else setCartNums(0);
      }
    };

    fetchCartItems();
  }, [authState.user, cartState.cartItems]);

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
        <a className="header-link link-text" href="/myorders">
          <Typography>My Orders</Typography>
        </a>
        <Typography className="header-link link-text" onClick={handleLogout}>
          Log Out
        </Typography>
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
    <Box sx={headerLayout}>
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
    </Box>
  );
};

export default Header;
