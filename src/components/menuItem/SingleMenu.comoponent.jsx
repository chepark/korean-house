import { useState, useContext } from "react";
import { CartContext } from "../../contexts/CartContext";

import ListItem from "@mui/material/ListItem";
import Divider from "@mui/material/Divider";

import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

import "./singleMenu.styles.css";
import {
  listItemContainerMui,
  listItemLeftMui,
  listItemRightMui,
  namePriceLayout,
} from "./singleMenuMuiStyles";
import { ADD_TO_CART, CART_ERROR } from "../../types/types";
import { AuthContext } from "../../contexts/AuthContext";
import { addToCartInFirestore } from "../../apis/cartApi";
import { Typography } from "@mui/material";

const SingleMenu = ({ singleMenu }) => {
  const [isError, setIsError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [quantity, setQuantity] = useState(1);
  const { state: cartState, dispatch: cartDispatch } = useContext(CartContext);
  const { state: authState, dispatch: authDispatch } = useContext(AuthContext);

  const handleQuantityChange = (e) => {
    e.preventDefault();

    setIsError(false);
    setErrorMessage("");

    let quantity = e.target.value;

    if (quantity <= 0) {
      setIsError(true);
      setErrorMessage("Quantity should be more than 0.");
    } else if (quantity > singleMenu.quantity) {
      setIsError(true);
      setErrorMessage("Available stock is " + singleMenu.quantity);
    }

    setQuantity(quantity);
  };

  const onAddToCart = (e) => {
    e.preventDefault();
    const item = {
      name: singleMenu.name,
      price: singleMenu.price,
      quantity,
      imageURL: singleMenu.imageURL,
      stripePriceID: singleMenu.stripePriceID,
    };
    // validate if quantity is over 0.
    if (quantity <= 0) {
      setIsError(true);
      setErrorMessage("Quantity should be more than 0.");
      return;
    }

    if (!authState.user) {
      cartDispatch({ type: CART_ERROR, payload: "Log in is required." });
    } else if (authState.user) {
      addToCartInFirestore(authState.user, item, (cartItemsArr) => {
        cartDispatch({ type: ADD_TO_CART, payload: cartItemsArr });
      });
    }
  };

  return (
    <>
      <ListItem sx={listItemContainerMui}>
        <Box component="div" sx={listItemLeftMui}>
          <img
            className="menu-image"
            src={singleMenu.imageURL}
            alt={singleMenu.name}
          />
          <Box sx={namePriceLayout}>
            <Typography>{singleMenu.name.toUpperCase()}</Typography>
            <Typography>€ {singleMenu.price}</Typography>
          </Box>
        </Box>
        <Box component="div" sx={listItemRightMui}>
          <TextField
            sx={{ maxWidth: "80px" }}
            error={isError}
            helperText={errorMessage}
            size="small"
            id="quantity"
            label="Quantity"
            type="number"
            InputLabelProps={{
              shrink: true,
            }}
            value={quantity}
            onChange={handleQuantityChange}
          />
          <Button
            variant="contained"
            sx={{ width: "inherit" }}
            onClick={onAddToCart}
          >
            Add to Cart
          </Button>
        </Box>
      </ListItem>
      <Divider />
    </>
  );
};

export default SingleMenu;
