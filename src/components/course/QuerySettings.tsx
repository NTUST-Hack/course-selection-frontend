import { useState } from "react";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";

const QuerySettings = () => {
  const [courseNoHelper, setCourseNoHelper] = useState("");
  const [semesterHelper, setSemesterHelper] = useState("");

  const onCourseNoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCourseNoHelper(
      e.target.value.length != 9 ? "Course no length should be 9" : ""
    );
  };

  const onSemsterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSemesterHelper(
      e.target.value.length != 4 ? "Semster length should be 4" : ""
    );
  };

  return (
    <>
      <FormControlLabel
        required
        control={<Switch />}
        label="Enabled Query"
        sx={{ mb: 2 }}
      />
      <Grid container spacing={2} sx={{ mb: 2 }}>
        <Grid item xs={12} md={6}>
          <TextField
            required
            fullWidth
            id="course-no"
            label="Course No"
            defaultValue="CS2002302"
            onChange={onCourseNoChange}
            error={courseNoHelper ? true : false}
            helperText={courseNoHelper ? courseNoHelper : "Example: CS2002302"}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            required
            fullWidth
            id="semester"
            label="Semester"
            defaultValue="1121"
            onChange={onSemsterChange}
            error={semesterHelper ? true : false}
            helperText={semesterHelper ? semesterHelper : "Example: 1121"}
          />
        </Grid>
        <Grid item xs={12} md={4}>
          <FormControlLabel required control={<Switch />} label="NTUST Only" />
        </Grid>
        <Grid item xs={12} md={4}>
          <FormControlLabel
            required
            control={<Switch />}
            label="Bachelor Only"
          />
        </Grid>
        <Grid item xs={12} md={4}>
          <FormControlLabel
            required
            control={<Switch />}
            label="Graduate Only"
          />
        </Grid>
      </Grid>
      <Stack direction="row" justifyContent="end">
        <Button variant="text" color="secondary">
          Save
        </Button>
      </Stack>
    </>
  );
};

export default QuerySettings;
