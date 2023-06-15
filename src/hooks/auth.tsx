"use client";
import { AuthService } from "@/services/auth/AuthService";
import { UserCredential } from "firebase/auth";
import { useRouter } from "next/navigation";
import { useContext, useState, createContext, ReactNode } from "react";

interface AuthContextProps {
  user: UserCredential | null;
  error: string;
  loginWithGoogle: () => Promise<void>;
  logout: () => Promise<void>;
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
  const [user, setUser] = useState<UserCredential | null>(null);
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

  const value: AuthContextProps = {
    user,
    error,
    loginWithGoogle,
    logout,
  };

  return <authContext.Provider value={value} {...props} />;
}
