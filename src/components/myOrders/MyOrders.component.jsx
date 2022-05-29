import { useEffect, useContext, useState } from "react";
import { getUserOrdersFromFirestore } from "../../apis/orderApi";
import { AuthContext } from "../../contexts/AuthContext";

import {
  List,
  ListItem,
  Typography,
  Box,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
} from "@mui/material";

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

    fetchOrders();
  }, [authState.user]);

  const renderOrders = () => {
    return orders.map((order) => {
      return (
        <ListItem
          sx={{ display: "flex", flexDirection: "column", width: "80%" }}
        >
          <Box
            sx={{
              width: "100%",
              backgroundColor: "grey",
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <Typography>Order made: {order.createdAt}</Typography>
            <Typography>Order Numer: {order.orderNumber}</Typography>
            <Typography>Total: {orderTotal(order)}</Typography>
          </Box>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Menu</TableCell>
                <TableCell>Qt</TableCell>
                <TableCell>Price</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {order.orderItems.map((item) => {
                return (
                  <TableRow>
                    <TableCell>{item.name}</TableCell>
                    <TableCell>{item.quantity}</TableCell>
                    <TableCell>{item.quantity * item.price}</TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </ListItem>
      );
    });
  };

  const orderTotal = (order) => {
    const itemPrices = [];
    order.orderItems.map((item) => {
      itemPrices.push(item.quantity * item.price);
    });

    const totalPrice = itemPrices.reduce((prev, current) => {
      return prev + current;
    }, 0);

    return totalPrice;
  };

  return (
    <div>
      <div>{loading ? "...loading" : renderOrders()}</div>
    </div>
  );
};

export default MyOrders;
