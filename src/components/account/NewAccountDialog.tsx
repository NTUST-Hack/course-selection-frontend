import { useState } from "react";
import { Account } from "@/query/accounts";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import AccountSettings from "./AccountSettings";

interface Props {
  open: boolean;
  onCancelClick?: () => void;
  onSubmitClick?: (value: Account) => void;
}

const NewAccountDialog = ({ open, onCancelClick, onSubmitClick }: Props) => {
  const [accountSettings, setAccountSettings] = useState<Account>({
    account: "",
    secret: "",
    autoLogin: false,
  });

  const handleCancelClick = () => onCancelClick && onCancelClick();
  const handleSubmitClick = () =>
    onSubmitClick && onSubmitClick(accountSettings);

  return (
    <Dialog open={open}>
      <DialogTitle>Add New Account</DialogTitle>
      <DialogContent>
        <DialogContentText sx={{ mb: 2 }}>
          Input password or NTUST secret to login account, NTUST secret will be
          refreshed each time login successfully with password
        </DialogContentText>
        <AccountSettings
          value={accountSettings}
          onChange={(value) => setAccountSettings(value)}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleCancelClick}>Cancel</Button>
        <Button autoFocus onClick={handleSubmitClick}>
          Add
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default NewAccountDialog;
