import { Box } from "@mui/material";
import ImageGallery from "react-image-gallery";
import "react-image-gallery/styles/css/image-gallery.css";
import "./styles.css"
import { useEffect, useState } from "react";

function ImgGallery({imgsUrl}:{imgsUrl:string[]}) {
  const images:{original:string,thumbnail:string}[] = []

  function convertImgUrlToDisplay(imgsUrl:string[]) {
    imgsUrl?.forEach((img:string) => {
      const item = {
        original: img,
        thumbnail: img,
      }
      images.push(item)
    })
  }

  useEffect(()=>{
    console.log("IMG",imgsUrl)
    convertImgUrlToDisplay(imgsUrl)
  },[imgsUrl])

  return (
    <div  >
      <ImageGallery items={images} />
    </div>

  )
}

export default ImgGallery;
