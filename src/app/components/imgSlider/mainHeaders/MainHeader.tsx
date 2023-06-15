import { Typography } from "@mui/material";
import styles from "./styles.module.css"

export default function MainHeaders({
  header,
  subHeader,
}: {
  header: string;
  subHeader: string;
}) {
  return (
    <div className={styles.container}>
      <Typography
        variant="h4"
        component="a"
        sx={{
          fontFamily: "monospace",
          fontWeight: 700,
          letterSpacing: ".3rem",
          color: "inherit",
          textDecoration: "none",
        }}>
        {header}
      </Typography>
      <Typography
        variant="h6"
        component="a"
        sx={{
          fontFamily: "monospace",
          fontWeight: 700,
          letterSpacing: ".3rem",
          color: "inherit",
          textDecoration: "none",
        }}>
        {subHeader}
      </Typography>
    </div>
  );
}
