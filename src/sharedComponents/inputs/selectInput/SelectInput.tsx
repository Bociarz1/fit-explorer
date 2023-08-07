import { useEffect, useState } from "react";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import { FormikConfig, FormikValues } from "formik";

export default function SelectInput({
  label,
  formik,
  name,
  value,
  options
}: {
  label: string;
  formik: any;
  name: string;
  value: any
  options?: any
  
}) {
  const [val, setVal] = useState<string>(
    value
    );
    const [inputValue, setInputValue] = useState<string>(
      options && options[0] && options[0].name ? options[0].name : ""
      );
      formik.values[name] = val
      
  return (
    
    <div style={{ paddingTop: "12px", paddingBottom:"12px"}}>
      <Autocomplete
        value={val}
        onChange={(event: any, newValue: string | null) => {
  if (newValue !== null) {
    setVal(newValue);
    formik.values[name] = newValue;
  }
}}
        onBlur={formik.handleBlur}
        inputValue={inputValue}
        onInputChange={(event, newInputValue) => {
          setInputValue(newInputValue);
        }}
        id={name}
        options={options}
        getOptionLabel={(option:any) => option.title ?? option}
        renderInput={(params) => <TextField {...params} label={label} />}
      />
    </div>
  );
}
