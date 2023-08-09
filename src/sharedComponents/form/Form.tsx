import { Button, TextField } from "@mui/material";
import { ErrorMessage, useFormik } from "formik";
import { Place } from "@/services/place/placeInterface";
import { useEffect } from "react";
import * as Yup from "yup";
import { IForm } from "./formInteface";
import { divIcon } from "leaflet";
import FileInput from "@/app/places/add/components/Dialog/components/FileInput/FileInput";
import * as yup from "yup";
import SelectInput from "../inputs/selectInput/SelectInput";

function Form({
  data,
  dispatchData,
  uploadFilesFlag,
  uploadImageOutputSecond
}: {
  data: IForm[];
  dispatchData: (data: any, isValid: boolean) => void;
  uploadFilesFlag: boolean;
  uploadImageOutputSecond: (func: () => Promise<void>) => void
}) {
  function isValid(object: any): boolean {
    for (let key in object) {
      if (object[key] === "" || object[key].length < 1) return false;
    }
    return true;
  }

  // Pushing data to parent component
  function uploadImageOutput(Childfunc: () => Promise<void>) {
    uploadImageOutputSecond(Childfunc)
  }

  function whichType(type: string) {
    switch (type) {
      case "string":
        return "";
        break;
      case "number":
        return 0;
        break;
      case "boolean":
        return true;
        break;
      case "string[]":
        return [];
        break;
      default:
    }
  }

  function generateHTMLElement(item: IForm) {
    switch (item.variant) {
      case "select":
        return (
          <SelectInput
            label={item.title}
            formik={formik}
            name={item.name}
            value={item.initialValue}
            options={item.options}
          />
        );
        break;

      case "input":
        return (
          <TextField
            margin="dense"
            id={item.name}
            label={item.title}
            type={item.type === "string" ? "text" : "number"}
            fullWidth
            variant="outlined"
            value={formik.values[item.name]}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={
              formik.touched[item.name] &&
              Boolean(formik.errors[item.name]?.toString())
            }
            helperText={
              formik.touched[item.name] && formik.errors[item.name]?.toString()
            }
          />
        );
        break;
      case "longInput":
        return (
          <TextField
            multiline
            rows={4}
            margin="dense"
            id={item.name}
            label={item.title}
            type={item.type === "string" ? "text" : "number"}
            fullWidth
            variant="outlined"
            value={formik.values[item.name]}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={
              formik.touched[item.name] &&
              Boolean(formik.errors[item.name]?.toString())
            }
            helperText={
              formik.touched[item.name] && formik.errors[item.name]?.toString()
            }
          />
        );
        break;
      case "imgFile":
        return <FileInput dispatchImgs={dispatchImgs} item={item} uploadFilesFlag={uploadFilesFlag} uploadImageOutput={uploadImageOutput}/>;
        break;
      default:
    }
  }

  const initialValues: any = {};
  for (let key of data) {
    initialValues[key.name] = key.initialValue;
  }

  const validationSchema: any = {};
  for (let key of data) {
    validationSchema[key.name] = yup.string().required("Required");
  }

  function dispatchImgs(imgs: string[], name: string): Promise<void> {
    return new Promise((resolve,reject)=> {
      formik.values[name] = imgs
      resolve()
    })
  }

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: yup.object(validationSchema),
    onSubmit: (values) => {},
  });

  useEffect(() => {
    dispatchData(formik.values, isValid(formik.values));
  }, [formik.values]);

  return (
    <form onSubmit={formik.handleSubmit}>
      {data.map((element) => generateHTMLElement(element))}
    </form>
  );
}

export default Form;
