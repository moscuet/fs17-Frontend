import { Box } from "@mui/system";
import TextFieldComponent from "./TextField";
import { Button, Typography } from "@mui/material";
import { useState } from "react";
import ConfirmationDialog from "./ConfirmationDialog";
import { CancelButton, SaveButton } from "./CustomButton";
import { AnyObjectSchema } from "yup";

interface Field {
  name: string;
  label: string;
}

interface EditableViewProps {
  data: { [key: string]: any };
  onChange: (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  onDelete?: () => void;
  onSave: () => void;
  onClose: () => void;
  editMode: boolean;
  fields: Field[];
  validationSchema: AnyObjectSchema; 
  toggleEdit: () => void;
}

const EditableView: React.FC<EditableViewProps> = ({
  data,
  onChange,
  onSave,
  onClose,
  onDelete,
  editMode,
  fields,
  toggleEdit,
}) => {
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);

  const handleDelete = () => {
    setOpenDeleteDialog(true);
  };

  const handleConfirmDelete = () => {
    onDelete && onDelete();
    setOpenDeleteDialog(false);
  };

  const handleCancelDelete = () => {
    setOpenDeleteDialog(false);
  };

  return editMode ? (
    <Box>
      {fields.map((field) => (
        <TextFieldComponent
          key={field.name}
          label={field.label}
          name={field.name}
          value={data[field.name]}
          onChange={onChange}
        />
      ))}
      <SaveButton onClick={onSave} text="Save" />
      <CancelButton onClick={onClose} text="Cancel" />
    </Box>
  ) : (
    <Box>
      {fields.map((field) => (
        <Typography key={field?.name} variant="subtitle1">
          {data[field?.name]}
        </Typography>
      ))}
      <Button
        variant="contained"
        color="secondary"
        onClick={toggleEdit}
        sx={{ mt: 2 }}
      >
        Edit
      </Button>
      <Button
        variant="contained"
        color="error"
        onClick={handleDelete}
        sx={{ mt: 2, ml: 2 }}
      >
        Delete
      </Button>

      <ConfirmationDialog
        open={openDeleteDialog}
        title="Confirm Delete"
        onConfirm={handleConfirmDelete}
        onCancel={handleCancelDelete}
      >
        Are you sure you want to delete this item? This action cannot be undone.
      </ConfirmationDialog>
    </Box>
  );
};

export default EditableView;
