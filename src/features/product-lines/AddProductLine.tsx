import React from 'react';
import {
  Box, Typography, TextField, FormControl, InputLabel,
  Select, Button, MenuItem
} from '@mui/material';
import { useFormik } from 'formik';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { productLinesActions } from './productLinesSlice';
import { productLineValidationSchema } from './const/valueObject';

const AddProductLine = () => {
  const dispatch = useAppDispatch();
  const categories = useAppSelector(state => state.categories.items);

  const formik = useFormik({
    initialValues: {
      title: '',
      description: '',
      categoryId: '',
      price: 0,
      imageUrl: '',
    },
    validationSchema: productLineValidationSchema,
    onSubmit: (values) => {
      const payload = {
        ...values,
        imageUrl: values.imageUrl || 'default_product_image.webp',
      };
      dispatch(productLinesActions.createOne(payload));
      formik.resetForm();
    },
  });

  return (
    <Box>
      <Typography variant="h6" sx={{ mb: 2 }}>
        Add a New Product Line
      </Typography>

      <form onSubmit={formik.handleSubmit}>
        <TextField
          fullWidth
          margin="normal"
          id="title"
          name="title"
          label="Title"
          value={formik.values.title}
          onChange={formik.handleChange}
          error={formik.touched.title && Boolean(formik.errors.title)}
          helperText={formik.touched.title && formik.errors.title}
        />

        <TextField
          fullWidth
          margin="normal"
          id="description"
          name="description"
          label="Description"
          value={formik.values.description}
          onChange={formik.handleChange}
          error={formik.touched.description && Boolean(formik.errors.description)}
          helperText={formik.touched.description && formik.errors.description}
        />

        <FormControl fullWidth margin="normal">
          <InputLabel id="category-label">Category</InputLabel>
          <Select
            labelId="category-label"
            id="categoryId"
            name="categoryId"
            value={formik.values.categoryId}
            label="Category"
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
          id="price"
          name="price"
          label="Price"
          type="number"
          value={formik.values.price}
          onChange={formik.handleChange}
          error={formik.touched.price && Boolean(formik.errors.price)}
          helperText={formik.touched.price && formik.errors.price}
        />

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
          Save Product Line
        </Button>
      </form>
    </Box>
  );
};

export default AddProductLine;
