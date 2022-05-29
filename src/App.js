import { useEffect, useContext } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import "./App.css";
import { createTheme, ThemeProvider } from "@mui/material/styles";

import Header from "./components/header/Header.component.jsx";
import Login from "./components/login/Login.component";
import Signup from "./components/signup/Signup.component";
import MenuList from "./components/menuList/MenuList.component";
import Cart from "./components/cart/Cart.component";
import MyOrders from "./components/myOrders/MyOrders.component";

import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./configs/firebaseConfig";
import { AuthContext, AuthProvider } from "./contexts/AuthContext";
import { LOGIN_SUCCESS, LOGOUT } from "./types/types";

import { MenuProvider } from "./contexts/MenuContext";
import { CartProvider } from "./contexts/CartContext";

import CheckoutSuccess from "./components/checkout/CheckoutSuccess.component";
import CheckoutCancel from "./components/checkout/CheckoutCancel.component";

import "@stripe/stripe-js";

const theme = createTheme({
  palette: {
    primary: {
      light: "#757de8",
      main: "#3f51b5",
      dark: "#002984",
      contrastText: "#fff",
    },
    secondary: {
      light: "#ff7961",
      main: "#f44336",
      dark: "#ba000d",
      contrastText: "#000",
    },
  },
});

function App() {
  const { state, dispatch } = useContext(AuthContext);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        dispatch({ type: LOGIN_SUCCESS, payload: user });
        console.log("User in");
      } else {
        // user is signed out.
        dispatch({ type: LOGOUT });
      }
    });

    return unsubscribe;
  }, []);

  return (
    <MenuProvider>
      <CartProvider>
        <ThemeProvider theme={theme}>
          <div className="App">
            <Header />
            <Router>
              <Routes>
                <Route path="/" element={<MenuList />} />
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/cart" element={<Cart />} />

                <Route path="/success" element={<CheckoutSuccess />} />
                <Route path="/cancel" element={<CheckoutCancel />} />
                <Route path="/myorders" element={<MyOrders />} />
              </Routes>
            </Router>
          </div>
        </ThemeProvider>
      </CartProvider>
    </MenuProvider>
  );
}

export default App;
