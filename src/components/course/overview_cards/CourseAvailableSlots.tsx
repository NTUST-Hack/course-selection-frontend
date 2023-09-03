import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";

interface Props {
  chosenNumber?: number;
  maximumNumber?: number;
}

const CourseAvailableSlots = ({ chosenNumber, maximumNumber }: Props) => {
  return (
    <Paper
      sx={{
        p: 2,
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Typography component="h2" variant="h6" color="primary" gutterBottom>
        Available Slots
      </Typography>
      <Typography component="p" variant="h4">
        {chosenNumber ? chosenNumber : 0}
        <small>/{maximumNumber ? maximumNumber : 0}</small>
      </Typography>
      <Typography color="text.secondary" sx={{ flex: 1 }}>
        Choose Student / Restrict2
      </Typography>
    </Paper>
  );
};

export default CourseAvailableSlots;
