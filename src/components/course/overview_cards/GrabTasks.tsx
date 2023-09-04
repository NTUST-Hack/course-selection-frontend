import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";

interface Props {
  tasksNumber?: number;
}

const GrabTasks = ({ tasksNumber }: Props) => {
  return (
    <Paper
      sx={{
        p: 2,
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Typography component="h2" variant="h6" color="primary" gutterBottom>
        Grab Tasks
      </Typography>
      <Typography component="p" variant="h4">
        {tasksNumber ? tasksNumber : 0}
      </Typography>
      <Typography color="text.secondary" sx={{ flex: 1 }}>
        Create grab task to grab a course
      </Typography>
    </Paper>
  );
};

export default GrabTasks;
