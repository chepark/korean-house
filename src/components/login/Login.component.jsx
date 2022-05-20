import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";

const Login = () => {
  const isEmailError = () => {};

  return (
    <>
      <Box component="form">
        <TextField
          required
          label="Email"
          variant="filled"
          error={isEmailError}
        />
        <TextField required label="Password" variant="filled" />
      </Box>
    </>
  );
};
export default Login;
