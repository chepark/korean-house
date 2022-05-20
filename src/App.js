import "./App.css";
import Header from "./components/header/Header.component.jsx";

import { createTheme, ThemeProvider } from "@mui/material/styles";
import Login from "./components/login/Login.component";
import Signup from "./components/signup/Signup.component";

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
  return (
    <ThemeProvider theme={theme}>
      <div className="App">
        <Header />
        <Signup />
      </div>
    </ThemeProvider>
  );
}

export default App;
