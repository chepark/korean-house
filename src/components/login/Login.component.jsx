import { useState } from "react";
import { useNavigate } from "react-router-dom";

import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { Button } from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";

import { loginFormMui, loginContainerMui } from "./loginMuiStyles.js";
import { userLogin } from "../../apis/authApi.js";
import { validateLoginForm } from "../../utils/formValidation.js";

const Login = () => {
  const [errors, setErrors] = useState({});
  const [values, setValues] = useState({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleChange = (e, name) => {
    setErrors({});
    setValues({ ...values, [name]: e.target.value });
  };

  const handleLoginSubmit = async (e) => {
    e.preventDefault();

    validateLoginForm(values, setErrors);

    if (!errors) {
      console.log("1");
      await userLogin(values.email, values.password, () => {
        setLoading(true);
        navigate("/", { replace: true });
      });
    } else return;

    setLoading(false);
  };

  return (
    <>
      <Container sx={loginContainerMui}>
        {console.log(errors)}
        <h2>Log In</h2>
        <Box component="form" sx={loginFormMui}>
          <TextField
            required
            error={errors && errors.email ? true : false}
            helperText={errors.email}
            label="Email"
            variant="filled"
            margin="normal"
            values={values.email}
            onChange={(e) => {
              handleChange(e, "email");
            }}
          />
          <TextField
            required
            error={errors && errors.password ? true : false}
            helperText={errors.password}
            label="Password"
            variant="filled"
            margin="normal"
            values={values.password}
            onChange={(e) => {
              handleChange(e, "password");
            }}
          />
        </Box>
        {!loading ? (
          <Button variant="contained" size="large" onClick={handleLoginSubmit}>
            Log In
          </Button>
        ) : (
          <LoadingButton loading>Log In</LoadingButton>
        )}
        <p>Don't have an account? Sign Up</p>
      </Container>
    </>
  );
};
export default Login;
