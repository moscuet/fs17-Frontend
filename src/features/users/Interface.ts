
  export interface AddressForm {
    street: string;
    house: string;
    city: string;
    zipCode: string;
    country: string;
    phoneNumber: string;
  }
  
  export interface AddressForms {
    [key: string]: AddressForm;
  }
  
  export interface UserForm {
    firstName: string;
    lastName: string;
    email: string;
    phoneNumber: string;
    dateOfBirth: string;
  }
  