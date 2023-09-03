import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";

interface Props {
  speed?: number;
}

const QuerySpeed = ({ speed }: Props) => {
  return (
    <Paper
      sx={{
        p: 2,
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Typography component="h2" variant="h6" color="primary" gutterBottom>
        Query Speed
      </Typography>
      <Typography component="p" variant="h4">
        {speed ? speed : 0}
        <small>/s</small>
      </Typography>
      <Typography color="text.secondary" sx={{ flex: 1 }}>
        Refresh times per second
      </Typography>
    </Paper>
  );
};

export default QuerySpeed;
