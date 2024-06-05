import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { userActions } from "./userSlice";
import EditableView from "../../shared-components/EditableView";
import { UserForm } from "./userDto";
import {
  userFormInitialValues,
  userTableFileds,
  userValidationSchema,
} from "./const/valueObject";
import { authActions } from "../auth/authSlice";
import { Typography } from "@mui/material";

const UserAccountSetting: React.FC = () => {
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.auth.user);
  const error = useAppSelector((state) => state.auth.error);
  
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState<UserForm>(userFormInitialValues);

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

  const handleDeleteUser = async () => {
    await dispatch(userActions.deleteUser());
  };

  if (error) return <Typography>Error: {error}</Typography>;
  if (!user) return <Typography>User not found!</Typography>;

  return (
    <EditableView
      data={formData}
      onChange={handleUserInputChange}
      onSave={handleSaveUser}
      editMode={editMode}
      fields={userTableFileds}
      validationSchema={userValidationSchema}
      toggleEdit={handleEditToggle}
      onClose={handleCloseUserEdit}
      onDelete={handleDeleteUser}
    />
  );
};

export default UserAccountSetting;
