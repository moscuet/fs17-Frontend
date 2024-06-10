import React from "react";
import {
  Box,
  FormControl,
  InputLabel,
  Select,
  Button,
  MenuItem,
  TextField,
  IconButton
} from "@mui/material";
import { useFormik } from "formik";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import { productValidationSchema } from "../const/valueObjects";
import { ProductUpdateDto, ProductReadDto } from "../productDto";
import { productsActions } from "../productsSlice";
import { useNavigate } from "react-router-dom";

interface EditProductProps {
  product: ProductReadDto;
}

const EditProduct: React.FC<EditProductProps> = ({ product }) => {

    
  const dispatch = useAppDispatch();
  const navigate  = useNavigate();

  const productLines = useAppSelector((state) => state.productLines.items);
  const colors = useAppSelector((state) => state.colors.items);
  const sizes = useAppSelector((state) => state.sizes.items);
  const selectedproductLine = productLines.find(pl =>pl.id ===product.id)

 console.log('product',product)
console.log('product.productLineId',product.productLineId)
console.log('selectedproductLine',selectedproductLine)
console.log('selectedproductLine',productLines)


  const formik = useFormik<ProductUpdateDto>({
    initialValues: {
      productLineId: product.productLineId,
      productSizeId: product.productSizeId,
      productColorId: product.productColorId,
      inventory: product.inventory,
      imageUrls: product.images.map((img) => img.url),
    },
    validationSchema: productValidationSchema,
    onSubmit: (values) => {
      dispatch(
        productsActions.updateProduct({ id: product.id, updateDto: values })
      );
      setTimeout( ()=> {
        dispatch(productsActions.fetchAllWithQuery({}))
        navigate(`/products/${product.id}`)
    },100)
    },
  });


  const handleAddImageUrl = () => {
    const newImageUrls = [...formik.values.imageUrls, ""];
    formik.setFieldValue("imageUrls", newImageUrls);
  };

  const handleRemoveImageUrl = (index: number) => {
    const newImageUrls = formik.values.imageUrls.filter(
      (_, idx) => idx !== index
    );
    formik.setFieldValue("imageUrls", newImageUrls);
  };

  return (
    <form onSubmit={formik.handleSubmit}>
      <FormControl fullWidth margin="normal">
        <InputLabel id="product-line-label">Product Line</InputLabel>
        <Select
          labelId="product-line-label"
          id="productLineId"
          name="productLineId"
          label="Product Line"
          value={formik.values.productLineId}
          onChange={formik.handleChange}
        >
          {productLines.map((line) => (
            <MenuItem key={line.id} value={line.id}>
              {line.id.slice(0, 8)} - {line.title}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <FormControl fullWidth margin="normal">
        <InputLabel id="size-label">Size</InputLabel>
        <Select
          labelId="size-label"
          id="productSizeId"
          name="productSizeId"
          value={formik.values.productSizeId}
          onChange={formik.handleChange}
          label="Size"
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
          label="Color"
          value={formik.values.productColorId}
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
      />

      {formik.values.imageUrls.map((url, index) => (
        <Box key={index} display="flex" alignItems="center">
          <TextField
            fullWidth
            margin="normal"
            variant="outlined"
            label="Image URL"
            value={url}
            onChange={(e) => formik.setFieldValue(`imageUrls[${index}]`, e.target.value)}
          />
          {formik.values.imageUrls.length > 1 && (
            <IconButton onClick={() => handleRemoveImageUrl(index)} color="error">
              <RemoveCircleOutlineIcon />
            </IconButton>
          )}
        </Box>
      ))}
      <Button onClick={handleAddImageUrl} startIcon={<AddCircleOutlineIcon />}>
        Add Image URL
      </Button>

      <Button color="primary" variant="contained" type="submit" sx={{ mt: 2 }}>
        Save
      </Button>
    </form>
  );
};

export default EditProduct;
