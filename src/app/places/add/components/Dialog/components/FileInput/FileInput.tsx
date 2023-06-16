import { Uploader } from "uploader";
import { UploadButton } from "react-uploader";
import { Button } from "@mui/material";
import DriveFolderUploadIcon from "@mui/icons-material/DriveFolderUpload";
import { useEffect, useState } from "react";
import { db } from "../../../../../../../../firebase/clientApp";

function FileInput({dispatchImgs, item}:{dispatchImgs:(imgs:string[],names:string)=>void, item:{
  variant: string,
  type: string,
  name: string,
  title: string,
}}) {
  const selectedFiles: string[] = [];

  // Get production API keys from Upload.io
  const uploader = Uploader({
    apiKey: "free",
  });

  // Customize the file upload UI (see "customization"):
  const options = { multi: true };

  const [valid, setValid] = useState<boolean>(false)
  const divStyle: React.CSSProperties = {
    fontFamily: "Roboto, Helvetica, Arial, sans-serif",
    fontWeight: 400,
    fontSize: "0.75rem",
    lineHeight: 1.66,
    letterSpacing: "0.03333em",
    textAlign: "left",
    marginTop: "3px",
    marginRight: "14px",
    marginBottom: 0,
    marginLeft: "14px",
    color: valid ? 'black' : '#d32f2f'
  };
  

  return (
   <div id="fileInputContainer" style={{paddingTop:"12px",paddingBottom:"12px"}}>
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
            dispatchImgs(selectedFiles,item.name)
            setValid(true)
        }
      }}>
      {({ onClick }) => (
        <Button
          onClick={onClick}
          variant="contained"
          startIcon={<DriveFolderUploadIcon />}
          >
          
          Upload a {item.title}
        </Button>
      )}
    </UploadButton>
      {valid ? (<div style={{ ...divStyle }}>Uploaded</div>):(<div style={{ ...divStyle }}>Not uploaded</div>) }
   </div>
  );
}

export default FileInput;
