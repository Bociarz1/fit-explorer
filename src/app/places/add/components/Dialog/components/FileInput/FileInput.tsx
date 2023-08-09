import { Uploader } from "uploader";
import { UploadButton } from "react-uploader";
import { Button, TextField } from "@mui/material";
import DriveFolderUploadIcon from "@mui/icons-material/DriveFolderUpload";
import { useEffect, useState } from "react";
import { db } from "../../../../../../../../firebase/clientApp";
import { storage } from "../../../../../../../../firebase/clientApp";
import { ref, uploadBytes, listAll, getDownloadURL } from "firebase/storage";
import { v4 as uuidv4 } from "uuid";

function FileInput({
  dispatchImgs,
  item,
  uploadImageOutput,
  uploadFilesFlag,
}: {
  dispatchImgs: (imgs: string[], names: string) => Promise<void>;
  item: {
    variant: string;
    type: string;
    name: string;
    title: string;
  };
  uploadImageOutput: (func: () => Promise<void>) => void;
  uploadFilesFlag: boolean;
}) {
  useEffect(() => {
    
      uploadImageOutput(uploadImage);
    
  });

  const [imageUpload, setImageUpload] = useState<FileList | null>(null);
  const [imageList, setImageList] = useState<string[]>([]);
  const imageListRef = ref(storage, "");
  // useEffect(() => {
  //   listAll(imageListRef).then((res) => {
  //     res.items.forEach((item) => {
  //       getDownloadURL(item).then((url) => {
  //         setImageList((prev) => [...prev, url]);
  //       });
  //     });
  //   });
  // }, []);

  function onChangeHandler(event: any) {
    setImageUpload(event.target.files);
    if (Array.from(event.target.files).length > 0) {
      dispatchImgs(["valid"], item.name);
    }
  }

  function uploadImage(): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      if (!imageUpload || imageUpload.length === 0) {
        alert("No images selected");
        return;
      }

      const uploadPromises: any = [];

      Array.from(imageUpload).forEach((file) => {
        const imageRef = ref(storage, `images/${uuidv4()}`);
        const uploadPromise = uploadBytes(imageRef, file)
          .then((snapshot) => getDownloadURL(snapshot.ref))
          .catch(() => null); // If an upload fails, resolve with null URL
        uploadPromises.push(uploadPromise);
      });

      Promise.all(uploadPromises)
        .then((urls) => {
          const validUrls = urls.filter((url) => url !== null);
          dispatchImgs(validUrls, item.name).then(() => {
            alert("Images uploaded successfully");
            resolve();
          });
        })
        .catch(() => {
          alert("Some uploads failed");
          reject();
        });
    });
  }

  return (
    <div
      id="fileInputContainer"
      style={{ paddingTop: "12px", paddingBottom: "12px" }}>
      <TextField
        onChange={(event: any) => onChangeHandler(event)}
        type="file"
        inputProps={{
          multiple: true,
        }}
      />
    </div>
  );
}

export default FileInput;
