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

  console.log(orderDocRef.id);
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
