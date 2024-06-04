import React, { useEffect, useState } from "react";
import { Box, Container, Typography, Paper } from "@mui/material";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { userActions } from "./userSlice";
import { addressActions } from "../addresses/addressSlice";
import EditableView from "../../shared-components/EditableView";
import theme from "../../theme/theme";
import AddAddress from "../addresses/AddAddress";
import { UserForm } from "./userDto";
import { AddressForms } from "./Interface";
import CircularImageBox from "./CircularImageBox";
import Order from "../orders/OrderList";
import { ordersActions } from "../orders/orderSlice";
import ProfileTab from "./ProfileTab";
import {
  userFormInitialValues,
  userTableFileds,
  userValidationSchema,
} from "./const/valueObject";
import {
  addressTableFileds,
  addressValidationSchema,
} from "../addresses/const/valueObject";
import { authActions } from "../auth/authSlice";
import { useNavigate } from "react-router-dom";

const UserProfile: React.FC = () => {
  const navigate = useNavigate();

  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.auth.user);
  const addresses = useAppSelector((state) => state.address.items);
  const error = useAppSelector(
    (state) => state.auth.error || state.address.error
  );

  const [tabIndex, setTabIndex] = useState(0);
  const [editMode, setEditMode] = useState(false);
  const [editAddressMode, setEditAddressMode] = useState<{
    [id: string]: boolean;
  }>({});
  const [formData, setFormData] = useState<UserForm>(userFormInitialValues);
  const [addressFormDatas, setAddressFormDatas] = useState<AddressForms>({});

  useEffect(() => {
    if (user) {
      setFormData({
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        phoneNumber: user.phoneNumber,
        dateOfBirth: user.dateOfBirth,
      });
    }
  }, [user]);

  useEffect(() => {
    if (addresses && addresses.length > 0) {
      const newAddressFormDatas: AddressForms = {};
      addresses.forEach((address) => {
        newAddressFormDatas[address.id] = {
          street: address.street,
          house: address.house,
          city: address.city,
          zipCode: address.zipCode,
          country: address.country,
          phoneNumber: address.phoneNumber,
        };
      });
      setAddressFormDatas(newAddressFormDatas);
    }
  }, [addresses]);

  useEffect(() => {
    if (user) {
      dispatch(ordersActions.fetchAll());
    }
  });

  const handleTabChange = (_event: React.SyntheticEvent, newValue: number) => {
    setTabIndex(newValue);
  };

  const handleEditToggle = () => {
    setEditMode(!editMode);
  };
  const handleUserInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target as HTMLInputElement | HTMLTextAreaElement;
    setFormData({ ...formData, [name]: value });
  };

  const handleSaveUser = () => {
    dispatch(userActions.updateCurrentUser(formData));
    setTimeout(() => dispatch(authActions.fetchUserByToken()), 100);
    handleEditToggle();
  };
  const handleCloseUserEdit = () => {
    setEditMode(false);
  };

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
    setTimeout(() =>
      dispatch(addressActions.fetchAddressByUserId(user?.id as string))
    );
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

  const handleDeleteUser = async () => {
    await dispatch(userActions.deleteUser());
    navigate("/");
  };

  if (error) return <Typography>Error: {error}</Typography>;
  if (!user) return <Typography>User not found!</Typography>;

  return (
    <Container maxWidth="xl">
      <Box mt={4} display="flex">
        <Box sx={{ ml: "60px" }}></Box>
        <Box
          sx={{
            width: "240px",
            borderRight: `2px solid ${theme.palette.divider}`,
            mr: 4,
            position: "fixed",
            height: "calc(100vh - 0px)",
            overflow: "auto",
            top: "100px",
            backgroundColor: theme.palette.background.paper,
          }}
        >
          <Box display={"flex"} justifyContent={"center"} mb={1}>
            <CircularImageBox imageUrl="default_avatar.webp" size={120} />
          </Box>
          <ProfileTab tabIndex={tabIndex} handleTabChange={handleTabChange} />
        </Box>
        <Box
          sx={{
            flexGrow: 1,
            ml: "280px",
            padding: "20px",
            maxWidth: "600px",
            backgroundColor: theme.palette.background.default,
            color: theme.palette.text.primary,
          }}
        >
          {tabIndex === 0 && (
            <EditableView
              data={formData}
              onChange={handleUserInputChange}
              onSave={handleSaveUser}
              editMode={editMode}
              fields={userTableFileds}
              validationSchema={userValidationSchema}
              toggleEdit={handleEditToggle}
              onClose={handleCloseUserEdit}
              onDelete={() => handleDeleteUser()}
            />
          )}

          {tabIndex === 1 && (
            <>
              { addresses.length<0 && <Typography>You have No Saved address</Typography>}
              {addresses.map((address) => (
                <Paper key={address.id} sx={{ p: 2, mb: 2 }}>
                  <EditableView
                    data={addressFormDatas[address.id]}
                    onChange={(e) => handleAddressInputChange(e, address.id)}
                    onSave={() => handleSaveAddress(address.id)}
                    onClose={() => handleCloseAddressEdit(address.id)}
                    onDelete={() => handleDeleteAddress(address.id)}
                    editMode={editAddressMode[address.id]}
                    fields={addressTableFileds}
                    validationSchema={addressValidationSchema}
                    toggleEdit={() => handleEditAddressMode(address.id, true)}
                    dataType="address"
                  />
                </Paper>
              ))}
            </>
          )}
          {tabIndex === 2 && <AddAddress />}
          {tabIndex === 3 && <Order />}
        </Box>
      </Box>
    </Container>
  );
};

export default UserProfile;
