"use client";
import styles from "./nav.module.css";
import React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Container from "@mui/material/Container";
import Hamburger from "./hamburger/Hamburger";
import LogoWithTitle from "./logo/Logo";
import User from "./user/User";
import NavElements from "./navElements/NavElements";
import useAuth from "@/hooks/auth";
import DashboardIcon from '@mui/icons-material/Dashboard';
import InfoIcon from '@mui/icons-material/Info';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import NotListedLocationIcon from '@mui/icons-material/NotListedLocation';
import PlaceIcon from '@mui/icons-material/Place';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';

export const pages = [
  { name: "dashboard", title: "Strona główna", icon: <DashboardIcon/>},
  { name: "aboutme", title: "O mnie", icon: <InfoIcon/>},
  {
    name: "adminPanel",
    title: "Panel admina",
    icon: <AdminPanelSettingsIcon/>,
    subPage: [
      { name: "proposalPlaces", title: "Proponowane miejsca", icon: <NotListedLocationIcon/>},
      { name: "places", title: "Miejsca", icon:  <PlaceIcon/>},
      { name: "users", title: "Użytkownicy", icon: <PeopleAltIcon/> },
    ],
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
            <LogoWithTitle logo={logo} />

            {/* Hamburger Comp */}
            <Hamburger user={auth.user} logo={logo} />

            {auth.user ? (
              <>
                {/* Nav el Comp */}
                <NavElements />

                {/* User Comp */}
                <User user={auth.user} />
              </>
            ) : null}
          </Toolbar>
        </Container>
      </AppBar>
    </div>
  );
}
