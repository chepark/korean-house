import { collection, getDocs } from "firebase/firestore";
import { ref, getDownloadURL } from "firebase/storage";
import { db, storage } from "../configs/firebaseConfig";

import SingleMenu from "../models/SingleMenu";
import { GET_MENU } from "../types/types";

export const getMenu = async (cb) => {
  const menus = [];

  try {
    const querySnapshot = await getDocs(collection(db, "menus"));

    querySnapshot.forEach((doc) => {
      const { id, name, quantity, price, imageURL } = doc.data();
      let singleMenu = { id, name, quantity, price, imageURL };
      menus.push(singleMenu);
    });

    cb(menus);
  } catch (error) {
    console.log("Error in getMenu: ", error);
  }
};
