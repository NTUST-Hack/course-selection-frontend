import { useState } from "react";
import { useQueryAccounts } from "@/query/accounts";
import {
  Box,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableFooter,
  TableHead,
  TablePagination,
  TableRow,
} from "@mui/material";
import { Check, Close, Delete, Visibility } from "@mui/icons-material";
import SecretHider from "./SecretHider";
import TablePaginationActions from "@mui/material/TablePagination/TablePaginationActions";

interface Props {
  onViewClick?: (id: number) => void;
  onDeleteClick?: (id: number) => void;
}

const AccountsTable = ({ onViewClick, onDeleteClick }: Props) => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const { data } = useQueryAccounts(page * rowsPerPage, rowsPerPage);

  const handleChangePage = (
    _: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number
  ) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleViewClick = (id: number) => {
    onViewClick && onViewClick(id);
  };

  const handleDeleteClick = (id: number) => {
    onDeleteClick && onDeleteClick(id);
  };

  return (
    <>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 500 }} aria-label="accounts table">
          <TableHead>
            <TableRow>
              <TableCell>#</TableCell>
              <TableCell>Account</TableCell>
              <TableCell>Secret</TableCell>
              <TableCell>Auto Login</TableCell>
              <TableCell></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data?.data.map((row) => (
              <TableRow key={row.id}>
                <TableCell component="th" scope="row">
                  {row.id}
                </TableCell>
                <TableCell>{row.account}</TableCell>
                <TableCell>
                  <SecretHider>{row.secret}</SecretHider>
                </TableCell>
                <TableCell>{row.autoLogin ? <Check /> : <Close />}</TableCell>
                <TableCell align="right">
                  <Box sx={{ whiteSpace: "nowrap" }}>
                    <IconButton
                      aria-label="view"
                      onClick={() => handleViewClick(row.id!)}
                    >
                      <Visibility />
                    </IconButton>
                    <IconButton
                      aria-label="delete"
                      onClick={() => handleDeleteClick(row.id!)}
                    >
                      <Delete />
                    </IconButton>
                  </Box>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TablePagination
                rowsPerPageOptions={[1, 5, 10, 25, 50, 100]}
                colSpan={7}
                count={data?.count ? data?.count : 0}
                rowsPerPage={rowsPerPage}
                page={page}
                SelectProps={{
                  inputProps: {
                    "aria-label": "rows per page",
                  },
                  native: true,
                }}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
                ActionsComponent={TablePaginationActions}
              />
            </TableRow>
          </TableFooter>
        </Table>
      </TableContainer>
    </>
  );
};

export default AccountsTable;
