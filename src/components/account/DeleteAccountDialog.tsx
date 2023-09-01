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
  accountID: number;
  onDeleteClick?: () => void;
}

const DeleteAccountDialog = ({ open, accountID, onDeleteClick }: Props) => {
  const handleDeleteClick = () => onDeleteClick && onDeleteClick();

  return (
    <Dialog
      open={open}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">
        Do you really want to delete account {accountID}?
      </DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          This operation can NOT be undone
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button>Cancel</Button>
        <Button autoFocus sx={{ color: red }} onClick={handleDeleteClick}>
          Delete
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DeleteAccountDialog;
