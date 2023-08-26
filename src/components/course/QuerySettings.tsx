import { useCallback, useEffect, useState } from "react";
import { Course } from "../../api/courses";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";
import Grid from "@mui/material/Grid";

interface Prpos {
  value?: Course;
  onChange?: (value: Course) => void;
  onValidChange?: (valid: boolean) => void;
}

const QuerySettings = ({ value, onChange, onValidChange }: Prpos) => {
  const [courseNoHelper, setCourseNoHelper] = useState("");
  const [semesterHelper, setSemesterHelper] = useState("");

  const [querySettingsData, setQuerySettingsData] = useState<Course>(
    value
      ? value
      : {
          courseNo: "",
          semester: "",
          ntustOnly: false,
          bachelorOnly: false,
          graduateOnly: false,
          enabledQuery: false,
        }
  );

  const [valid, setValid] = useState(true);

  const updateData = useCallback(
    (value: Course) => {
      onChange && onChange(value);
    },
    [onChange]
  );

  const updateValid = useCallback(
    (valid: boolean) => {
      onValidChange && onValidChange(valid);
    },
    [onValidChange]
  );

  useEffect(() => {
    value && setQuerySettingsData(value);
  }, [value]);

  useEffect(() => updateValid(valid), [updateValid, valid]);

  const onCourseNoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const v = e.target.value.length === 9;
    setCourseNoHelper(v ? "" : "Course no length should be 9");
    setValid(v);
    updateData({
      ...querySettingsData,
      courseNo: e.target.value,
    });
  };

  const onSemesterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const v = e.target.value.length === 4;
    setSemesterHelper(v ? "" : "Semester length should be 4");
    setValid(v);
    updateData({
      ...querySettingsData,
      semester: e.target.value,
    });
  };

  const onNTUSTOnlyChange = (_: unknown, checked: boolean) => {
    updateData({
      ...querySettingsData,
      ntustOnly: checked,
    });
  };

  const onBachelorOnlyChange = (_: unknown, checked: boolean) => {
    updateData({
      ...querySettingsData,
      bachelorOnly: checked,
    });
  };

  const onGraduateOnlyChange = (_: unknown, checked: boolean) => {
    updateData({
      ...querySettingsData,
      graduateOnly: checked,
    });
  };

  const onEnabledQuery = (_: unknown, checked: boolean) => {
    updateData({
      ...querySettingsData,
      enabledQuery: checked,
    });
  };

  return (
    <>
      <FormControlLabel
        sx={{ mb: 2 }}
        required
        control={<Switch />}
        label="Enabled Query"
        checked={querySettingsData.enabledQuery}
        onChange={onEnabledQuery}
      />
      <Grid container spacing={2} sx={{ mb: 2 }}>
        <Grid item xs={12} md={6}>
          <TextField
            required
            fullWidth
            id="course-no"
            label="Course No"
            value={querySettingsData.courseNo}
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
            value={querySettingsData.semester}
            onChange={onSemesterChange}
            error={semesterHelper ? true : false}
            helperText={semesterHelper ? semesterHelper : "Example: 1121"}
          />
        </Grid>
        <Grid item xs={12} md={4}>
          <FormControlLabel
            required
            control={<Switch />}
            label="NTUST Only"
            checked={querySettingsData.ntustOnly}
            onChange={onNTUSTOnlyChange}
          />
        </Grid>
        <Grid item xs={12} md={4}>
          <FormControlLabel
            required
            control={<Switch />}
            label="Bachelor Only"
            checked={querySettingsData.bachelorOnly}
            onChange={onBachelorOnlyChange}
          />
        </Grid>
        <Grid item xs={12} md={4}>
          <FormControlLabel
            required
            control={<Switch />}
            label="Graduate Only"
            checked={querySettingsData.graduateOnly}
            onChange={onGraduateOnlyChange}
          />
        </Grid>
      </Grid>
    </>
  );
};

export default QuerySettings;
