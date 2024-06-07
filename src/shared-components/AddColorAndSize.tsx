import React from "react";
import { Box, Typography, TextField, Button } from "@mui/material";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useAppDispatch, useAppSelector } from "../app/hooks";

interface AddItemProps {
  itemName: string;
  onSubmit: (payload: { value: string }) => any;
}
type ValidKeys = "colors" | "sizes";

const AddItem: React.FC<AddItemProps> = ({ itemName, onSubmit }) => {
  const stateName = `${itemName.toLowerCase()}s` as ValidKeys;

  const dispatch = useAppDispatch();
  const items = useAppSelector((state) => state[stateName].items);

  const formik = useFormik({
    initialValues: {
      value: "",
    },
    validationSchema: Yup.object({
      value: Yup.string()
        .required(`${itemName} name is required`)
        .test(
          "unique-item",
          `This ${itemName.toLowerCase()} already exists`,
          (value) =>
            !items.some(
              (item: { value: string }) =>
                item.value.toLowerCase() === value?.toLowerCase()
            )
        ),
    }),
    onSubmit: (values) => {
      const payload = {
        value: values.value,
      };
      dispatch(onSubmit(payload));
      formik.resetForm();
    },
  });

  return (
    <Box>
      <Typography variant="h6" sx={{ mb: 2 }}>
        Add a New {itemName}
      </Typography>

      <form onSubmit={formik.handleSubmit}>
        <TextField
          fullWidth
          margin="normal"
          id="value"
          name="value"
          label={`${itemName} Name`}
          value={formik.values.value}
          onChange={formik.handleChange}
          error={formik.touched.value && Boolean(formik.errors.value)}
          helperText={formik.touched.value && formik.errors.value}
        />

        <Button
          color="primary"
          variant="contained"
          type="submit"
          sx={{ mt: 2 }}
        >
          Save {itemName}
        </Button>
      </form>
    </Box>
  );
};

export default AddItem;
