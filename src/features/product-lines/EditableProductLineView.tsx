import { useState } from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  IconButton,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import { useFormik } from "formik";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { productLinesActions } from "./productLinesSlice";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { ProductLineReadDto } from "./productLineDto";
import { productLineValidationSchema } from "./const/valueObject";

const EditableProductLineView = () => {
  const dispatch = useAppDispatch();
  const productLines = useAppSelector(state => state.productLines.items);
  const categories =  useAppSelector(state => state.categories.items);
  const [editMode, setEditMode] = useState<string | null>(null);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
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
      if (editMode) {
        dispatch(productLinesActions.updateOne({ id: editMode, updateDto: values }));
         setTimeout( ()=>dispatch(productLinesActions.fetchAllWithParams({limit:100})),100)
        setEditMode(null);
      }
      formik.resetForm();
    },
    enableReinitialize: true,
  });

  const handleEdit = (productLine:ProductLineReadDto) => {
    formik.setValues(productLine);
    setEditMode(productLine?.id);
  };

  const handleDelete = (productId:string) => {
    setOpenDeleteDialog(true);
    setEditMode(productId);
  };

  const handleConfirmDelete = async () => {
    if (editMode) {
      await dispatch(productLinesActions.deleteOne(editMode));
      await setTimeout( ()=>dispatch(productLinesActions.fetchAll()),100)
      setOpenDeleteDialog(false);
      setEditMode(null);
    }
  };

  const handleCancel = () => {
    setOpenDeleteDialog(false);
  };
  return (
    <Box>
      {productLines.map((productLine) => (
        <Box
          key={productLine.id}
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
          {editMode === productLine.id ? (
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
                  onChange={formik.handleChange}
                  label="Category"
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
                Save Changes
              </Button>
              <Button
                color="secondary"
                onClick={() => setEditMode(null)}
                sx={{ mt: 2 }}
              >
                Cancel
              </Button>
            </form>
          ) : (
            <>
              <Typography>
                {`${productLine.title} - $${productLine.price}`}
              </Typography>
              <Box>
                <IconButton onClick={() => handleEdit(productLine)} color="primary">
                  <EditIcon />
                </IconButton>
                <IconButton onClick={() => handleDelete(productLine.id)} color="error">
                  <DeleteIcon />
                </IconButton>
              </Box>
            </>
          )}
        </Box>
      ))}
  
      <Dialog open={openDeleteDialog} onClose={handleCancel}>
        <DialogTitle>Confirm Deletion</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete this product line? This action cannot be undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button color="secondary" onClick={handleCancel}>
            Cancel
          </Button>
          <Button onClick={handleConfirmDelete} color="error">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
  
};

export default EditableProductLineView;
