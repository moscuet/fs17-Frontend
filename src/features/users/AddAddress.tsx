import React, { useState } from 'react';
import { Box, Typography } from '@mui/material';
import { useAppDispatch } from '../../app/hooks';
import { addressActions } from '../addresses/addressSlice';
import EditableView from '../../shared-components/EditableView';

interface AddressForm {
  street: string;
  house: string;
  city: string;
  zipCode: string;
  country: string;
  phoneNumber: string;
}

const AddAddress: React.FC = () => {
  const dispatch = useAppDispatch();
  const [addressFormData, setAddressFormData] = useState<AddressForm>({
    street: '',
    house: '',
    city: '',
    zipCode: '',
    country: '',
    phoneNumber: '',
  });

  const handleAddressInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
console.log(name,value)
    setAddressFormData({ ...addressFormData, [name]: value });
  };

  const handleSaveAddress = async () => {
    await dispatch(addressActions.createAddress(addressFormData));
    setAddressFormData({
      street: '',
      house: '',
      city: '',
      zipCode: '',
      country: '',
      phoneNumber: '',
    });
  };

  return (
    <Box>
      <Typography variant="h6" sx={{ mb: 2 }}>Add a New Address</Typography>
      <EditableView
        data={addressFormData}
        onChange={handleAddressInputChange}
        onSave={handleSaveAddress}
        editMode={true}
        fields={[
          { name: "street", label: "Street" },
          { name: "house", label: "House" },
          { name: "city", label: "City" },
          { name: "zipCode", label: "Zip Code" },
          { name: "country", label: "Country" },
          { name: "phoneNumber", label: "Phone Number" }
        ]}
        toggleEdit={() => {}}
      />
    </Box>
  );
};

export default AddAddress;
