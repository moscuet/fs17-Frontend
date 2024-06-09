import React, { useState } from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton,
} from "@mui/material";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

type ValidKeys = "colors" | "sizes";

interface EditItemProps {
  itemName: ValidKeys;
  actions: {
    updateOne: (payload: { id: string; updateDto: { value: string } }) => any;
    deleteOne: (id: string) => any;
    fetchAll: () => any;
  };
  selectItems: (state: any) => { id: string; value: string }[];
}

const EditColorAndSize: React.FC<EditItemProps> = ({
  itemName,
  actions,
  selectItems,
}) => {
  const dispatch = useAppDispatch();
  const items = useAppSelector(selectItems);
  const [editMode, setEditMode] = useState<string | null>(null);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);

  const validationSchema = Yup.object({
    value: Yup.string()
      .required(`${itemName.slice(0, -1)} name is required`)
      .test(
        "unique-item",
        `This ${itemName.slice(0, -1)} already exists`,
        (value) =>
          !items.some(
            (item: { id: string; value: string }) =>
              item.value.toLowerCase() === value?.toLowerCase()
          )
      ),
  });

  const formik = useFormik({
    initialValues: {
      value: "",
    },
    validationSchema,
    onSubmit: (values) => {
      if (editMode) {
        dispatch(actions.updateOne({ id: editMode, updateDto: values }));
        setTimeout(() => dispatch(actions.fetchAll()), 100);
        setEditMode(null);
      }
    },
    enableReinitialize: true,
  });

  const handleEdit = (item: { id: string; value: string }) => {
    formik.setValues({ value: item.value });
    setEditMode(item.id);
  };

  const handleDelete = (itemId: string) => {
    setOpenDeleteDialog(true);
    setEditMode(itemId);
  };

  const handleConfirmDelete = async () => {
    if (editMode) {
      await dispatch(actions.deleteOne(editMode));
      setOpenDeleteDialog(false);
      setEditMode(null);
    }
  };

  const handleCancel = () => {
    setOpenDeleteDialog(false);
  };

  return (
    <Box>
      {items.map((item: { id: string; value: string }) => (
        <Box
          key={item.id}
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
          {editMode === item.id ? (
            <form onSubmit={formik.handleSubmit}>
              <TextField
                fullWidth
                margin="normal"
                id="value"
                name="value"
                label={`${itemName.slice(0, -1)} Name`}
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
                Save {itemName.slice(0, -1)}
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
                {`${item.id.slice(0, 8)} - ${item.value}`}
              </Typography>
              <Box>
                <IconButton onClick={() => handleEdit(item)} color="secondary">
                  <EditIcon />
                </IconButton>
                <IconButton onClick={() => handleDelete(item.id)} color="error">
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
            Are you sure you want to delete this {itemName.slice(0, -1)}? This
            action cannot be undone.
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

export default EditColorAndSize;
