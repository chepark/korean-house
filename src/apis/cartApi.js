import {
  collection,
  doc,
  getDoc,
  getDocs,
  updateDoc,
  arrayUnion,
  arrayRemove,
  query,
  where,
  documentId,
  deleteDoc,
  deleteField,
} from "firebase/firestore";
import { db } from "../configs/firebaseConfig";

export const addToCartInFirestore = async (user, item, cb) => {
  // get the document.
  const docRef = doc(db, "users", user.uid);
  const docSnap = await getDoc(docRef);
  const docData = docSnap.data();

  if (!docData.cartItems) {
    // create cartItems field and add items
    await updateDoc(docRef, { cartItems: arrayUnion(item) });
  } else {
    // check the item exists.
    const isItemExisting = docData.cartItems.find(
      (data) => data.name === item.name
    );

    // variables to be ready
    // for updating cartItems.
    const existingCartItems = docData.cartItems;
    let cartItemsToUpdtate = [];

    // handle different cases.
    if (isItemExisting) {
      existingCartItems.forEach((cartItem) => {
        if (cartItem.name !== item.name) {
          cartItemsToUpdtate.push(cartItem);
        } else if (cartItem.name === item.name) {
          let newCartItem = {
            name: item.name,
            price: item.price,
            quantity: parseInt(cartItem.quantity) + parseInt(item.quantity),
          };
          cartItemsToUpdtate.push(newCartItem);
        }
      });
    } else {
      existingCartItems.forEach((cartItem) => {
        cartItemsToUpdtate.push(cartItem);
      });

      cartItemsToUpdtate.push(item);
    }
    // delete cartItems in firestore
    await updateDoc(docRef, {
      cartItems: deleteField(),
    });
    // save cartItems in firestore
    await updateDoc(docRef, {
      cartItems: cartItemsToUpdtate,
    });

    cb(cartItemsToUpdtate);
  }
};

export const cartCounter = async (user) => {
  const docRef = doc(db, "users", user.uid);
  const docSnap = await getDoc(docRef);
  const docData = docSnap.data();
  return docData.cartItems.length;
};
