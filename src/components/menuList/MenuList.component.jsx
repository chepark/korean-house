import { useEffect, useContext } from "react";

import { getMenu } from "../../apis";
import { GET_MENU, RESET_CART_ERROR } from "../../types/types";
import { MenuContext } from "../../contexts/MenuContext";
import { CartContext } from "../../contexts/CartContext";

import SingleMenu from "../menuItem/SingleMenu.comoponent";

import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import Alert from "@mui/material/Alert";
import Box from "@mui/material/Box";
import { menuListContainerStyle, menuTitleStyle } from "./menuListMuiStyles";

const Menu = () => {
  const { state: menuState, dispatch: menuDispatch } = useContext(MenuContext);
  const { state: cartState, dispatch: cartDispatch } = useContext(CartContext);

  useEffect(() => {
    getMenu((menu) => {
      menuDispatch({ type: GET_MENU, payload: menu });
    });

    const timerId = setTimeout(() => {
      cartDispatch({ type: RESET_CART_ERROR });
    }, 2000);

    return () => {
      clearTimeout(timerId);
    };
  }, [cartState.cartError]);

  const renderMenu = () => {
    if (menuState.menu && menuState.menu.length > 0) {
      return menuState.menu.map((singleMenu) => {
        return <SingleMenu key={singleMenu.id} singleMenu={singleMenu} />;
      });
    } else {
      return <div>loading...</div>;
    }
  };

  return (
    <>
      <Box sx={menuListContainerStyle}>
        <Typography variant="h3" component="h1" sx={menuTitleStyle}>
          Menu
        </Typography>
        {cartState.cartError ? (
          <Alert severity="error">{cartState.cartError}</Alert>
        ) : null}
        <List>{renderMenu()}</List>
      </Box>
    </>
  );
};

export default Menu;
