"use client";
import React from "react";
import { Fade } from "react-slideshow-image";
import "react-slideshow-image/dist/styles.css";
import styles from "./styles.module.css";
import path from "path";
import MainHeaders from "./mainHeaders/MainHeader";

export default function ImgSlider() {
  const type = "Fade"
  const images = [
    {
      src:"image1.jpg",
      header:"Znajdź idealne miejsce do treningu",
      subHeader:"Odkryj różnorodne lokalizacje i wybierz idealne miejsce do ćwiczeń"
    },
    {
      src:"image2.jpg",
      header:"Dodaj nowe miejsce aktywności fizycznej",
      subHeader:"Podziel się swoją ulubioną lokalizacją i pomóż innym znaleźć doskonałe miejsce do ćwiczeń"
    },
    {
      src:"image3.jpg",
      header:"Aktualizuj istniejące miejsce treningowe",
      subHeader:"Dostosuj informacje o miejscu treningowym, aby zapewnić aktualne i dokładne dane dla innych użytkowników"
    },
  ];

  const windowHeight = window.innerHeight;
  const calculatedHeight = windowHeight - 69.97;
  const properties = {
    prevArrow: <></>,
    nextArrow: <></>
}

  return (
    <div style={{ height: "500px", width: "100vw" }}>
      <Fade {...properties} duration={5000}>
        {images.map((image, index) => (
          <div key={index}>
            <div className="each-slide-effect">
              <div
                style={{
                  backgroundImage:`url(${image.src})`,
                  backgroundSize: "cover",
                  backgroundPosition:"center"
                  
                }}
                className={styles.slideImage}
                >
                <MainHeaders header={image.header} subHeader={image.subHeader}/>
              </div>
            </div>
          </div>
        ))}
      </Fade>
    </div>
  );
}
