import { collection, getDocs } from "firebase/firestore";

import { db } from "../configs/firebaseConfig";

export const getMenu = async (cb) => {
  const menus = [];

  try {
    const querySnapshot = await getDocs(collection(db, "menus"));

    querySnapshot.forEach((doc) => {
      const { id, name, price, imageURL, stripePriceID } = doc.data();
      let singleMenu = { id, name, price, imageURL, stripePriceID };
      menus.push(singleMenu);
    });

    cb(menus);
  } catch (error) {
    console.log("Error in getMenu: ", error);
  }
};
