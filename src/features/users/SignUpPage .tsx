import React, { useState } from "react";
import {
  Container,
  Box,
  Typography,
  TextField,
  Button,
  Paper,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import LoginModal from "../auth/LoginModal";
import { SignUpFormData } from "./userDto";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { userActions } from "./userSlice";
import { useNavigate } from "react-router-dom";

// Validation Schema
const validationSchema = Yup.object({
  firstName: Yup.string()
    .max(50, "Must be 50 characters or less")
    .required("First Name is required"),
  lastName: Yup.string()
    .max(50, "Must be 50 characters or less")
    .required("Last Name is required"),
  email: Yup.string()
    .email("Invalid email address")
    .max(100, "Must be 100 characters or less")
    .required("Email is required"),
  phoneNumber: Yup.string()
    .matches(
      /^\+[1-9]{1}[0-9]{7,15}$/,
      "Phone number must be in international format starting with '+' and 8 to 16 digit"
    )
    .max(20, "Must be 20 characters or less")
    .required("Phone Number is required"),
  dateOfBirth: Yup.date().required("Date of Birth is required"),
  avatar: Yup.string()
    .url("Invalid URL")
    .max(2048, "Must be 2048 characters or less"),
  password: Yup.string()
    .min(8, "Password must be at least 8 characters")
    .max(255, "Must be 255 characters or less")
    .required("Password is required"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password"), ""], "Passwords must match")
    .required("Confirm Password is required"),
});

const SignUpPage: React.FC = () => {
  const theme = useTheme();
  const [modalOpen, setModalOpen] = useState(false);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const isLoggedIn = !!useAppSelector((state) => state.auth.user?.id);

  const initialValues: SignUpFormData = {
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    avatar: "",
    dateOfBirth: "",
    password: "",
    confirmPassword: "",
  };

  const handleLoginModalOpen = () => {
    setModalOpen(true);
  };

  const handleLoginModalClose = () => {
    setModalOpen(false);
    navigate("/");
  };
if(isLoggedIn) {
  navigate("/");
}

  return (
    <Container maxWidth="sm">
      <Paper
        elevation={3}
        sx={{ padding: theme.spacing(4), marginTop: theme.spacing(6) }}
      >
        <Box sx={{ textAlign: "center", marginBottom: theme.spacing(3) }}>
          <Typography
            variant="h1"
            component="h1"
            sx={{ color: theme.palette.primary.dark }}
          >
            Sign Up
          </Typography>
          <Typography
            variant="body1"
            sx={{ color: theme.palette.text.secondary }}
          >
            Create your account
          </Typography>
        </Box>
        <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={(values, { setSubmitting, resetForm }) => {
        dispatch(userActions.signup(values))
          .unwrap()
          .then(() => {
            resetForm();
            setSubmitting(false);
            setModalOpen(true); 
          })
          .catch((error) => {
            setSubmitting(false);
          });
      }}
    >
          {({ isSubmitting }) => (
            <Form>
              <Box marginBottom={2}>
                <Field
                  as={TextField}
                  fullWidth
                  label="First Name"
                  name="firstName"
                  margin="normal"
                  variant="outlined"
                  required
                  helperText={<ErrorMessage name="firstName" />}
                />
              </Box>
              <Box marginBottom={2}>
                <Field
                  as={TextField}
                  fullWidth
                  label="Last Name"
                  name="lastName"
                  margin="normal"
                  variant="outlined"
                  required
                  helperText={<ErrorMessage name="lastName" />}
                />
              </Box>
              <Box marginBottom={2}>
                <Field
                  as={TextField}
                  fullWidth
                  label="Email"
                  name="email"
                  type="email"
                  margin="normal"
                  variant="outlined"
                  required
                  helperText={<ErrorMessage name="email" />}
                />
              </Box>
              <Box marginBottom={2}>
                <Field
                  as={TextField}
                  fullWidth
                  label="Phone Number"
                  name="phoneNumber"
                  margin="normal"
                  variant="outlined"
                  required
                  helperText={<ErrorMessage name="phoneNumber" />}
                />
              </Box>
              <Box marginBottom={2}>
                <Field
                  as={TextField}
                  fullWidth
                  label="Date of Birth"
                  name="dateOfBirth"
                  type="date"
                  margin="normal"
                  variant="outlined"
                  InputLabelProps={{ shrink: true }}
                  required
                  helperText={<ErrorMessage name="dateOfBirth" />}
                />
              </Box>
              <Box marginBottom={2}>
                <Field
                  as={TextField}
                  fullWidth
                  label="Avatar URL"
                  name="avatar"
                  margin="normal"
                  variant="outlined"
                  helperText={<ErrorMessage name="avatar" />}
                />
              </Box>
              <Box marginBottom={2}>
                <Field
                  as={TextField}
                  fullWidth
                  label="Password"
                  name="password"
                  type="password"
                  margin="normal"
                  variant="outlined"
                  required
                  helperText={<ErrorMessage name="password" />}
                />
              </Box>
              <Box marginBottom={2}>
                <Field
                  as={TextField}
                  fullWidth
                  label="Confirm Password"
                  name="confirmPassword"
                  type="password"
                  margin="normal"
                  variant="outlined"
                  required
                  helperText={<ErrorMessage name="confirmPassword" />}
                />
              </Box>
              <Box sx={{ textAlign: "center", marginTop: theme.spacing(4) }}>
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  sx={{
                    padding: theme.spacing(1.5, 6),
                    textTransform: "none",
                    fontSize: theme.typography.button.fontSize,
                    borderRadius: theme.shape.borderRadius,
                  }}
                >
                  Sign Up
                </Button>
              </Box>
            </Form>
          )}
        </Formik>
        <Box sx={{ textAlign: "center", marginTop: theme.spacing(2) }}>
          <Typography
            variant="body2"
            sx={{ color: theme.palette.text.secondary }}
          >
            Already have an account?{" "}
            <span
              onClick={handleLoginModalOpen}
              style={{
                color: theme.palette.primary.main,
                textDecoration: "none",
                cursor: "pointer",
              }}
            >
              Sign In
            </span>
          </Typography>
        </Box>
      </Paper>
      <LoginModal open={modalOpen} handleClose={handleLoginModalClose} title={"Login"} />
    </Container>
  );
};

export default SignUpPage;
