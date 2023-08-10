import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "../../../firebase/clientApp";
import useAuth from "@/hooks/auth";

export const AuthService = {
  loginWithGoogle: async () => {
    const googleAuth = new GoogleAuthProvider();
    try {
      const userCred = await signInWithPopup(auth, googleAuth);
      return {
        user: userCred.user,
      };
    } catch (e: any) {
      return {
        error: e.message,
      };
    }
  },
  logout: async () => {
    await auth.signOut();
  },
  getClientUserInfo: async () => {
    return await auth.currentUser
  }
};
