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

const Header = () => {
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
          <Typography sx={cartNumStyle}>11</Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default Header;
