"use client";
import { AuthService } from "@/services/auth/AuthService";
import { User, UserCredential } from "firebase/auth";
import { useRouter } from "next/navigation";
import {
  useContext,
  useState,
  createContext,
  ReactNode,
  SetStateAction,
  Dispatch,
} from "react";

interface AuthContextProps {
  user: User | null;
  error: string;
  loginWithGoogle: () => Promise<void>;
  logout: () => Promise<void>;
  setUser: Dispatch<SetStateAction<User | null>>;
  getClientUserInfo: () => Promise<any>;
}

const authContext = createContext<AuthContextProps | null>(null);

export default function useAuth(): AuthContextProps {
  const context = useContext(authContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}

interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider(props: AuthProviderProps) {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [error, setError] = useState("");

  const loginWithGoogle = async (): Promise<void> => {
    const { error, user } = await AuthService.loginWithGoogle();
    setUser(user ?? null);
    setError(error ?? "");
  };

  const logout = async (): Promise<void> => {
    await AuthService.logout();
    setUser(null);
  };

  const getClientUserInfo = async (): Promise<any> => {
    const user = await AuthService.getClientUserInfo();
    if (user === undefined || user === null) {
      return
    }
    const userInfo = {
      id: user?.uid,
      userName: user?.displayName,
      email: user?.email,
      avatarUrl: user?.photoURL,
    };
    return userInfo;
  };

  const value: AuthContextProps = {
    user,
    error,
    loginWithGoogle,
    logout,
    setUser,
    getClientUserInfo,
  };

  return <authContext.Provider value={value} {...props} />;
}
