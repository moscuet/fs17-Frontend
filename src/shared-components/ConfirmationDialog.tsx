import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import { CancelButton, DeleteButton } from "./CustomButton";

interface ConfirmationDialogProps {
  open: boolean;
  title: string;
  children: React.ReactNode;
  onConfirm: () => void;
  onCancel: () => void;
  actionType?: string;
}

const ConfirmationDialog: React.FC<ConfirmationDialogProps> = ({
  open,
  title,
  children,
  onConfirm,
  onCancel,
  actionType,
}) => {
  return (
    <Dialog
      open={open}
      onClose={onCancel}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle
        id="alert-dialog-title"
        sx={{
          color: actionType === "delete" ? "#ff0000" : "inherit",
        }}
      >
        {title}
      </DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          {children}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <CancelButton onClick={onCancel} text="Cancel" size="small" />
        <DeleteButton onClick={onConfirm} text={"Confirm"} />
      </DialogActions>
    </Dialog>
  );
};

export default ConfirmationDialog;
