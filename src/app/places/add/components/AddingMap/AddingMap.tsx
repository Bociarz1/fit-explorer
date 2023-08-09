"use client";
import { Icon, LatLng, LeafletMouseEvent } from "leaflet";
import { useEffect, useRef, useState } from "react";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import {
  MapContainer,
  TileLayer,
  Tooltip,
  useMapEvents,
  Marker,
  Popup,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { Button, Card, Theme, Typography, makeStyles } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import styles from "./style.module.css";
import MuiDialog from "../Dialog/FormDialog";

import autoAddress, { Address } from "@/services/place/autoAdress/autoAdress";

import { addProposalPlace } from "@/services/placeProposal/PlaceService";
import { checkUndefinedFields } from "@/functions/checkUndefinedFields/checkUndefinedFields";
import { Place } from "@/services/place/placeInterface";
import { dataConverter } from "@/formDatas/addForm/dataConverter/dataConverter";
import { addFormData } from "@/formDatas/addForm/addForm";
import Form from "@/sharedComponents/form/Form";

function AddingMap() {
  // Dialog

  const [displayDialog, setDisplayDialog] = useState<boolean>(false);
  const [valid, setValid] = useState<boolean>(false);

  function closeDialog() {
    setDisplayDialog(false);
  }

  const [formData, setFormData] = useState<any>();

  // Upload File before patch data to db
  let sendImgsToDb: () => Promise<void> = () => new Promise(resolve => {
     resolve()
  })
  function uploadImageOutputSecond(Childfunc: () => Promise<void>) {
    sendImgsToDb = Childfunc;
  }

  const [uploadFilesFlag,setUploadFilesFlag] = useState<boolean>(false)

  const dialogProps = {
    displayDialog: displayDialog,
    closeDialog: closeDialog,
    mainTitle: "Formularz dodania",
    descriptionText: "Wyślij do weryfikacji adminom",
    buttonAcceptTitle: "Wyślij",
    buttonCancelTitle: "Anuluj",
    valid: valid,
    handleSubmitBtn: () => {

      // Check for File Inut in Form
      let containFileInut: boolean = false;
      addFormData.forEach((item) => {
        item.variant === "imgFile" ? (containFileInut = true) : null;
      });

      if (containFileInut) {

        setUploadFilesFlag(true)
        sendImgsToDb().then(() => {
          const data = { ...formData, ...clickedPosition, ...address };
          const convertedData: Place = dataConverter(data);
          addProposalPlace(convertedData);
        })
        return;
      }

      const data = { ...formData, ...clickedPosition, ...address };
      const convertedData: Place = dataConverter(data);
      addProposalPlace(convertedData);
    },
  };

  const customIcon = new Icon({
    iconUrl: markerIcon.src,
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    tooltipAnchor: [16, -28],
  });

  // Form

  function dispatchFormData(data: any, isValid: boolean) {
    setFormData(data);
    setValid(isValid);
  }

  // Map

  const mapRef = useRef<typeof MapContainer>(null);

  const [clickedPosition, setClickedPosition] = useState<{
    lat: number;
    lng: number;
  }>({ lat: 0, lng: 0 });

  const handleButtonClick = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    event.stopPropagation();
    setDisplayDialog(true);
  };

  const handleMapClick = (event: LeafletMouseEvent) => {
    const { lat, lng } = event.latlng;
    setClickedPosition({ lat, lng });
  };

  const MapClickHandler = () => {
    useMapEvents({
      click: handleMapClick,
    });

    return null;
  };

  const [address, setAddress] = useState<Address | null>(null);

  function AutoAddress({ lat, lng }: { lat: number; lng: number }) {
    useEffect(() => {
      autoAddress(lat, lng)
        .then((result) => {
          if ("errorMessage" in result) {
            console.error(result.errorMessage);
          } else {
            setAddress(result);
          }
        })
        .catch((error) => {
          console.error(error);
        });
    }, [lat, lng]);

    if (!address) {
      return <p>Loading...</p>; // Return null or any other fallback component when address is not defined
    }

    return (
      <Typography gutterBottom variant="subtitle2">
        {`${address.street} ${address.nr}, ${address.postCode} ${address.city}, ${address.country}`}
      </Typography>
    );
  }
  return (
    <>
      <MapContainer
        center={[51.505, -0.09]}
        zoom={13}
        style={{ height: "80vh", maxWidth: "100%", zIndex: 1 }}
        whenReady={() => {
          if (mapRef.current) {
          }
        }}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {clickedPosition && (
          <Marker
            key={123}
            icon={customIcon}
            position={clickedPosition}
            draggable={false}
            opacity={1}>
            <Tooltip className={styles.tooltip} permanent>
              <Button
                variant="contained"
                startIcon={<AddIcon />}
                onClick={handleButtonClick}>
                Dodaj
              </Button>
            </Tooltip>
          </Marker>
        )}
        <MapClickHandler />
      </MapContainer>
      <MuiDialog {...dialogProps}>
        <AutoAddress lat={clickedPosition.lat} lng={clickedPosition.lng} />
        <Form
          data={addFormData}
          dispatchData={dispatchFormData}
          uploadFilesFlag={uploadFilesFlag}
          uploadImageOutputSecond={uploadImageOutputSecond}
        />
      </MuiDialog>
    </>
  );
}

export default AddingMap;
