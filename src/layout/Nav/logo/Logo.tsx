import { Typography } from "@mui/material";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";

function LogoWithTitle({logo}:{logo:string}) {
  return ( 
    <>
    <LocationOnOutlinedIcon
              sx={{
                display: { xs: "none", md: "flex" },
                mr: 1,
                color: "#F9B707",
              }}
            />
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
    </>
   );
}

export default LogoWithTitle;