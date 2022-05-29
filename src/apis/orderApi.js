import {
  collection,
  doc,
  addDoc,
  Timestamp,
  getDoc,
  getDocs,
  updateDoc,
  arrayUnion,
  arrayRemove,
  query,
  where,
  orderBy,
  documentId,
  deleteField,
} from "firebase/firestore";
import { db } from "../configs/firebaseConfig";

export const addOrderToFirestore = async (uid, orderItems, cb) => {
  const orderDocRef = await addDoc(collection(db, "orders"), {
    userUid: uid,
    orderItems,
    createdAt: Timestamp.now(),
  });

  cb();

  addOrderHistoryToUserFirestore(uid, orderDocRef.id);
};

const addOrderHistoryToUserFirestore = async (uid, orderDocId) => {
  const docRef = doc(db, "users", uid);
  const docSnap = await getDoc(docRef);

  let orderHistoryToUpdate = [];
  if (docSnap.data().orderHistory) {
    orderHistoryToUpdate = [...docSnap.data().orderHistory];
    await updateDoc(docRef, { orderHistory: deleteField() });
  }
  orderHistoryToUpdate.push(orderDocId);
  await updateDoc(docRef, {
    orderHistory: orderHistoryToUpdate,
  });
};

export const getUserOrdersFromFirestore = async (uid, cb) => {
  // get orderHistory from user doc
  const userDocRef = doc(db, "users", uid);
  const docSnap = await getDoc(userDocRef);
  const orderReference = docSnap.data().orderHistory;

  // get order details from order doc
  const ordersRef = collection(db, "orders");
  const q = query(ordersRef, where(documentId(), "in", [...orderReference]));
  const querySnapshot = await getDocs(q);

  let orders = [];

  querySnapshot.forEach((orderDoc) => {
    let orderObject = orderDoc.data();

    // Change firebase timestamp to string.
    let time = new Date(
      orderObject.createdAt.seconds * 1000
    ).toLocaleDateString();
    orderObject.createdAt = time;

    // save document id as order number
    orderObject.orderNumber = orderDoc.id;

    orders.push(orderObject);
  });

  cb(orders);
};
