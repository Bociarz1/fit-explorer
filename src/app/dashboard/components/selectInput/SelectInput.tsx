import { useState } from "react";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import { FormikConfig, FormikValues } from "formik";

const options = ["Option 1", "Option 2"];

export default function SelectInput({
  label,
  formik,
  name,
  
}: {
  label: string;
  formik: any;
  name: string;
  
}) {
  const [value, setValue] = useState<string | null>(options[0]);
  const [inputValue, setInputValue] = useState("");

  return (
    
    <div style={{ padding: "12px" }}>
      <Autocomplete
        value={value}
        onChange={(event: any, newValue: string | null) => {
          setValue(newValue);
          formik.values[name] = value
        }}
        onBlur={formik.handleBlur}
        inputValue={inputValue}
        onInputChange={(event, newInputValue) => {
          setInputValue(newInputValue);
        }}
        id={name}
        options={options}
        renderInput={(params) => <TextField {...params} label={label} />}
      />
    </div>
  );
}
