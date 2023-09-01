import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Account, useCreateAccount, useDeleteAccount } from "@/query/accounts";
import { Box, Fab } from "@mui/material";
import { Add } from "@mui/icons-material";
import AccountsTable from "@/components/account/AccountsTable";
import MainLayout from "@/layouts/MainLayout";
import NewAccountDialog from "@/components/account/NewAccountDialog";
import DeleteAccountDialog from "@/components/account/DeleteAccountDialog";

const AccountsPage = () => {
  const navigate = useNavigate();

  const [newAccountDialogOpen, setNewAccountDialogOpen] = useState(false);
  const [delAccountDialogOpen, setDelAccountDialogOpen] = useState(false);
  const [delAccountID, setDelAccountID] = useState(0);

  const createAccount = useCreateAccount();
  const deleteAccount = useDeleteAccount();

  const handleAddAccount = (value: Account) => {
    createAccount.mutate(value, {
      onSuccess: () => setNewAccountDialogOpen(false),
    });
  };

  const handleDelAccount = () => {
    deleteAccount.mutate(delAccountID, {
      onSuccess: () => setDelAccountDialogOpen(false),
    });
  };

  const handleViewAccountClick = (id: number) => {
    navigate(`./${id}`);
  };

  const handleDelAccountClick = (id: number) => {
    setDelAccountDialogOpen(true);
    setDelAccountID(id);
  };

  return (
    <MainLayout title="Accounts">
      <AccountsTable
        onViewClick={handleViewAccountClick}
        onDeleteClick={handleDelAccountClick}
      />
      <Box sx={{ position: "fixed", bottom: "20px", right: "20px" }}>
        <Fab variant="extended" onClick={() => setNewAccountDialogOpen(true)}>
          <Add sx={{ mr: 1 }} />
          New Account
        </Fab>
      </Box>

      <NewAccountDialog
        open={newAccountDialogOpen}
        onCancelClick={() => setNewAccountDialogOpen(false)}
        onSubmitClick={handleAddAccount}
      />

      <DeleteAccountDialog
        open={delAccountDialogOpen}
        accountID={delAccountID}
        onDeleteClick={handleDelAccount}
      />
    </MainLayout>
  );
};

export default AccountsPage;
