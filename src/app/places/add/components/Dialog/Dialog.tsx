import { useEffect, useState } from "react";
import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { addPlace } from "@/services/place/PlaceService";
import { Place } from "@/services/place/placeInterface";
import NewPlaceForm from "./components/NewPlaceForm/NewPlaceForm";
import { LatLng } from "leaflet";

function MuiDialog({displayDialog,closeDialog,clickedPosition}:{displayDialog: boolean,closeDialog:()=>void,clickedPosition:LatLng | undefined}) {

  useEffect(()=>{
    setOpen(displayDialog)
  },[displayDialog])

  const [open, setOpen] = useState<boolean>(false);
  const [newPlaceData,setNewPlaceData] = useState<Place>()

  function dispatchNewPlaceForm(newPlace:Place) {
    if(clickedPosition === undefined) return
    newPlace.position = {lat:clickedPosition.lat,lng:clickedPosition.lng}
    setNewPlaceData(newPlace)

  }

  const handleClose = () => {
    setOpen(false);
    closeDialog()
  };

  const Send = () => {
    newPlaceData ? addPlace(newPlaceData) : null
    handleClose()

  };

  return (
    <>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Formularz obiektu</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Wprowadź dane obiektu i wyślij do weryfikacji administratorom
          </DialogContentText>
          <NewPlaceForm dispatchNewPlaceForm={dispatchNewPlaceForm}/>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Anuluj</Button>
          <Button onClick={Send}>Wyślij</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default MuiDialog;
