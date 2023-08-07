import { useEffect, useState } from "react";
import { onAuthStateChanged, getAuth } from "firebase/auth";
import useAuth from "./auth";

function AuthStateChanged({ children }: { children: React.ReactNode }) {
  const { setUser } = useAuth();
  const [loading, setLoading] = useState<boolean>(true);
  useEffect(() => {
    onAuthStateChanged(
      getAuth(),
      async (user: any) => {
        setUser(user);
        setLoading(false);
      },
      (a) => {}
    );
    // eslint-disable-next-line
  }, []);

  if (loading) {
    return <span>Loading...</span>;
  }
  return <>{children}</>;
}

export default AuthStateChanged;
