import SelectInput from "@/app/sharedComponents/inputs/selectInput/SelectInput";
import { TextField } from "@mui/material";
import FileInput from "../FileInput/FileInput";
import { ErrorMessage, useFormik } from "formik";
import { Place } from "@/services/place/placeInterface";
import { useEffect } from "react";
import * as Yup from "yup";

function NewPlaceForm({
  dispatchNewPlaceForm,
}: {
  dispatchNewPlaceForm: (newPlae: Place) => void;
}) {
  const validationSchema = Yup.object({
    category: Yup.string().required("Category is required"),
    province: Yup.string().required("Province is required"),
    city: Yup.string().required("City is required"),
    address: Yup.object({
      street: Yup.string().required("Street is required"),
      nr: Yup.string().required("Number is required"),
    }),
    imgsUrl: Yup.array().required("Image URLs are required"),
    description: Yup.string().required("Description is required"),
  });

  const formik = useFormik({
    initialValues: {
      position: { lat: 0, lng: 0 },
      category: "",
      province: "",
      city: "",
      adress: {
        street: "",
        nr: "",
      },
      imgsUrl: [],
      rating: {
        stars: 0,
        voters: 0,
      },
      description: "",
    },
    validationSchema: { validationSchema },
    onSubmit: (values: Place) => {},
  });

  useEffect(() => {
    dispatchNewPlaceForm(formik.values);
  }, [formik.values]);

  function dispatchImgs(imgs: string[]) {
    formik.setFieldValue("imgsUrl", imgs);
  }

  return (
    <form onSubmit={formik.handleSubmit}>
      <SelectInput
        label=" Kategoria obiektu"
        formik={formik}
        name={formik.values.category}
        // value={formik.values.category}
      />

      <SelectInput
        label=" Województwo"
        formik={formik}
        name={formik.values.category}
        // value={formik.values.province}
      />
      <SelectInput
        label=" Miasto"
        formik={formik}
        name={formik.values.category}
        // value={formik.values.city}
      />
      <TextField
        margin="dense"
        id="adress.street"
        label="Ulica"
        type="text"
        fullWidth
        variant="outlined"
        value={formik.values.adress.street}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
      />

      <TextField
        margin="dense"
        id="adress.nr"
        label="numer"
        type="text"
        fullWidth
        variant="outlined"
        value={formik.values.adress.nr}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
      />
      <TextField
        multiline
        rows={4}
        margin="dense"
        id="description"
        label="Opis obiektu"
        type="text"
        fullWidth
        variant="outlined"
        value={formik.values.description}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
      />
      <FileInput dispatchImgs={dispatchImgs} />
    </form>
  );
}

export default NewPlaceForm;
