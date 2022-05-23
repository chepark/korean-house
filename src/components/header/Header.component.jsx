import { useContext, useEffect } from "react";

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

const Header = () => {
  const { state, dispatch } = useContext(CartContext);

  return (
    <Box sx={headerStyle}>
      <Box sx={headerLeftStyle}>
        <Typography>Food Delivery</Typography>
      </Box>
      <Box sx={headerRightStyle}>
        <Typography>Log In</Typography>
        <Typography>Sign Up</Typography>
        <Box sx={cartStyle}>
          <ShoppingCartOutlinedIcon />
          <Typography sx={cartNumStyle}>
            {state.cartItems && state.cartItems.length}
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default Header;
