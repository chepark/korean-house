import {
  createUserWithEmailAndPassword,
  updateProfile,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { setDoc, doc } from "firebase/firestore";
import { auth, db } from "../configs/firebaseConfig";

export const createAccount = async (email, password, username, cb) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    await updateProfile(auth.currentUser, {
      displayName: username,
    });
    // save the date in firestore
    await createUserInFirestore(userCredential.user);
    // reference is uid

    cb();
  } catch (error) {
    console.log("Error in Create Account: ", error.code);
  }
};

export const createUserInFirestore = async (user) => {
  try {
    await setDoc(doc(db, "users", user.uid), {
      username: user.displayName,
      email: user.email,
    });
    console.log("set a user in firestore");
  } catch (error) {
    console.log("Error while adding a user document in Firestore: ", error);
  }
};

export const userLogin = async (email, password, cb) => {
  try {
    console.log("2");
    await signInWithEmailAndPassword(auth, email, password);
    cb();
  } catch (error) {
    console.log("Error in sign in: ", error.code);
  }
};

export const userLogOut = async () => {
  await signOut(auth);
};
