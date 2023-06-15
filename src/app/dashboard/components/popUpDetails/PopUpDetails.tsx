import * as React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { CardMedia } from "@mui/material";
import Link from "next/link";
import AssistantDirectionIcon from "@mui/icons-material/AssistantDirection";
import zIndex from "@mui/material/styles/zIndex";
import { Place } from "@/services/place/placeInterface";

function PopUpDetails({place}:{place:Place}) {
  return (
    <>
      <CardContent>
        <Typography variant="h5" component="div" sx={{ mb: 1.5 }}>
          {place.category}
        </Typography>

        <CardMedia
          component="img"
          height="194"
          image={place.imgsUrl[0]}
          alt="Place image"
        />
        <Typography variant="body2">
          ul.{place.adress.street} {place.adress.nr},<br/>
          15-820 Białystok
        </Typography>
      </CardContent>
      <CardActions >
      <Button variant="contained" startIcon={<AssistantDirectionIcon />}>
          Nawiguj
        </Button>
        <Link href={`/places/${place.id}`}>
          <Button size="small" sx={{ml:1}}>Szczegóły</Button>
        </Link>
        
      </CardActions>
    </>
  );
}

export default PopUpDetails;
