import { Grid } from "@mui/material";
import PlaceItem from "./PlaceItem";
import { ProposalPlaceInterface } from "@/services/placeProposal/placeInterface";

function ListOfPlaces({arr}:{arr:ProposalPlaceInterface[]}) {
  return ( 
    <Grid container spacing={2}>
      {arr.map(item => (
        <Grid key={item.id} item xs={12}>
          <PlaceItem data={item}/>
        </Grid>
      ))}
    
  </Grid>
   );
}

export default ListOfPlaces;