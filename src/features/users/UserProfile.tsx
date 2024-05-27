import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import {
  Typography,
  Box,
  Container,
  Avatar,
  Tabs,
  Tab,
  TextField,
  Button,
  Paper,
  styled,
} from "@mui/material";
import { fetchCurrentUser, userActions } from "./userSlice";
import {
  fetchAddressByUserId,
  addressActions,
} from "../addresses/addressSlice";

const CustomTabs = styled(Tabs)(({ theme }) => ({
  marginBottom: theme.spacing(),
}));

const CustomTab = styled(Tab)(({ theme }) => ({
  minHeight: "36px",
  padding: theme.spacing(0, 4),
  marginRight: theme.spacing(3),
}));

interface AddressForm {
  street: string;
  house: string;
  city: string;
  zipCode: string;
  country: string;
  phoneNumber: string;
}

interface AddressForms {
  [key: string]: AddressForm;
}

interface UserForm {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  dateOfBirth: string;
}

const UserProfile = () => {
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
  const [editAddressMode, setEditAddressMode] = useState<{ [id: string]: boolean }>({});
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

  const handleTabChange = (_event: React.ChangeEvent<{}>, newValue: number) => {
    setTabIndex(newValue);
  };

  const handleEditToggle = () => {
    setEditMode(!editMode);
  };

  const handleUserInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleAddressInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, id: string) => {
    const { name, value } = e.target;
    setAddressFormDatas({
      ...addressFormDatas,
      [id]: { ...addressFormDatas[id], [name]: value },
    });
};

  const handleSaveUser = () => {
    dispatch(userActions.updateCurrentUser(formData));
 setTimeout(  ()=>  dispatch(userActions.fetchCurrentUser()),100);
    handleEditToggle();
  };

  const handleSaveAddress = async (id:string) => {
    await dispatch(
      addressActions.updateAddress({
        id,
        updateDto: addressFormDatas[id],
      })
    );
    setEditAddressMode({ ...editAddressMode, [id]: false });
    dispatch(fetchAddressByUserId(user?.id as string)); 
};


  const handleEditAddressMode = (id: string, mode: boolean) => {
    setEditAddressMode({ ...editAddressMode, [id]: mode });
  };

  const handleAddNewAddress = () => {
    const newId = "new"; // Placeholder; ideally generate a unique ID
    setAddressFormDatas({
      ...addressFormDatas,
      [newId]: {
        street: "",
        house: "",
        city: "",
        zipCode: "",
        country: "",
        phoneNumber: "",
      },
    });
    setEditAddressMode({ ...editAddressMode, [newId]: true });
  };

  if (loading) return <Typography>Loading...</Typography>;
  if (error) return <Typography>Error: {error}</Typography>;
  if (!user) return <Typography>User not found!</Typography>;

  return (
    <Container maxWidth="md">
      <Box mt={4} display="flex">
        <Box mr={4}>
          <Avatar
            src={user.avatar}
            alt={`${user.firstName} ${user.lastName}`}
            sx={{ width: 100, height: 100 }}
          />
        </Box>
        <Box flexGrow={1}>
          <CustomTabs
            value={tabIndex}
            onChange={handleTabChange}
            aria-label="profile tabs"
            indicatorColor="primary"
            textColor="primary"
            centered
          >
            <CustomTab label="Account" />
            <CustomTab label="Address" />
          </CustomTabs>
          {tabIndex === 0 && (
            <Box mt={2}>
              {editMode ? (
                <Box>
                  <TextField
                    label="First Name"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleUserInputChange}
                    fullWidth
                    margin="normal"
                  />
                  <TextField
                    label="Last Name"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleUserInputChange}
                    fullWidth
                    margin="normal"
                  />
                  <TextField
                    label="Email"
                    name="email"
                    value={formData.email}
                    onChange={handleUserInputChange}
                    fullWidth
                    margin="normal"
                  />
                  <TextField
                    label="Phone Number"
                    name="phoneNumber"
                    value={formData.phoneNumber}
                    onChange={handleUserInputChange}
                    fullWidth
                    margin="normal"
                  />
                  <TextField
                    label="Date of Birth"
                    name="dateOfBirth"
                    value={formData.dateOfBirth}
                    onChange={handleUserInputChange}
                    fullWidth
                    margin="normal"
                  />
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={handleSaveUser}
                    sx={{ mt: 2 }}
                  >
                    Save
                  </Button>
                </Box>
              ) : (
                <Box>
                  <Typography variant="h5">
                    {user.firstName} {user.lastName}
                  </Typography>
                  <Typography variant="subtitle1">{user.email}</Typography>
                  <Typography variant="subtitle1">{user.phoneNumber}</Typography>
                  <Typography variant="subtitle1">
                    {new Date(user.dateOfBirth).toLocaleDateString()}
                  </Typography>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={handleEditToggle}
                    sx={{ mt: 2 }}
                  >
                    Edit
                  </Button>
                </Box>
              )}
            </Box>
          )}
         

          {tabIndex === 1 && (
            <Box mt={2}>
              {addresses.length === 0 ? (
                <Typography>No address saved yet</Typography>
              ) : (
                addresses.map((address) => (
                  <Paper key={address.id} sx={{ p: 2, mb: 2 }}>
                    {editAddressMode[address.id] ? (
                      <Box>
                        <TextField
                          label="Street"
                          name="street"
                          value={addressFormDatas[address.id].street}
                          onChange={(e) => handleAddressInputChange(e, address.id)}
                          fullWidth
                          margin="normal"
                        />
                        <TextField
                          label="House"
                          name="house"
                          value={addressFormDatas[address.id].house}
                          onChange={(e) => handleAddressInputChange(e, address.id)}
                          fullWidth
                          margin="normal"
                        />
                        <TextField
                          label="City"
                          name="city"
                          value={addressFormDatas[address.id].city}
                          onChange={(e) => handleAddressInputChange(e, address.id)}
                          fullWidth
                          margin="normal"
                        />
                        <TextField
                          label="Zip Code"
                          name="zipCode"
                          value={addressFormDatas[address.id].zipCode}
                          onChange={(e) => handleAddressInputChange(e, address.id)}
                          fullWidth
                          margin="normal"
                        />
                        <TextField
                          label="Country"
                          name="country"
                          value={addressFormDatas[address.id].country}
                          onChange={(e) => handleAddressInputChange(e, address.id)}
                          fullWidth
                          margin="normal"
                        />
                        <Button
                          variant="contained"
                          color="primary"
                          onClick={() => handleSaveAddress(address.id)}
                          sx={{ mt: 2 }}
                        >
                          Save
                        </Button>
                      </Box>
                    ) : (
                      <Box>
                        <Typography variant="h6">
                          {address.street}, {address.house}
                        </Typography>
                        <Typography variant="subtitle1">{address.city}</Typography>
                        <Typography variant="subtitle1">
                          {address.zipCode}
                        </Typography>
                        <Typography variant="subtitle1">
                          {address.country}
                        </Typography>
                        <Button
                          variant="contained"
                          color="primary"
                          onClick={() => handleEditAddressMode(address.id, true)}
                          sx={{ mt: 2 }}
                        >
                          Edit
                        </Button>
                      </Box>
                    )}
                  </Paper>
                ))
              )}
              <Button
                variant="contained"
                color="primary"
                onClick={handleAddNewAddress}
                sx={{ mt: 2 }}
              >
                Add New Address
              </Button>
            </Box>
          )}
        </Box>
      </Box>
    </Container>
  );
};

export default UserProfile;
