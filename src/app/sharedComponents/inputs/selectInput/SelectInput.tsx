import { useState } from "react";
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
  options?: {
    name:string
    title:string
  }[]
  
}) {

  const [val, setVal] = useState<string>(options && options[0].name || '');
  formik.values[name] = val
  const [inputValue, setInputValue] = useState<string>(options && options[0].name || '');

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
        options={options?.map(item => item.title) || []}
        renderInput={(params) => <TextField {...params} label={label} />}
      />
    </div>
  );
}
