import { Box, Button, Menu, MenuItem } from "@mui/material";
import { pages } from "../Nav";
import { useState } from "react";
import { useRouter } from "next/navigation";
import PopupState, { bindTrigger, bindMenu } from "material-ui-popup-state";

function NavElements() {
  const router = useRouter();

  const [anchorElNav, setAnchorElNav] = useState<null | HTMLElement>(null);

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const navAction = (route: string) => {
    handleCloseNavMenu();
    router.replace("/" + route);
  };
  return (
    <>
      <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
        {pages.map((page) => (
          page?.subPage === undefined ? 
          <Button
            key={page.name}
            onClick={() => navAction(page.name)}
            sx={{ my: 2, color: "white", display: "block" }}>
            {page.name}
          </Button>
          :
          <>
            <PopupState variant="popover" popupId="demo-popup-menu">
              {(popupState) => (
                <>
                  <Button
                    {...bindTrigger(popupState)}
                    sx={{ my: 2, color: "white", display: "block" }}>
                    {page.name}
                  </Button>
                  <Menu {...bindMenu(popupState)}>
                    {page.subPage.map(item => (
                      <>
                      <MenuItem onClick={popupState.close}>{item.name}</MenuItem>
                      </>
                    ))}

                  </Menu>
                </>
              )}
            </PopupState>
          </>
        ))}
      </Box>
    </>
  );
}

export default NavElements;
