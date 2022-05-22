import { useEffect, useContext } from "react";

import { getMenu } from "../../apis";
import { GET_MENU } from "../../types/types";
import { MenuContext } from "../../contexts/MenuContext";

import SingleMenu from "../menuItem/SingleMenu.comoponent";

import List from "@mui/material/List";
import Typography from "@mui/material/Typography";

const Menu = () => {
  const { state, dispatch } = useContext(MenuContext);
  const { menu } = state;

  useEffect(() => {
    getMenu((menu) => {
      dispatch({ type: GET_MENU, payload: menu });
    });
  }, []);

  const renderMenu = () => {
    if (menu && menu.length > 0) {
      return menu.map((singleMenu) => {
        return <SingleMenu key={singleMenu.id} singleMenu={singleMenu} />;
      });
    } else {
      return <div>loading...</div>;
    }
  };

  return (
    <>
      <Typography variant="h3" component="h1">
        Menu
      </Typography>
      <List>{renderMenu()}</List>
    </>
  );
};

export default Menu;
