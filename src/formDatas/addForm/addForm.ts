import { IForm } from "../../sharedComponents/form/formInteface";

export const addFormData: IForm[] = [
  {
    variant: "select",
    type: "string",
    name: "category",
    title: "Kategoria",
    initialValue: {
      name:"cal",
      title:"kali"
    },
    options: [
      {
        name: "cali",
        title: "kali",
      },
      {
        name: "football",
        title: "Piłka nożna",
      },
      {
        name: "basketball",
        title: "Koszykówka",
      },
    ],
  },
  {
    variant: "imgFile",
    type: "string[]",
    name: "placeImages",
    title: "Zdjęcia obiektu",
    initialValue: [],
  },
  {
    variant: "longInput",
    type: "string",
    name: "description",
    title: "Opis",
    initialValue: "",
  },
];
