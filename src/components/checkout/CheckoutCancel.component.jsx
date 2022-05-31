import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { CircularProgress, Box, Container } from "@mui/material";
import { checkoutContainerStyle } from "./checkoutMuiStyles";

const CheckoutCancel = () => {
  const [loading, setLoading] = useState(false);
  let navigate = useNavigate();

  useEffect(() => {
    setLoading(true);
    const timerId = setTimeout(() => {
      navigate("/cart");
    }, 3000);

    return () => {
      clearTimeout(timerId);
    };
  }, []);

  return (
    <Container sx={checkoutContainerStyle}>
      {loading && (
        <Box>
          <div>Canceled Payment</div>
          <CircularProgress sx={{ marginTop: "2rem" }} />
        </Box>
      )}
    </Container>
  );
};

export default CheckoutCancel;
