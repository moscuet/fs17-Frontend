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
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { CategoryReadDto, CategoryUpdateDto } from "./categoryDto";
import { categoriesActions } from "./categoriesSlice";
import { categoryValidationSchema } from "./AddCategory";

const Editcategory: React.FC = () => {
  const dispatch = useAppDispatch();
  const categories = useAppSelector((state) => state.categories.items);
  const [editMode, setEditMode] = useState<string | null>(null);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);

  const formik = useFormik<CategoryUpdateDto>({
    initialValues: {
      name: "",
      parentCategoryId: "",
      imageUrl: "",
    },
    validationSchema: categoryValidationSchema,
    onSubmit: (values) => {
      const payload = {
        name: values.name,
        ...(values.parentCategoryId && {
          parentCategoryId: values.parentCategoryId,
        }),
        imageUrl: values.imageUrl || "default_avatar.webp", 
      };

      if (editMode) {
        dispatch(
          categoriesActions.updateOne({ id: editMode, updateDto: payload  })
        );
        dispatch(categoriesActions.fetchAll());
        setEditMode(null);
      }
    },
  });

  const handleEdit = (category: CategoryReadDto) => {
    formik.setValues({
      name: category.name,
      parentCategoryId: category.parentCategoryId || "",
      imageUrl: category.imageUrl,
    });
    setEditMode(category.id);
  };

  const handleDelete = (categoryId: string) => {
    setOpenDeleteDialog(true);
    setEditMode(categoryId);
  };

  const handleConfirmDelete = async () => {
    if (editMode) {
      await dispatch(categoriesActions.deleteOne(editMode));
      setOpenDeleteDialog(false);
      setEditMode(null);
    }
  };

  const handleCancel = () => {
    setOpenDeleteDialog(false);
  };


  return (
    <Box>
      {categories.map((category) => (
        <Box
          key={category.id}
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
          {editMode === category.id ? (
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
          ) : (
            <>
              <Typography>
                {`${category.id.slice(0, 8)} - ${category.name}`}
              </Typography>
              <Box>
                <IconButton
                  onClick={() => handleEdit(category)}
                  color="secondary"
                >
                  <EditIcon />
                </IconButton>
                <IconButton
                  onClick={() => handleDelete(category.id)}
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
            Are you sure you want to delete this category? This action cannot be
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

export default Editcategory;
