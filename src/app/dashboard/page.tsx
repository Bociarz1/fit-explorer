"use client";
import { withProtected } from "@/hooks/routes";
import { Button, Card, Container, Grid } from "@mui/material";
import Map from "./components/map/Map";

import Link from "next/link";
import AddLocationAltIcon from "@mui/icons-material/AddLocationAlt";
import { useEffect, useState } from "react";
import { getPlaces } from "@/services/place/place.service";
import { Place } from "@/services/place/placeInterface";
import SlectMultipleInput from "@/sharedComponents/inputs/selectMultipleInput/SlectMultipleInput";
import { getUsers } from "@/services/user/user.service";

function Dashboard() {
  const [places, setPlaces] = useState<Place[]>([]);
  useEffect(() => {
    const fetchData = async () => {
      setPlaces(await getPlaces());
    };
    fetchData();
  }, []);
  // test for users
  const [users, setUser] = useState<any[]>([]);
  useEffect(() => {
    const fetchData = async () => {
      setUser(await getUsers());
    };
    fetchData()
    console.log("USERS ARR?",users);
    
  }, []);

  return (
    <Container maxWidth="lg" sx={{ marginTop: "5vh" }}>
      <Grid container spacing={2}>
        <Grid item xs={12} md={3}>
          {/* <SelectInput label={"Wybierz województwo"} name="name" formik="formik" /> */}
        </Grid>
        <Grid item xs={12} md={3}>
          {/* <SelectInput label={"Wybierz miasto"} name="name" formik="formik" /> */}
        </Grid>
        <Grid item xs={12} md={3}>
          <SlectMultipleInput />
        </Grid>
        <Grid
          item
          xs={12}
          md={3}
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}>
          <Link href="/places/add">
            <Button
              variant="contained"
              startIcon={<AddLocationAltIcon />}></Button>
          </Link>
        </Grid>
        <Grid item xs={12}>
          <Map places={places} />
        </Grid>
      </Grid>
    </Container>
  );
}
export default withProtected(Dashboard);
