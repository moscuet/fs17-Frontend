import React from 'react';
import { Box, Typography, Modal, TextField, Button } from '@mui/material';
import { useFormik, FormikHelpers } from 'formik';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { addressActions } from './addressSlice';
import { addressFormInitialValues, addressValidationSchema } from './const/valueObject';

interface AddressForm {
  street: string;
  house: string;
  city: string;
  zipCode: string;
  country: string;
  phoneNumber: string;
}

interface AddAddressProps {
  isModal?: boolean;
  onClose?: () => void;
}

const AddAddress: React.FC<AddAddressProps> = ({ isModal, onClose }) => {
  const dispatch = useAppDispatch();
  const userId = useAppSelector((state) => state.auth.user?.id);

  const formik = useFormik<AddressForm>({
    initialValues: addressFormInitialValues,
    validationSchema: addressValidationSchema,
    onSubmit: async (values: AddressForm, { resetForm }: FormikHelpers<AddressForm>) => {
      await dispatch(addressActions.createAddress(values));
      resetForm();
      if (userId) {
        dispatch(addressActions.fetchAddressByUserId(userId));
      }
      if (onClose) {
        onClose();
      }
    },
  });

  return (
    <>
      {isModal ? (
        <Modal open={true} onClose={onClose}>
          <Box
            sx={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              width: 400,
              bgcolor: 'background.paper',
              boxShadow: 24,
              p: 4,
            }}
          >
            <Typography variant="h6" align="center">
              You need to add a New Address to make an order
            </Typography>
            <form onSubmit={formik.handleSubmit}>
              {['street', 'house', 'city', 'zipCode', 'country', 'phoneNumber'].map((field) => (
                <TextField
                  key={field}
                  fullWidth
                  margin="normal"
                  id={field}
                  name={field}
                  label={field.charAt(0).toUpperCase() + field.slice(1)}
                  value={formik.values[field as keyof AddressForm]}
                  onChange={formik.handleChange}
                  error={formik.touched[field as keyof AddressForm] && Boolean(formik.errors[field as keyof AddressForm])}
                  helperText={formik.touched[field as keyof AddressForm] && formik.errors[field as keyof AddressForm]}
                />
              ))}
              <Box display="flex" justifyContent="space-between" mt={2}>
                <Button color="primary" variant="contained" type="submit">
                  Save
                </Button>
                <Button color="secondary" variant="outlined" onClick={onClose}>
                  Cancel
                </Button>
              </Box>
            </form>
          </Box>
        </Modal>
      ) : (
        <Box>
          <Typography variant="h6" sx={{ mb: 2 }}>
            Add a New Address
          </Typography>
          <form onSubmit={formik.handleSubmit}>
            {['street', 'house', 'city', 'zipCode', 'country', 'phoneNumber'].map((field) => (
              <TextField
                key={field}
                fullWidth
                margin="normal"
                id={field}
                name={field}
                label={field.charAt(0).toUpperCase() + field.slice(1)}
                value={formik.values[field as keyof AddressForm]}
                onChange={formik.handleChange}
                error={formik.touched[field as keyof AddressForm] && Boolean(formik.errors[field as keyof AddressForm])}
                helperText={formik.touched[field as keyof AddressForm] && formik.errors[field as keyof AddressForm]}
              />
            ))}
            <Button color="primary" variant="contained" type="submit" sx={{ mt: 2 }}>
              Save
            </Button>
          </form>
        </Box>
      )}
    </>
  );
};

export default AddAddress;
