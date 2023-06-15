"use client";
import { Icon, LatLng, LeafletMouseEvent } from "leaflet";
import { useRef, useState } from "react";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import { MapContainer, TileLayer, Tooltip, useMapEvents, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { Button, Card, Theme, makeStyles } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import styles from "./style.module.css";
import MuiDialog from "../Dialog/Dialog";

function AddingMap() {
  function closeDialog() {
    setDisplayDialog(false)
  }

  const customIcon = new Icon({
    iconUrl: markerIcon.src,
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    tooltipAnchor: [16, -28],
  });

  const mapRef = useRef<typeof MapContainer>(null);

  const [displayDialog, setDisplayDialog] = useState<boolean>(false);
  const [clickedPosition, setClickedPosition] = useState<LatLng>();

  const handleMapClick = (event: LeafletMouseEvent) => {
    const { latlng } = event;
    setClickedPosition(latlng);
    
  };

  const MapClickHandler = () => {
    
    useMapEvents({
      click: handleMapClick,
    });

    return null;
  };

  const handleButtonClick = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    event.stopPropagation();
    setDisplayDialog(true)
    console.log(displayDialog,"AAA")
  };

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
          <Tooltip  className={styles.tooltip} permanent>
            <Button variant="contained" startIcon={<AddIcon />} onClick={handleButtonClick}>
              Dodaj
            </Button>
          </Tooltip>
        </Marker>
      )}
      <MapClickHandler />
    </MapContainer>
    <MuiDialog displayDialog={displayDialog} closeDialog={closeDialog} clickedPosition={clickedPosition}/>
    </>
  );
}

export default AddingMap;
