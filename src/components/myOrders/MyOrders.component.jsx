import { useEffect, useContext, useState } from "react";
import { getUserOrdersFromFirestore } from "../../apis/orderApi";
import { AuthContext } from "../../contexts/AuthContext";

import { Container, CircularProgress, Typography, Box } from "@mui/material";
import { myOrderContainerStyle, loadingBoxStyle } from "./myOrderMuiStyle";
import MyOrder from "../myOrder/MyOrder.component";

const MyOrders = () => {
  const { state: authState, dispatch: authDispatch } = useContext(AuthContext);
  const [orders, setOrders] = useState();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);

    const fetchOrders = async () => {
      await getUserOrdersFromFirestore(authState.user.uid, (orderHistory) => {
        setOrders(orderHistory);
        setLoading(false);
      });
    };

    if (authState.user) fetchOrders();
  }, [authState.user]);

  const renderOrders = () => {
    return orders.map((order) => {
      return <MyOrder order={order} key={order.orderNumber} />;
    });
  };

  return (
    <>
      <Container sx={myOrderContainerStyle}>
        {loading ? (
          <Box sx={loadingBoxStyle}>
            <Typography>...loading orders</Typography>
            <CircularProgress sx={{ marginTop: "2rem" }} />
          </Box>
        ) : (
          renderOrders()
        )}
      </Container>
    </>
  );
};

export default MyOrders;
