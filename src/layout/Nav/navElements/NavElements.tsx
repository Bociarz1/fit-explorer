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
          <Button
            key={page.name}
            onClick={() => navAction(page.name)}
            sx={{ my: 2, color: "white", display: "flex" }}
            startIcon={page.icon}>
            {page.title}
          </Button>
        ))}
      </Box>
    </>
  );
}

export default NavElements;
