import { useState } from "react";
import { useQueryCourses } from "@/query/courses";
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
import TablePaginationActions from "@mui/material/TablePagination/TablePaginationActions";

interface Props {
  onViewClick?: (id: number) => void;
  onDeleteClick?: (id: number) => void;
}

const CoursesTable = ({ onViewClick, onDeleteClick }: Props) => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const { data } = useQueryCourses(page * rowsPerPage, rowsPerPage);

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
        <Table sx={{ minWidth: 500 }} aria-label="custom pagination table">
          <TableHead>
            <TableRow>
              <TableCell>#</TableCell>
              <TableCell>Course No</TableCell>
              <TableCell>Semester</TableCell>
              <TableCell>NTUST Only</TableCell>
              <TableCell>Bachelor Only</TableCell>
              <TableCell>Graduate Only</TableCell>
              <TableCell>Enabled Query</TableCell>
              <TableCell></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data?.data.map((row) => (
              <TableRow key={row.id}>
                <TableCell component="th" scope="row">
                  {row.id}
                </TableCell>
                <TableCell>{row.courseNo}</TableCell>
                <TableCell>{row.semester}</TableCell>
                <TableCell>{row.ntustOnly ? <Check /> : <Close />}</TableCell>
                <TableCell>
                  {row.bachelorOnly ? <Check /> : <Close />}
                </TableCell>
                <TableCell>
                  {row.graduateOnly ? <Check /> : <Close />}
                </TableCell>
                <TableCell>
                  {row.enabledQuery ? <Check /> : <Close />}
                </TableCell>
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
                colSpan={8}
                count={data?.count ? data.count : 0}
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

export default CoursesTable;
