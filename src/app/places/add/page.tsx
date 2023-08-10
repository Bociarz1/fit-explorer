"use client";
import { Box, Card, CardContent, Container, Grid } from "@mui/material";
import AddingMap from "./components/AddingMap/AddingMap";
import { withProtected } from "@/hooks/routes";

function AddPlace() {
  return (
    <Container maxWidth="lg" sx={{ marginTop: "5vh" }}>
      <AddingMap />
    </Container>
  );
}
export default withProtected(AddPlace);