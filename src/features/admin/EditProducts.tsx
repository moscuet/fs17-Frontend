import React, { useState } from "react";
import {
  Box,
  Typography,
  FormControl,
  InputLabel,
  Select,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton,
  MenuItem,
  TextField,
} from "@mui/material";
import { useFormik } from "formik";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { productsActions } from "../products/productsSlice";
import { ProductReadDto, ProductUpdateDto } from "../products/productDto";
import { productValidationSchema } from "../products/const/valueObjects";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

const EditProduct: React.FC = () => {
  const dispatch = useAppDispatch();
  const products = useAppSelector((state) => state.products.items);
  const productLines = useAppSelector((state) => state.productLines.items);
  const colors = useAppSelector((state) => state.colors.items);
  const sizes = useAppSelector((state) => state.sizes.items);
  const [editMode, setEditMode] = useState<string | null>(null);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);

  const formik = useFormik<ProductUpdateDto>({
    initialValues: {
      productLineId: "",
      productSizeId: undefined,
      productColorId: undefined,
      inventory: 0,
      imageUrls: [],
    },
    validationSchema: productValidationSchema,
    onSubmit: (values) => {
      if (editMode) {
        dispatch(
          productsActions.updateOne({ id: editMode, updateDto: values })
        );
        dispatch(productsActions.fetchAll());
        setEditMode(null);
      }
    },
  });

  const handleEdit = (product: ProductReadDto) => {
    formik.setValues({
      productLineId: product.productLineId,
      productSizeId: product.productSizeId,
      productColorId: product.productColorId,
      inventory: product.inventory,
      imageUrls: product.images.map((img) => img.url),
    });
    setEditMode(product.id);
  };

  const handleDelete = (productId: string) => {
    setOpenDeleteDialog(true);
    setEditMode(productId);
  };

  const handleConfirmDelete = async () => {
    if (editMode) {
      await dispatch(productsActions.deleteOne(editMode));
      setOpenDeleteDialog(false);
      setEditMode(null);
    }
  };

  const handleCancel = () => {
    setOpenDeleteDialog(false);
  };

  return (
    <Box>
      {products.map((product) => (
        <Box
          key={product.id}
          sx={{
            mb: 2,
            p: 2,
            border: "1px solid grey",
            borderRadius: "4px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          {editMode === product.id ? (
            <form onSubmit={formik.handleSubmit}>
              <FormControl fullWidth margin="normal">
                <InputLabel id="product-line-label">Product Line</InputLabel>
                <Select
                  labelId="product-line-label"
                  id="productLineId"
                  name="productLineId"
                  label="Product Line*"
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

              <Button
                color="primary"
                variant="contained"
                type="submit"
                sx={{ mt: 2 }}
              >
                Save
              </Button>
              <Button
                color="secondary"
                onClick={() => setEditMode(null)}
                sx={{ mt: 2, ml: 2 }}
              >
                Cancel
              </Button>
            </form>
          ) : (
            <>
              <Typography>
                {`${product.id.slice(0, 8)} - ${product.productLineName} - ${
                  product.productSizeValue
                } - ${product.productColorValue}`}
              </Typography>
              <Box>
                <IconButton
                  onClick={() => handleEdit(product)}
                  color="secondary"
                >
                  <EditIcon />
                </IconButton>
                <IconButton
                  onClick={() => handleDelete(product.id)}
                  color="error"
                >
                  <DeleteIcon />
                </IconButton>
              </Box>
            </>
          )}
        </Box>
      ))}

      <Dialog open={openDeleteDialog} onClose={handleCancel}>
        <DialogTitle>Confirm Delete</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete this product? This action cannot be
            undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCancel}>Cancel</Button>
          <Button onClick={handleConfirmDelete} color="error">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default EditProduct;
