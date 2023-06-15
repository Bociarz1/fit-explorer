"use client";

import "leaflet/dist/leaflet.css";
import PopUpDetails from "../popUpDetails/PopUpDetails";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import { Icon } from "leaflet";
import { Place } from "@/services/place/placeInterface";
import { MapContainer,TileLayer,Marker,Popup } from "react-leaflet";

export default function Map({places}:{places:Place[]}) {
  console.log("PLACES",places)
  const customIcon = new Icon({
    iconUrl: markerIcon.src,
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    tooltipAnchor: [16, -28],
  });

  return (
    <MapContainer
      center={[51.505, -0.09]}
      zoom={13}
      style={{ height: "80vh", maxWidth: "100%" }}>
   
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {places.map((item:any, index:number) => (
        <Marker key={index} position={item.position} icon={customIcon}>
          <Popup>
            <PopUpDetails place={item}/>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}
