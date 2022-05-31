import {
  ListItem,
  Box,
  Typography,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
} from "@mui/material";

const MyOrder = ({ order }) => {
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
    <ListItem
      sx={{
        display: "flex",
        flexDirection: "column",
        width: "80%",
        marginTop: "3rem",
      }}
    >
      <Box
        sx={{
          width: "100%",
          backgroundColor: "primary.light",
          color: "primary.contrastText",
          padding: ".5rem 1rem",
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <div>
          Order Made:{" "}
          {order.createdAt.toLocaleDateString() +
            "  " +
            order.createdAt.toLocaleTimeString()}
        </div>
        <Typography>Order Numer: {order.orderNumber}</Typography>
        <Typography>Total: €{orderTotal(order)}</Typography>
      </Box>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Menu</TableCell>
            <TableCell>Qt</TableCell>
            <TableCell align="right">Price</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {order.orderItems.map((item) => {
            return (
              <TableRow key={item.name + item.quantity}>
                <TableCell>{item.name}</TableCell>
                <TableCell>{item.quantity}</TableCell>
                <TableCell align="right">
                  €{item.quantity * item.price}
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </ListItem>
  );
};

export default MyOrder;
