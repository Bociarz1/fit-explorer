"use client";
import styles from "./nav.module.css";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../../firebase/clientApp";
import React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Container from "@mui/material/Container";
import Hamburger from "./hamburger/Hamburger";
import LogoWithTitle from "./logo/Logo";
import User from "./user/User";
import NavElements from "./navElements/NavElements";
import useAuth from "@/hooks/auth";

export const pages = [
  { name: "dashboard", title: "Strona główna" },
  { name: "aboutme", title: "O mnie"},
  {
    name: "adminPanel",
    subPage: [{ name: "adminNr1", title: "adminnumer1" }],
    title: "Panel",
  },
];
export default function Nav() {
  const auth = useAuth();

  const logo = "Fit Explorer";
 
  return (
    <div className={styles.container}>
      <AppBar position="static" sx={{ bgcolor: "#272727" }}>
        <Container maxWidth="xl" sx={{ color: "white" }}>
          <Toolbar disableGutters>
            
            {/* Logo with title Comp */}
            <LogoWithTitle logo={logo}/>

            {/* Hamburger Comp */}
            <Hamburger user={auth.user} logo={logo}/>

            {auth.user ? (
              <>
              {/* Nav el Comp */}
                <NavElements/>

                {/* User Comp */}
                <User user={auth.user}/>
              </>
            ) : null}
          </Toolbar>
        </Container>
      </AppBar>
    </div>
  );
}
