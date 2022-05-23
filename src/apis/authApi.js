import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from "../configs/firebaseConfig";

export const createAccount = async (email, password, username) => {
  try {
    await createUserWithEmailAndPassword(auth, email, password);
    await updateProfile(auth.currentUser, {
      displayName: username,
    });
    // save the date in firestore
    // reference is uid
  } catch (error) {
    console.log("Error in Create Account: ", error.code);
  }
};
