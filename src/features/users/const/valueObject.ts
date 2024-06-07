import * as Yup from 'yup';
  
  export const userValidationSchema = Yup.object({
    firstName: Yup.string().required("First Name is required").max(50, "First Name must be less than 50 characters"),
    lastName: Yup.string().required("Last Name is required").max(50, "Last Name must be less than 50 characters"),
    email: Yup.string().email("Invalid email format").required("Email is required"),
    phoneNumber: Yup.string().matches(/^\+?([0-9]{2})\)?([0-9]{10})$/, "Phone number must be a valid format"),
    dateOfBirth: Yup.date().required("Date of Birth is required").nullable(),
    avatart: Yup.string().url("Invalid URL").max(2048, "Must be 2048 characters or less"),
  });

  export const userTableFileds = [
    { name: "firstName", label: "First Name" },
    { name: "lastName", label: "Last Name" },
    { name: "email", label: "Email" },
    { name: "phoneNumber", label: "Phone Number" },
    { name: "dateOfBirth", label: "Date of Birth" },
    { name: "avatar", label: "Avatar Url" },

  ]

  export const userFormInitialValues = {
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    dateOfBirth: "",
    avatar:"",
  }