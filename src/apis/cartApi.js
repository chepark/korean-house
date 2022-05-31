import {
  doc,
  getDoc,
  updateDoc,
  arrayUnion,
  deleteField,
} from "firebase/firestore";
import { db } from "../configs/firebaseConfig";

export const getCartItems = async (uid, cb) => {
  const docRef = doc(db, "users", uid);
  const docSnap = await getDoc(docRef);
  const docData = docSnap.data();

  if (!docData.cartItems) {
    cb(null);
  }
  // setCartItems
  cb(docData.cartItems);

  return docData.cartItems;
};

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
          const { name, price, imageURL, stripePriceID } = item;
          let newCartItem = {
            name,
            price,
            quantity: parseInt(cartItem.quantity) + parseInt(item.quantity),
            imageURL,
            stripePriceID,
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

export const removeCartItemFromFirestore = async (user, item, cb) => {
  const docRef = doc(db, "users", user.uid);
  const docSnap = await getDoc(docRef);
  const docData = docSnap.data();
  const existingCartItems = docData.cartItems;

  let cartItemsAfterRemoving = [];

  existingCartItems.forEach((existingItem) => {
    if (existingItem.name !== item.name) {
      cartItemsAfterRemoving.push(existingItem);
    }
  });

  // delete cartItems in firestore
  await updateDoc(docRef, {
    cartItems: deleteField(),
  });
  // save cartItems in firestore
  await updateDoc(docRef, {
    cartItems: cartItemsAfterRemoving,
  });

  cb(cartItemsAfterRemoving);
};

export const removeCartItemsFromFirestore = async (uid, cb) => {
  const docRef = doc(db, "users", uid);
  await updateDoc(docRef, { cartItems: deleteField() });

  cb();
};

export const editCartItemQuantityInFirestore = async (
  uid,
  item,
  newQuantity,
  cb
) => {
  const docRef = doc(db, "users", uid);
  const docSnap = await getDoc(docRef);
  const docData = docSnap.data();
  const existingCartItems = docData.cartItems;

  let cartItemsToUpdate = [];
  // find the element to change.
  existingCartItems.forEach((cartItem) => {
    if (cartItem.name !== item.name) {
      cartItemsToUpdate.push(cartItem);
    } else if (cartItem.name === item.name) {
      let itemAfterQuantityChange = { ...item };
      itemAfterQuantityChange.quantity = newQuantity;

      cartItemsToUpdate.push(itemAfterQuantityChange);
    }
  });

  await updateDoc(docRef, {
    cartItems: deleteField(),
  });
  // save cartItems in firestore
  await updateDoc(docRef, {
    cartItems: cartItemsToUpdate,
  });

  cb(cartItemsToUpdate);
};
