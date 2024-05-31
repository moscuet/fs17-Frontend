import React, { useState } from 'react';
import { Box, Typography, Modal } from '@mui/material';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
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

const initialState = {
  street: '',
  house: '',
  city: '',
  zipCode: '',
  country: '',
  phoneNumber: '',
};

interface AddAddressProps {
  isModal?: boolean;
  onClose?: () => void;
}

const AddAddress: React.FC<AddAddressProps> = ({ isModal,onClose }) => {
  const dispatch = useAppDispatch();
  const userId = useAppSelector((state) => state.auth.user?.id);
  const [addressFormData, setAddressFormData] = useState<AddressForm>(initialState);

  const handleAddressInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setAddressFormData({ ...addressFormData, [name]: value });
  };

  const handleSaveAddress = async () => {
    await dispatch(addressActions.createAddress(addressFormData));
    setAddressFormData(initialState);
    userId && dispatch(addressActions.fetchAddressByUserId(userId));
    onClose && onClose();
  };

  return (
    <>
      {isModal ? (
        <Modal open={true} >
          <Box sx={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: 400, bgcolor: 'background.paper', boxShadow: 24, p: 4 }}>
            <Typography variant="h6" align="center">You need add New Address to make order</Typography>
            <EditableView
              data={addressFormData}
              onChange={handleAddressInputChange}
              onSave={handleSaveAddress}
              editMode={true}
              onClose={onClose}
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
        </Modal>
      ) : (
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
      )}
    </>
  );
};

export default AddAddress;