import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { addressActions } from "../addresses/addressSlice";
import EditableView from "../../shared-components/EditableView";
import { Paper, Typography } from "@mui/material";
import {
  addressTableFileds,
  addressValidationSchema,
} from "../addresses/const/valueObject";
import { AddressForms } from "./Interface";

const UserAddressesSetting: React.FC = () => {
  const dispatch = useAppDispatch();
  const addresses = useAppSelector((state) => state.address.items);
  const user = useAppSelector((state) => state.auth.user);

  const error = useAppSelector(
    (state) => state.auth.error || state.address.error
  );

  const [editAddressMode, setEditAddressMode] = useState<{
    [id: string]: boolean;
  }>({});
  const [addressFormDatas, setAddressFormDatas] = useState<AddressForms>({});

  useEffect(() => {
    if (addresses && addresses.length > 0) {
      const newAddressFormDatas: AddressForms = {};
      addresses.forEach((address) => {
        newAddressFormDatas[address.id] = {
          street: address.street || "",
          house: address.house || "",
          city: address.city || "",
          zipCode: address.zipCode || "",
          country: address.country || "",
          phoneNumber: address.phoneNumber || "",
        };
      });
      setAddressFormDatas(newAddressFormDatas);
    }
  }, [addresses]);

  const handleEditAddressMode = (id: string, mode: boolean) => {
    setEditAddressMode({ ...editAddressMode, [id]: mode });
  };

  const handleSaveAddress = async (id: string) => {
    await dispatch(
      addressActions.updateAddress({
        id,
        updateDto: addressFormDatas[id],
      })
    );
    setEditAddressMode({ ...editAddressMode, [id]: false });
  };

  const handleCloseAddressEdit = (id: string) => {
    setEditAddressMode({ ...editAddressMode, [id]: false });
  };

  const handleAddressInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    id: string
  ) => {
    const { name, value } = e.target;
    setAddressFormDatas({
      ...addressFormDatas,
      [id]: { ...addressFormDatas[id], [name]: value },
    });
  };

  const handleDeleteAddress = async (id: string) => {
    await dispatch(addressActions.deleteAddress(id));
    setTimeout(() =>
        dispatch(addressActions.fetchAddressByUserId(user?.id as string))
      );
  };

  if (error) return <Typography>Error: {error}</Typography>;
  if (!addresses || addresses.length === 0)
    return <Typography>No addresses found!</Typography>;

  return (
    <>
      {addresses.length === 0 && (
        <Typography>You have no saved address</Typography>
      )}
      {addresses.map((address) => (
        <Paper key={address.id} sx={{ p: 2, mb: 2 }}>
          <EditableView
            data={addressFormDatas[address.id] || {}}
            onChange={(e) => handleAddressInputChange(e, address.id)}
            onSave={() => handleSaveAddress(address.id)}
            onClose={() => handleCloseAddressEdit(address.id)}
            onDelete={() => handleDeleteAddress(address.id)}
            editMode={editAddressMode[address.id] || false}
            fields={addressTableFileds}
            validationSchema={addressValidationSchema}
            toggleEdit={() => handleEditAddressMode(address.id, true)}
            dataType="address"
          />
        </Paper>
      ))}
    </>
  );
};

export default UserAddressesSetting;
