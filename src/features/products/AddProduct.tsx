import React from "react";
import {
  Box,
  Typography,
  TextField,
  MenuItem,
  FormControl,
  InputLabel,
  Select,
  Button,
  IconButton,
  FormHelperText,
} from "@mui/material";
import { useFormik } from "formik";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { productsActions } from "./productsSlice";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";
import * as Yup from "yup";
import { productValidationSchema } from "./const/valueObjects";

interface ProductForm {
  productLineId: string;
  productSizeId?: string;
  productColorId?: string;
  inventory: number;
  imageUrls: string[];
}

const productFormInitialValues: ProductForm = {
  productLineId: "",
  productSizeId: "",
  productColorId: "",
  inventory: 0,
  imageUrls: [""],
};

const AddProduct: React.FC = () => {
  const dispatch = useAppDispatch();
  const sizes = useAppSelector((state) => state.sizes.items);
  const colors = useAppSelector((state) => state.colors.items);
  const productLines = useAppSelector((state) => state.productLines.items);

  const formik = useFormik<ProductForm>({
    initialValues: productFormInitialValues,
    validationSchema: productValidationSchema,
    onSubmit: (values, { resetForm }) => {
      const updatedValues = {
        productLineId: values.productLineId,
        inventory: values.inventory,
        imageUrls: values.imageUrls,
        ...(values.productSizeId !== "" && {
          productSizeId: values.productSizeId,
        }),
        ...(values.productColorId !== "" && {
          productColorId: values.productColorId,
        }),
      };
      dispatch(productsActions.createOne(updatedValues));
      resetForm();
    },
  });

  const handleImageUrlChange = (index: number, value: string) => {
    const newImageUrls = [...formik.values.imageUrls];
    newImageUrls[index] = value;
    formik.setFieldValue("imageUrls", newImageUrls);
  };

  const handleRemoveImageUrl = (index: number) => {
    if (formik.values.imageUrls.length > 1) {
      const newImageUrls = formik.values.imageUrls.filter(
        (_, idx) => idx !== index
      );
      formik.setFieldValue("imageUrls", newImageUrls);
    }
  };

  const handleAddImageUrl = () => {
    const newImageUrls = [...formik.values.imageUrls, ""];
    formik.setFieldValue("imageUrls", newImageUrls);
  };

  return (
    <Box>
      <Typography variant="h6" sx={{ mb: 2 }}>
        Add a New Product
      </Typography>

      <form onSubmit={formik.handleSubmit}>
        <FormControl
          fullWidth
          margin="normal"
          error={Boolean(
            formik.errors.productLineId && formik.touched.productLineId
          )}
        >
          <InputLabel id="product-line-label">Product Line *</InputLabel>
          <Select
            labelId="product-line-label"
            id="productLineId"
            name="productLineId"
            value={formik.values.productLineId}
            label="Product Line*"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          >
            {productLines.map((line) => (
              <MenuItem key={line.id} value={line.id}>
                {line.id.slice(0, 8)} - {line.title}
              </MenuItem>
            ))}
          </Select>
          <FormHelperText>
            {formik.touched.productLineId && formik.errors.productLineId}
          </FormHelperText>
        </FormControl>
        <FormControl fullWidth margin="normal">
          <InputLabel id="size-label">Size</InputLabel>
          <Select
            labelId="size-label"
            id="productSizeId"
            name="productSizeId"
            value={formik.values.productSizeId}
            label="Size"
            onChange={formik.handleChange}
          >
            {sizes.map((size) => (
              <MenuItem key={size.id} value={size.id}>
                {size.id.slice(0, 8)} - {size.value}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl fullWidth margin="normal">
          <InputLabel id="color-label">Color</InputLabel>
          <Select
            labelId="color-label"
            id="productColorId"
            name="productColorId"
            value={formik.values.productColorId}
            label="Color"
            onChange={formik.handleChange}
          >
            {colors.map((color) => (
              <MenuItem key={color.id} value={color.id}>
                {color.id.slice(0, 8)} - {color.value}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <TextField
          fullWidth
          margin="normal"
          id="inventory"
          name="inventory"
          type="number"
          label="Inventory"
          value={formik.values.inventory}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.inventory && Boolean(formik.errors.inventory)}
          helperText={formik.touched.inventory && formik.errors.inventory}
        />
        {formik.values.imageUrls.map((url, index) => (
          <Box key={index} display="flex" alignItems="center">
            <TextField
              fullWidth
              margin="normal"
              variant="outlined"
              label="Image URL"
              placeholder="default_product.webp"
              value={url}
              onChange={(e) =>
                formik.setFieldValue(`imageUrls[${index}]`, e.target.value)
              }
              onBlur={formik.handleBlur}
              error={
                formik.touched.imageUrls &&
                Boolean(formik.errors.imageUrls?.[index])
              }
              helperText={
                formik.touched.imageUrls && formik.errors.imageUrls?.[index]
              }
            />

            {formik.values.imageUrls.length > 1 && (
              <IconButton
                onClick={() => handleRemoveImageUrl(index)}
                color="error"
              >
                <RemoveCircleOutlineIcon />
              </IconButton>
            )}
          </Box>
        ))}
        <Button
          startIcon={<AddCircleOutlineIcon />}
          onClick={handleAddImageUrl}
          sx={{ mt: 2 }}
        >
          Add Image URL
        </Button>
        <Button
          color="primary"
          variant="contained"
          type="submit"
          sx={{ mt: 2 }}
        >
          Save Product
        </Button>
      </form>
    </Box>
  );
};

export default AddProduct;
