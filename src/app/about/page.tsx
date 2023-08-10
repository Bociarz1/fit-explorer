"use client"
import { withProtected } from "@/hooks/routes";
import { Container } from "@mui/material";

function About() {
  return (
    <Container maxWidth="sm" sx={{ marginTop: "5vh" }}>
      <h1>About section</h1>
    </Container>
  );
}
export default withProtected(About);
