"use client";
import { useEffect } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import useAuth from "@/hooks/auth";
import { withPublic } from "@/hooks/routes";
import "firebase/compat/database";
import GoogleButton from "react-google-button";
import { Typography } from "@mui/material";
import styles from "./styles.module.css";
import { auth } from "../../../../firebase/clientApp";
import ImgSlider from "../imgSlider/ImgSlider";

function LoginBtn() {
  const { loginWithGoogle } = useAuth();
  const [user, setUser] = useAuthState(auth);
  return (
    <>
      <GoogleButton
        className={styles.btn}
        label="Continue with Google"
        type="dark"
        onClick={loginWithGoogle}
      />
    </>
  );
}

export default withPublic(LoginBtn);
