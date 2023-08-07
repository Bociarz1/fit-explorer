import { useRouter } from "next/navigation";
import useAuth from "./auth";
import { Component, ComponentType, useEffect } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../firebase/clientApp";

export function withPublic(Component: ComponentType<any>) {
  return function WithPublic(props: any) {
    const router = useRouter();
    const {user} = useAuth();

    if (user) {
      router.replace("/dashboard");
      return <span> Loading... </span>;
    }

    return <Component {...props} />;
  };
}
export function withProtected(Component: ComponentType<any>) {
  return function WithProtected(props: any) {
    const {user} = useAuth();
    const router = useRouter();
    console.log("USER HALO",user);
      if (!user) {
        router.replace("/");
        return <span> Loading... </span>;
      }
    

    return <Component {...props} />;
  };
}
