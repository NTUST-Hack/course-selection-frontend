import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";

interface Props {
  running?: boolean;
}

const QueryRunning = ({ running }: Props) => {
  return (
    <Paper
      sx={{
        p: 2,
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Typography component="h2" variant="h6" color="primary" gutterBottom>
        Query
      </Typography>
      <Typography component="p" variant="h4">
        {running ? "Running" : "Stopped"}
      </Typography>
      <Typography color="text.secondary" sx={{ flex: 1 }}>
        Enable access to up-to-date information
      </Typography>
    </Paper>
  );
};

export default QueryRunning;
