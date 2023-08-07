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

function FormDialog({
  displayDialog,
  closeDialog,
  mainTitle,
  descriptionText,
  buttonAcceptTitle,
  buttonCancelTitle,
  handleSubmitBtn,
  valid,
  children,
}: {
  displayDialog: boolean;
  closeDialog: () => void;
  mainTitle: string;
  descriptionText: string;
  buttonAcceptTitle: string;
  buttonCancelTitle: string;
  handleSubmitBtn: () => void;
  valid: boolean;
  children: React.ReactNode;
}) {
  useEffect(() => {
    setOpen(displayDialog);
  }, [displayDialog]);

  const [open, setOpen] = useState<boolean>(false);

  const handleClose = () => {
    setOpen(false);
    closeDialog();
  };

  const Send = () => {
    handleSubmitBtn();
    handleClose();
  };

  return (
    <>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>{mainTitle}</DialogTitle>
        <DialogContent>
          <DialogContentText>{descriptionText}</DialogContentText>
          {children}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>{buttonCancelTitle}</Button>
          <Button onClick={Send} disabled={!valid}>
            {buttonAcceptTitle}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default FormDialog;
