"use client";
import useAuth from "@/hooks/auth";
import styles from "./nav.module.css";
import { SetStateAction, useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../../firebase/clientApp";
import React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';
import { useRouter } from "next/navigation";

export default function Nav() {
  const { logout } = useAuth();
  const [user, setUser] = useAuthState(auth);
  const router = useRouter();

  const pages = ["dashboard", "about me"];
  const settings = ["profile", "logout"];
  const logo = "Fit Explorer";
  const [avatar,setAvatar] = useState<string | null | undefined>("")
  const [userImg,setUserImg] = useState<string | null | undefined>("")


  useEffect(()=>{
    if (user) {
      setAvatar(user?.displayName)
      setUserImg(user?.photoURL)
    }
  },[user])

  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(
    null
  );
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(
    null
  );

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const navAction = (route: string) => {
    handleCloseNavMenu();
    router.replace("/" + route);
  };

  const profileAction = (route: string) => {
    handleCloseUserMenu()
    route === "profile" ? router.replace("/profile" + "/id") : logout();
  };

  return (
    <div className={styles.container}>
      <AppBar position="static" sx={{bgcolor:"#272727"}}>
        <Container maxWidth="xl" sx={{color:"white"}}>
          <Toolbar disableGutters>
          <LocationOnOutlinedIcon sx={{ display: { xs: "none", md: "flex" }, mr: 1, color:"#F9B707"}} />
            <Typography
              variant="h6"
              noWrap
              component="a"
              href="/dashboard"
              sx={{
                mr: 2,
                display: { xs: "none", md: "flex" },
                fontFamily: "monospace",
                fontWeight: 700,
                letterSpacing: ".3rem",
                color: "inherit",
                textDecoration: "none",
              }}>
              {logo}
            </Typography>
            {user ? (
              <>
                <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
                  <IconButton
                    size="large"
                    aria-label="account of current user"
                    aria-controls="menu-appbar"
                    aria-haspopup="true"
                    onClick={handleOpenNavMenu}
                    color="inherit">
                    <MenuIcon />
                  </IconButton>
                  <Menu
                    id="menu-appbar"
                    anchorEl={anchorElNav}
                    anchorOrigin={{
                      vertical: "bottom",
                      horizontal: "left",
                    }}
                    keepMounted
                    transformOrigin={{
                      vertical: "top",
                      horizontal: "left",
                    }}
                    open={Boolean(anchorElNav)}
                    onClose={handleCloseNavMenu}
                    sx={{
                      display: { xs: "block", md: "none" },
                    }}>
                    {pages.map((page) => (
                      <MenuItem key={page} onClick={() => navAction(page)}>
                        <Typography textAlign="center">{page}</Typography>
                      </MenuItem>
                    ))}
                  </Menu>
                </Box>
              </>
            ) : null}
            <LocationOnOutlinedIcon sx={{ display: { xs: "flex", md: "none" }, mr: 1,color:"#F9B707"}} />
            <Typography
              variant="h5"
              noWrap
              component="a"
              href="/dashboard"
              sx={{
                mr: 2,
                display: { xs: "flex", md: "none" },
                flexGrow: 1,
                fontFamily: "monospace",
                fontWeight: 700,
                letterSpacing: ".3rem",
                color: "inherit",
                textDecoration: "none",
              }}>
              {logo}
            </Typography>

            {user ? (
              <>
                <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
                  {pages.map((page) => (
                    <Button
                      key={page}
                      onClick={() => navAction(page)}
                      sx={{ my: 2, color: "white", display: "block" }}>
                      {page}
                    </Button>
                  ))}
                </Box>
                <Box sx={{ flexGrow: 0 }}>
                  <Tooltip title="Open settings">
                    <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                      <Avatar alt={avatar ?? ""} src={userImg ?? ""} />
                    </IconButton>
                  </Tooltip>
                  <Menu
                    sx={{ mt: "45px" }}
                    id="menu-appbar"
                    anchorEl={anchorElUser}
                    anchorOrigin={{
                      vertical: "top",
                      horizontal: "right",
                    }}
                    keepMounted
                    transformOrigin={{
                      vertical: "top",
                      horizontal: "right",
                    }}
                    open={Boolean(anchorElUser)}
                    onClose={handleCloseUserMenu}>
                    {settings.map((setting) => (
                      <MenuItem
                        key={setting}
                        onClick={() => profileAction(setting)}>
                        <Typography textAlign="center">{setting}</Typography>
                      </MenuItem>
                    ))}
                  </Menu>
                </Box>
              </>
            ) : null}
          </Toolbar>
        </Container>
      </AppBar>
    </div>
  );
}
