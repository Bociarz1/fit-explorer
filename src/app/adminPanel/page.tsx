"use client";
import { withProtected } from "@/hooks/routes";
import { Button, Card, Container, Grid } from "@mui/material";

import Link from "next/link";
import AddLocationAltIcon from "@mui/icons-material/AddLocationAlt";
import { useEffect, useState } from "react";
import { getPlaces } from "@/services/place/PlaceService";
import { Place } from "@/services/place/placeInterface";
import SlectMultipleInput from "@/sharedComponents/inputs/selectMultipleInput/SlectMultipleInput";

function AdminPanel() {
  return (
    <Container maxWidth="lg" sx={{ marginTop: "5vh" }}>
      <Link href="/adminPanel/places">
        <Button
          variant="contained"
          startIcon={<AddLocationAltIcon />}
          content="All places"></Button>
      </Link>
    </Container>
  );
}
export default withProtected(AdminPanel);
