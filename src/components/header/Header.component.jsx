import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import {
  headerStyle,
  headerRightStyle,
  headerLeftStyle,
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
      </Box>
    </Box>
  );
};

export default Header;
