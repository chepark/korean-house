import { useEffect, useState } from "react";
import ListItem from "@mui/material/ListItem";
import Divider from "@mui/material/Divider";
import ListItemText from "@mui/material/ListItemText";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

import "./singleMenu.styles.css";
import {
  listItemContainerMui,
  listItemLeftMui,
  listItemRightMui,
} from "./singleMenuMuiStyles";

const SingleMenu = ({ singleMenu }) => {
  const [isError, setIsError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [quantity, setQuantity] = useState(0);

  const handleQuantityChange = (e) => {
    e.preventDefault();

    setIsError(false);
    setErrorMessage("");

    let quantity = e.target.value;

    if (quantity < 0) {
      setIsError(true);
      setErrorMessage("Quantity should be more than 0.");
    } else if (quantity > singleMenu.quantity) {
      setIsError(true);
      setErrorMessage("Available stock is " + singleMenu.quantity);
    }

    setQuantity(quantity);
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
          <ListItemText
            primary={singleMenu.name}
            secondary={"€" + singleMenu.price}
          />
        </Box>
        <Box component="div" sx={listItemRightMui}>
          <TextField
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
          <Button variant="contained" sx={{ width: "100%" }}>
            Add to Cart
          </Button>
        </Box>
      </ListItem>
      <Divider />
    </>
  );
};

export default SingleMenu;
