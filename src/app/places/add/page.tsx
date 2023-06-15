"use client";
import { Box, Card, CardContent, Container, Grid } from "@mui/material";
import AddingMap from "./components/AddingMap/AddingMap";

export default function AddPlace() {
  return (
    <Container maxWidth="lg" sx={{ marginTop: "5vh" }}>
      <AddingMap />
    </Container>
  );
}
