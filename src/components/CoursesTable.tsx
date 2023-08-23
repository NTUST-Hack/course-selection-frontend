import * as React from "react";
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableFooter from "@mui/material/TableFooter";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import IconButton from "@mui/material/IconButton";
import FirstPageIcon from "@mui/icons-material/FirstPage";
import KeyboardArrowLeft from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";
import LastPageIcon from "@mui/icons-material/LastPage";
import TableHead from "@mui/material/TableHead";
import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";
import { Course, findCourses } from "../api/courses";
import "./CoursesTable.css";

interface TablePaginationActionsProps {
  count: number;
  page: number;
  rowsPerPage: number;
  onPageChange: (
    event: React.MouseEvent<HTMLButtonElement>,
    newPage: number
  ) => void;
}

function TablePaginationActions(props: TablePaginationActionsProps) {
  const { count, page, rowsPerPage, onPageChange } = props;

  const handleFirstPageButtonClick = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    onPageChange(event, 0);
  };

  const handleBackButtonClick = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    onPageChange(event, page - 1);
  };

  const handleNextButtonClick = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    onPageChange(event, page + 1);
  };

  const handleLastPageButtonClick = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    onPageChange(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
  };

  return (
    <Box sx={{ flexShrink: 0, ml: 2.5 }}>
      <IconButton
        onClick={handleFirstPageButtonClick}
        disabled={page === 0}
        aria-label="first page"
      >
        <FirstPageIcon />
      </IconButton>
      <IconButton
        onClick={handleBackButtonClick}
        disabled={page === 0}
        aria-label="previous page"
      >
        <KeyboardArrowLeft />
      </IconButton>
      <IconButton
        onClick={handleNextButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="next page"
      >
        <KeyboardArrowRight />
      </IconButton>
      <IconButton
        onClick={handleLastPageButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="last page"
      >
        <LastPageIcon />
      </IconButton>
    </Box>
  );
}

function createData(
  id: number,
  courseNo: string,
  semster: string,
  ntsustOnly: boolean,
  bachelorOnly: boolean,
  graduateOnly: boolean,
  enabledQuery: boolean
) {
  return {
    id,
    courseNo,
    semster,
    ntsustOnly,
    bachelorOnly,
    graduateOnly,
    enabledQuery,
  };
}

const rows = [
  createData(1, "CS2002302", "1121", true, true, false, true),
  createData(2, "CS2002302", "1121", true, false, false, true),
  createData(3, "CS2002302", "1121", false, true, false, true),
  createData(4, "CS2002302", "1121", true, true, false, true),
  createData(5, "CS2002302", "1121", true, true, false, true),
  createData(6, "CS2002302", "1121", true, true, false, true),
  createData(7, "CS2002302", "1121", true, true, false, true),
  createData(8, "CS2002302", "1121", true, true, false, true),
  createData(9, "CS2002302", "1121", true, true, false, true),
  createData(10, "CS2002302", "1121", true, true, false, true),
];

export default function CustomPaginationActionsTable() {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [courses, setCourses] = React.useState<Course[]>([]);

  React.useEffect(() => {
    const fetchData = async () => {
      const r = await findCourses(page * rowsPerPage, (page + 1) * rowsPerPage);
      if (r.length > 0) setCourses(r);
    };

    fetchData();
  }, [page, rowsPerPage]);

  const handleChangePage = (
    event: React.MouseEvent<HTMLButtonElement> | null,
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
            </TableRow>
          </TableHead>
          <TableBody>
            {courses.map((row) => (
              <TableRow key={row.id}>
                <TableCell component="th" scope="row">
                  {row.id}
                </TableCell>
                <TableCell>{row.courseNo}</TableCell>
                <TableCell>{row.semester}</TableCell>
                <TableCell>
                  {row.ntsustOnly ? <CheckIcon /> : <CloseIcon />}
                </TableCell>
                <TableCell>
                  {row.bachelorOnly ? <CheckIcon /> : <CloseIcon />}
                </TableCell>
                <TableCell>
                  {row.graduateOnly ? <CheckIcon /> : <CloseIcon />}
                </TableCell>
                <TableCell>
                  {row.enabledQuery ? <CheckIcon /> : <CloseIcon />}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TablePagination
                rowsPerPageOptions={[1, 5, 10, 25, 50, 100]}
                colSpan={7}
                count={rows.length}
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
      <pre>{JSON.stringify(courses)}</pre>
    </>
  );
}
