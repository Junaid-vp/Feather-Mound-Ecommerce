import * as Yup from "yup";

export const AddressValidation = Yup.object({
  name: Yup.string()
    .matches(/^[A-Za-z ]+$/, "Only alphabets are allowed")
    .required("Name is required"),

  number: Yup.string()
    .matches(/^[6-9]\d{9}$/, "Enter a valid 10-digit mobile number")
    .required("Phone number is required"),

  pinCode: Yup.string()
    .matches(/^[1-9][0-9]{5}$/, "Enter a valid 6-digit PIN code")
    .required("PIN Code is required"),

  locality: Yup.string().required("Locality is required"),

  address: Yup.string()
    .min(10, "Address must be at least 10 characters")
    .required("Address is required"),

  city: Yup.string().required("City is required"),

  state: Yup.string().required("State is required"),
});
