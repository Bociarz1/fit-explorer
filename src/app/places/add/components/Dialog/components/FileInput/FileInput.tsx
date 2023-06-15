import { Uploader } from "uploader";
import { UploadButton } from "react-uploader";
import { Button } from "@mui/material";
import DriveFolderUploadIcon from "@mui/icons-material/DriveFolderUpload";
import { useState } from "react";
import { db } from "../../../../../../../../firebase/clientApp";

function FileInput({dispatchImgs}:{dispatchImgs:(imgs:string[])=>void}) {
  const selectedFiles: string[] = [];

  // Get production API keys from Upload.io
  const uploader = Uploader({
    apiKey: "free",
  });

  // Customize the file upload UI (see "customization"):
  const options = { multi: true };

  return (
    <UploadButton
      uploader={uploader} // Required.
      options={options} // Optional.
      onComplete={(files) => {
        // Optional.
        if (files.length === 0) {
          console.log("No files selected.");
        } else {
          console.log("Files uploaded:");
            files.map((f) => selectedFiles.push(f.fileUrl))
            dispatchImgs(selectedFiles)
        }
      }}>
      {({ onClick }) => (
        <Button
          onClick={onClick}
          variant="contained"
          startIcon={<DriveFolderUploadIcon />}>
          Upload a file...
        </Button>
      )}
    </UploadButton>
  );
}

export default FileInput;
