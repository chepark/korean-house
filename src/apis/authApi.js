import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from "../configs/firebaseConfig";

export const createAccount = async (email, password, username) => {
  try {
    console.log("triggered");
    await createUserWithEmailAndPassword(auth, email, password);
    await updateProfile(auth.currentUser, {
      displayName: username,
    });
  } catch (error) {
    console.log("Error in Create Account: ", error.code);
  }
};
