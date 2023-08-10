import * as React from 'react';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import Image from 'next/image'

export default function StandardImageList({images}:{images:string[]}) {
  return (
    <ImageList cols={3} sx={{maxHeight:"30vh", padding: "5px"}}>
      {images.map((url) => (
        <>
          <ImageListItem key={url}>
            {/* eslint-disable-next-line */}
          <img 
            src={url}
            alt="image"
            loading="lazy"
          />
        </ImageListItem>
        </>
      ))}
    </ImageList>
  );
}