import React from "react";
import {
  Box,
  Typography,
  TextField,
  FormControl,
  InputLabel,
  Select,
  Button,
  MenuItem,
} from "@mui/material";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { categoriesActions } from "../categories/categoriesSlice";

// Validation Schema using Yup
export const categoryValidationSchema = (categories: { name: string }[]) => Yup.object({
  name: Yup.string()
    .required("Category name is required")
    .test(
      "unique-category",
      "This category already exists",
      (value) =>
        !categories.some(
          (category) => category.name.toLowerCase() === value?.toLowerCase()
        )
    ),
  imageUrl: Yup.string(),
});

const AddCategory = () => {
  const dispatch = useAppDispatch();
  const categories = useAppSelector((state) => state.categories.items);

  const formik = useFormik({
    initialValues: {
      name: "",
      parentCategoryId: "",
      imageUrl: "",
    },
    validationSchema: categoryValidationSchema(categories),
    onSubmit: (values) => {
      const payload = {
        name: values.name,
        ...(values.parentCategoryId && {
          parentCategoryId: values.parentCategoryId,
        }),
        imageUrl: values.imageUrl || "default_avatar.webp",
      };
      dispatch(categoriesActions.createOne(payload));
      formik.resetForm();
    },
  });

  return (
    <Box>
      <Typography variant="h6" sx={{ mb: 2 }}>
        Add a New Category
      </Typography>

      <form onSubmit={formik.handleSubmit}>
        <TextField
          fullWidth
          margin="normal"
          id="name"
          name="name"
          label="Category Name"
          value={formik.values.name}
          onChange={formik.handleChange}
          error={formik.touched.name && Boolean(formik.errors.name)}
          helperText={formik.touched.name && formik.errors.name}
        />

        <FormControl fullWidth margin="normal">
          <InputLabel id="parent-category-label">Parent Category</InputLabel>
          <Select
            labelId="parent-category-label"
            id="parentCategoryId"
            name="parentCategoryId"
            value={formik.values.parentCategoryId}
            label="Parent Category"
            onChange={formik.handleChange}
          >
            {categories.map((category) => (
              <MenuItem key={category.id} value={category.id}>
                {category.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <TextField
          fullWidth
          margin="normal"
          id="imageUrl"
          name="imageUrl"
          label="Image URL"
          value={formik.values.imageUrl}
          onChange={formik.handleChange}
          error={formik.touched.imageUrl && Boolean(formik.errors.imageUrl)}
          helperText={formik.touched.imageUrl && formik.errors.imageUrl}
        />

        <Button
          color="primary"
          variant="contained"
          type="submit"
          sx={{ mt: 2 }}
        >
          Save Category
        </Button>
      </form>
    </Box>
  );
};

export default AddCategory;
