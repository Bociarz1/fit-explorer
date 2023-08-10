"use client";
import { useEffect, useState } from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import {
  Box,
  Chip,
  Container,
  Grid,
  Rating,
  Stack,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import ImgGallery from "./components/ImgGallery/ImgGallery";
import AssistantDirectionIcon from "@mui/icons-material/AssistantDirection";
import EditLocationAltIcon from "@mui/icons-material/EditLocationAlt";
import { getPlaceById } from "@/services/place/place.service";
import { Place } from "@/services/place/placeInterface";

function MainTitle({ item }: { item: Place }) {
  console.log("MAIN TITLE", item);
  return (
    <>
      <Typography variant="h5" component="div" marginBottom={1}>
        {item.category}
      </Typography>
      <Stack
        direction="row"
        spacing={1}
        flexWrap={"wrap"}
        rowGap={"10px"}
        marginBottom={1}>
        <Chip label={item.province} />
        <Chip label={item.city} />
        <Chip label={item.category} />
      </Stack>
      <Rating name="read-only" value={item.rating.stars} readOnly />
      <br />
      <Stack direction="row" flexWrap={"wrap"} rowGap={"10px"}>
        <Button
          variant="contained"
          startIcon={<AssistantDirectionIcon />}
          sx={{ marginRight: "10px" }}>
          Nawiguj
        </Button>
        <Button startIcon={<EditLocationAltIcon />}>Edytuj obiekt</Button>
      </Stack>
    </>
  );
}

function Place({ params }: { params: { id: string } }) {
  const { id } = params;
  const theme = useTheme();
  const isXs = useMediaQuery(theme.breakpoints.only("xs"));
  const [item, setItem] = useState<Place>();

  useEffect(() => {
    const getData = async () => {
      const place = await getPlaceById(id);
      if (place === undefined) return;
      setItem(place);
    };
    getData();
  }, []);

  if (!item) {
    return <div>Loading...</div>; // Placeholder or loader while fetching data
  }

  return (
    <Container maxWidth="lg">
      <Grid container spacing={2} marginTop={3}>
        {isXs ? (
          <Grid item xs={12}>
            <MainTitle item={item} />
          </Grid>
        ) : null}
        <Grid item xs={12} sm={8}>
          <ImgGallery imgsUrl={item.imgsUrl} />
        </Grid>
        <Grid item xs={12} sm={4}>
          {!isXs ? (
            <div style={{ marginBottom: "20px" }}>
              <MainTitle item={item} />
            </div>
          ) : null}
          <Typography variant="body2" color="text.secondary">
            {item.description}
          </Typography>
        </Grid>
      </Grid>
    </Container>
  );
}

export default Place;
