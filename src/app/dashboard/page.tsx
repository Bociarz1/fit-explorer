"use client";
import { withProtected } from "@/hooks/routes";
import { Button, Card, Container, Grid } from "@mui/material";
import Map from "./components/map/Map";
import SelectInput from "../sharedComponents/inputs/selectInput/SelectInput";
import SlectMultipleInput from "../sharedComponents/inputs/selectMultipleInput/SlectMultipleInput";
import Link from "next/link";
import AddLocationAltIcon from "@mui/icons-material/AddLocationAlt";
import { useEffect, useRef, useState } from "react";
import { getPlaces } from "@/services/place/PlaceService";
import { Place } from "@/services/place/placeInterface";
import autoAdress from "../../services/place/autoAdress/autoAdress";
import Form from "../sharedComponents/form/Form";
import { IForm } from "../sharedComponents/form/formInteface";
import { FormikProps } from "formik";

function Dashboard() {
  const [places, setPlaces] = useState<Place[]>([]);
  useEffect(() => {
    const fetchData = async () => {
      setPlaces(await getPlaces());
    };
    fetchData();
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
