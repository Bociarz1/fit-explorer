import {
  Box,
  Button,
  Collapse,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
  Typography,
} from "@mui/material";
import { User, UserCredential } from "firebase/auth";
import { useState } from "react";
import MenuIcon from "@mui/icons-material/Menu";
import { useRouter } from "next/navigation";
import { pages } from "../Nav";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import PopupState, { bindTrigger, bindMenu } from "material-ui-popup-state";
import React from "react";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";

function Hamburger({
  user,
  logo,
}: {
  user: User | null;
  logo: string;
}) {

  const router = useRouter();

  const navAction = (route: string) => {
    router.replace("/" + route);
  };

  // Anchor
  type Anchor = "top" | "left" | "bottom" | "right";

  const anchor = "left";

  const [state, setState] = React.useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });

  // Open nav
  const toggleDrawer =
    (anchor: Anchor, open: boolean) =>
    (event: React.KeyboardEvent | React.MouseEvent) => {
      if (
        event.type === "keydown" &&
        ((event as React.KeyboardEvent).key === "Tab" ||
          (event as React.KeyboardEvent).key === "Shift")
      ) {
        return;
      }

      setState({ ...state, [anchor]: open });
    };

  // list after hamburger click 
  const navList = (anchor: Anchor) => (
    <Box
      sx={{ width: anchor === "top" || anchor === "bottom" ? "auto" : 250 }}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}>
        <List>
        {pages.map(item => (

          // one list item
          <>
            <ListItem key={item.name} disablePadding>
              <ListItemButton>
                <ListItemIcon>
                  {<InboxIcon/>}
                </ListItemIcon>
                <ListItemText primary={item.name} />
              </ListItemButton>
            </ListItem>
                          <Collapse component="li" in={true} timeout="auto" unmountOnExit>
                          <List disablePadding>
                            {/* <ListItemLink sx={{ pl: 4 }} to="/inbox/important" /> */}
                          </List>
                        </Collapse>
                  </>
        ))}
          
      
        </List>
    </Box>
  );

  return (
    <>
      {user ? (
        <>
        {/* Hamburger icon */}
          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={toggleDrawer(anchor, true)}
              color="inherit">
              <MenuIcon />
            </IconButton>

              {/* Nav Elements */}
              
                <>
                  <React.Fragment key={anchor}>
                    <Drawer
                      anchor={anchor}
                      open={state[anchor]}
                      onClose={toggleDrawer(anchor, false)}>
                      {navList(anchor)}
                    </Drawer>
                  </React.Fragment>
                </>
             
          </Box>
        </>
      ) : null}

      {/* Logo with text */}
      <LocationOnOutlinedIcon
        sx={{
          display: { xs: "flex", md: "none" },
          mr: 1,
          color: "#F9B707",
        }}
      />
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
    </>
  );
}

export default Hamburger;
