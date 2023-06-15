import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "../../../firebase/clientApp";

export const AuthService = {
  loginWithGoogle: async () => {
    const googleAuth = new GoogleAuthProvider();
    try {
      const userCred = await signInWithPopup(auth, googleAuth);
      return {
        user: userCred,
      };
    } catch (e: any) {
      return {
        error: e.message,
      };
    }
  },
  logout: async () => {
    auth.signOut();
  },
};
