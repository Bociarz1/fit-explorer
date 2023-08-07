"use client";
import React from "react";
import { AuthProvider } from "@/hooks/auth";
import styles from "./styles.module.scss";
import ImgSlider from "./components/imgSlider/ImgSlider";
import LoginBtn from "./components/login/LoginBtn";
import { withPublic } from "@/hooks/routes";

function Home() {
  return (
    <>
      <ImgSlider />
      <LoginBtn />
    </>
  );
}

export default withPublic(Home);
