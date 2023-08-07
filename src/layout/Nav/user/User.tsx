import useAuth from "@/hooks/auth";
import { Avatar, Box, IconButton, Menu, MenuItem, Tooltip, Typography } from "@mui/material";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { User } from "firebase/auth";

function User({user}:{user:User | null}) {
const settings = ["profile", "logout"];

  const { logout } = useAuth();
  const router = useRouter();
  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(
    null
  );
  const [avatar, setAvatar] = useState<string | null | undefined>("");
  const [userImg, setUserImg] = useState<string | null | undefined>("");

  useEffect(() => {
    if (user) {
      setAvatar(user.displayName);
      setUserImg(user.photoURL);
    }
  }, [user]);

  const profileAction = (route: string) => {
    handleCloseUserMenu();
    route === "profile" ? router.replace("/profile" + "/id") : logout();
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  return ( 
    <>
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
   );
}

export default User;