import { useRouter } from "next/navigation";
import useAuth from "./auth";
import { Component, ComponentType, useEffect } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../firebase/clientApp";

export function withPublic(Component: ComponentType<any>) {
  return function WithPublic(props: any) {
    const router = useRouter();
    const [user, setUser] = useAuthState(auth);

    useEffect(() => {
      if (user) {
        router.replace("/dashboard");
      }
    }, [user, router]);

    if (user) {
      return <span> Loading... </span>;
    }

    return <Component {...props} />;
  };
}
export function withProtected(Component: ComponentType<any>) {
  return function WithProtected(props: any) {
    const router = useRouter();
    const [user, setUser] = useAuthState(auth);
    console.log("USER", user);
    useEffect(() => {
      if (!user) {
        router.replace("/");
      }
    }, [user, router]);

    if (!user) {
      return <span> Loading... </span>;
    }

    return <Component {...props} />;
  };
}
