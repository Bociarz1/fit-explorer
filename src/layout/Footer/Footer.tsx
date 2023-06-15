"use client"
import { Box, Container, Grid, Typography } from "@mui/material";
import styles from "./footer.module.css";

export default function Footer() {
  
  return (
    <div className={styles.container}>
          <Box
      sx={{
        width: "100%",
        backgroundColor: "#272727",
        padding: ".5rem",
      }}
    >
      <Container maxWidth="lg">
        <Grid container direction="column" alignItems="center">
          <Grid item xs={12}>
            <Typography color="272727" variant="h6">
              React Starter App
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography color="white" variant="subtitle2">
              {`${new Date().getFullYear()} | React | Material UI | React Router`}
            </Typography>
          </Grid>
        </Grid>
      </Container>
    </Box>
  </div>
  );
}
