import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import { red } from "@mui/material/colors";

interface Props {
  open: boolean;
  taskID: number;
  onCancelClick?: () => void;
  onDeleteClick?: () => void;
}

const DeleteGrabTaskDialog = ({
  open,
  taskID,
  onCancelClick,
  onDeleteClick,
}: Props) => {
  const handleCancelClick = () => onCancelClick && onCancelClick();
  const handleDeleteClick = () => onDeleteClick && onDeleteClick();

  return (
    <Dialog
      open={open}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">
        Do you really want to delete grab task {taskID}?
      </DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          This operation can NOT be undone
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleCancelClick}>Cancel</Button>
        <Button autoFocus sx={{ color: red }} onClick={handleDeleteClick}>
          Delete
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DeleteGrabTaskDialog;
