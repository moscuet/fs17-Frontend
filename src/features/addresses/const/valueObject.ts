import * as Yup from 'yup';
export const addressTableFileds = [
    { name: "street", label: "Street" },
    { name: "house", label: "House" },
    { name: "city", label: "City" },
    { name: "zipCode", label: "Zip Code" },
    { name: "country", label: "Country" },
  ]


  export const addressValidationSchema = Yup.object({
      street: Yup.string().required('Street is required'),
      house: Yup.string().required('House is required'),
      city: Yup.string().required('City is required'),
      zipCode: Yup.string().required('Zip Code is required'),
      country: Yup.string().required('Country is required'),
      phoneNumber: Yup.string()
        .matches(/^\+[1-9]{1}[0-9]{7,15}$/, 'Phone number must be in international format starting with "+" and 8 to 16 digits')
        .required('Phone number is required'),
    });
  

    export const addressFormInitialValues= {
        street: '',
        house: '',
        city: '',
        zipCode: '',
        country: '',
        phoneNumber: '',
      }
