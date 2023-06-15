import React from "react";

import { AuthProvider } from "@/hooks/auth";
import styles from "./styles.module.scss"
import ImgSlider from "./components/imgSlider/ImgSlider";
import LoginBtn from "./components/login/LoginBtn";

export default function Home() {
  return (
      <>
        <ImgSlider/>
        <LoginBtn/>
      </>
  );
}
