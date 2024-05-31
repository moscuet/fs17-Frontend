import React, { useEffect, useState } from "react";
import { Box, Container, Typography, Tabs, Tab, Paper } from "@mui/material";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { fetchCurrentUser, userActions } from "./userSlice";
import {
  fetchAddressByUserId,
  addressActions,
} from "../addresses/addressSlice";
import EditableView from "../../shared-components/EditableView";
import theme from "../../theme/theme";
import AddAddress from "./AddAddress";
import { UserForm } from "./userDto";
import { AddressForms } from "./Interface";
import { Title } from "@mui/icons-material";
import CircularImageBox from "./CircularImageBox";

const UserProfile: React.FC = () => {
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.user.data);
  const addresses = useAppSelector((state) => state.address.items);
  const loading = useAppSelector(
    (state) => state.user.loading || state.address.loading
  );
  const error = useAppSelector(
    (state) => state.user.error || state.address.error
  );

  const [tabIndex, setTabIndex] = useState(0);
  const [editMode, setEditMode] = useState(false);
  const [editAddressMode, setEditAddressMode] = useState<{
    [id: string]: boolean;
  }>({});
  const [formData, setFormData] = useState<UserForm>({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    dateOfBirth: "",
  });
  const [addressFormDatas, setAddressFormDatas] = useState<AddressForms>({});

  useEffect(() => {
    dispatch(fetchCurrentUser());
  }, [dispatch]);

  useEffect(() => {
    if (user?.id) {
      dispatch(fetchAddressByUserId(user.id));
    }
  }, [dispatch, user]);

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
    setTimeout(() => dispatch(userActions.fetchCurrentUser()), 100);
    handleEditToggle();
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
    dispatch(fetchAddressByUserId(user?.id as string));
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

  if (loading) return <Typography>Loading...</Typography>;
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
          <Tabs
            orientation="vertical"
            value={tabIndex}
            onChange={handleTabChange}
            aria-label="Profile categories"
            textColor="primary"
            indicatorColor="secondary"
            sx={{
              ".MuiTabs-indicator": {
                width: "4px",
              },
              ".MuiTab-root": {
                alignItems: "flex-start",
                transition: "0.3s",
                "&:hover": {
                  backgroundColor: theme.palette.primary.light,
                  color: theme.palette.secondary.contrastText,
                },
                "&.Mui-selected": {
                  backgroundColor: theme.palette.secondary.main,
                  color: theme.palette.secondary.contrastText,
                  fontWeight: "bold",
                },
              },
            }}
          >
            <Tab label="Account" />
            <Tab label="Address" />
            <Tab label="Add Address" />
            <Tab label="Order List" />
          </Tabs>
        </Box>
        <Box
          sx={{
            flexGrow: 1,
            ml: "280px",
            padding: "20px",
            maxWidth:"600px",
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
              fields={[
                { name: "firstName", label: "First Name" },
                { name: "lastName", label: "Last Name" },
                { name: "email", label: "Email" },
                { name: "phoneNumber", label: "Phone Number" },
                { name: "dateOfBirth", label: "Date of Birth" },
              ]}
              toggleEdit={handleEditToggle}
            />
          )}
          {tabIndex === 1 &&
            addresses.map((address) => (
              <Paper key={address.id} sx={{ p: 2, mb: 2 }}>
                <EditableView
                  data={addressFormDatas[address.id]}
                  onChange={(e) => handleAddressInputChange(e, address.id)}
                  onSave={() => handleSaveAddress(address.id)}
                  editMode={editAddressMode[address.id]}
                  fields={[
                    { name: "street", label: "Street" },
                    { name: "house", label: "House" },
                    { name: "city", label: "City" },
                    { name: "zipCode", label: "Zip Code" },
                    { name: "country", label: "Country" },
                  ]}
                  toggleEdit={() => handleEditAddressMode(address.id, true)}
                />
              </Paper>
            ))}
          {tabIndex === 2 && <AddAddress />}
          {tabIndex === 3 && (
            <Box>
              <Typography variant="h6" sx={{ mb: 2 }}>
                Order List
              </Typography>
              <Typography>No orders found.</Typography>
            </Box>
          )}
        </Box>
      </Box>
    </Container>
  );
};

export default UserProfile;
