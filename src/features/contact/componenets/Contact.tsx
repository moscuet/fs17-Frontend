import { useState } from "react";
import {
  Container,
  Box,
  Typography,
  TextField,
  Button,
  Paper,
  CircularProgress,
} from "@mui/material";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";
import ConfirmationModal from "./ContactConfirmation";
import contactService from "../service/contactService";
import theme from "../../../theme/theme";

const validationSchema = Yup.object({
  name: Yup.string()
    .max(50, "Must be 50 characters or less")
    .required("Name is required"),
  email: Yup.string()
    .email("Invalid email address")
    .max(100, "Must be 100 characters or less")
    .required("Email is required"),
  mobile: Yup.string().min(8, "Message must have at least 7 characters"),
  message: Yup.string()
    .min(20, "Message must have at least 20 characters")
    .required("Message is required"),
});

const ContactForm = () => {
  const [modalOpen, setModalOpen] = useState(false);

  const initialValues = {
    name: "",
    email: "",
    mobile: "",
    message: "",
  };

  return (
    <Container maxWidth="sm">
      <Paper elevation={3} sx={{ padding: 4, marginTop: 6 }}>
        <Box sx={{ textAlign: "center", marginBottom: 3 }}>
          <Typography variant="h4" component="h1">
            Contact Us
          </Typography>
          <Typography variant="body1">
            Send us a message and we'll get back to you soon.
          </Typography>
        </Box>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={(values, { setSubmitting, resetForm }) => {
            setSubmitting(true);
            contactService
              .sendMessage(values)
              .then(() => {
                resetForm();
                setSubmitting(false);
                setModalOpen(true);
              })
              .catch((error) => {
                toast.error("Failed to send message. Please try again later.");
                setSubmitting(false);
              });
          }}
        >
          {({ isSubmitting }) => (
            <Form>
              <Box mb={2}>
                <Field
                  as={TextField}
                  fullWidth
                  label="Name"
                  name="name"
                  variant="outlined"
                  required
                  helperText={<ErrorMessage name="name" component="div" />}
                />
              </Box>
              <Box mb={2}>
                <Field
                  as={TextField}
                  fullWidth
                  label="Email"
                  name="email"
                  type="email"
                  variant="outlined"
                  required
                  helperText={<ErrorMessage name="email" component="div" />}
                />
              </Box>
              <Box mb={2}>
                <Field
                  as={TextField}
                  fullWidth
                  label="Mobile number"
                  name="mbile"
                  type="telephone"
                  variant="outlined"
                  required
                  helperText={<ErrorMessage name="mobile" component="div" />}
                />
              </Box>
              <Box mb={2}>
                <Field
                  as={TextField}
                  fullWidth
                  label="Message"
                  name="message"
                  variant="outlined"
                  multiline
                  rows={4}
                  required
                  helperText={<ErrorMessage name="message" component="div" />}
                />
              </Box>
              <Box sx={{ textAlign: "center", mt: 4 }}>
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  disabled={isSubmitting}
                  sx={{
                    padding: theme.spacing(1.5, 6),
                    textTransform: "none",
                    fontSize: theme.typography.button.fontSize,
                    borderRadius: theme.shape.borderRadius,
                    position: "relative",
                    display: "inline-flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  {isSubmitting ? (
                    <CircularProgress
                      size={24}
                      sx={{
                        color: "white",
                        position: "absolute",
                      }}
                    />
                  ) : (
                    "Sign Up"
                  )}
                </Button>
              </Box>
            </Form>
          )}
        </Formik>
      </Paper>
      <ConfirmationModal open={modalOpen} onClose={() => setModalOpen(false)} />
    </Container>
  );
};

export default ContactForm;
