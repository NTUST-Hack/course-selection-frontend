import { AccountChosenCourse } from "@/query/accounts";
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Toolbar,
  Typography,
} from "@mui/material";

interface Props {
  data?: AccountChosenCourse[];
}

const ChosenCoursesTable = ({ data }: Props) => {
  return (
    <TableContainer component={Paper}>
      <Table aria-label="simple table">
        <TableHead>
          <Toolbar
            sx={{
              pl: { sm: 2 },
              pr: { xs: 1, sm: 1 },
            }}
          >
            <Typography
              sx={{ flex: "1 1 100%" }}
              variant="h6"
              id="tableTitle"
              component="div"
            >
              Chosen Courses
            </Typography>
          </Toolbar>
          <TableRow>
            <TableCell>Course No</TableCell>
            <TableCell>Course Name</TableCell>
            <TableCell>Credit Point</TableCell>
            <TableCell>Require Option</TableCell>
            <TableCell>Teacher</TableCell>
            <TableCell>Notes</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data?.map((row) => (
            <TableRow
              key={row.courseNo}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell>{row.courseNo}</TableCell>
              <TableCell>{row.courseName}</TableCell>
              <TableCell>{row.creditPoint}</TableCell>
              <TableCell>{row.requireOption}</TableCell>
              <TableCell>{row.teacher}</TableCell>
              <TableCell>{row.notes}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default ChosenCoursesTable;
