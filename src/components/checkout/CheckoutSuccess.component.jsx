import { useEffect, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthContext";
import { getCartItems, removeCartItemsFromFirestore } from "../../apis/cartApi";
import { addOrderToFirestore } from "../../apis/orderApi";

import { CircularProgress, Box, Container } from "@mui/material";
import { checkoutContainerStyle } from "./checkoutMuiStyles";

const CheckoutSuccess = () => {
  const { state: authState, dispatch: authDispatch } = useContext(AuthContext);

  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true);

    setTimeout(async () => {
      const itemsToOrder = await getCartItems(authState.user.uid, () => {});
      await addOrderToFirestore(authState.user.uid, itemsToOrder, () => {});
      await removeCartItemsFromFirestore(authState.user.uid, () => {
        setLoading(false);
        navigate("/");
      });
    }, 4000);
  }, [authState.user]);

  return (
    <>
      <Container sx={checkoutContainerStyle}>
        {loading && (
          <Box>
            <div>Payment Successful</div>
            <CircularProgress sx={{ marginTop: "2rem" }} />
          </Box>
        )}
      </Container>
    </>
  );
};

export default CheckoutSuccess;
