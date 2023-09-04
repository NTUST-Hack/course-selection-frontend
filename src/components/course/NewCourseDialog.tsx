import { useState } from "react";
import { Course } from "@/query/courses";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import QuerySettings from "./QuerySettings";

interface Props {
  open: boolean;
  onCancelClick?: () => void;
  onSubmitClick?: (value: Course) => void;
}

const NewCourseDialog = ({ open, onCancelClick, onSubmitClick }: Props) => {
  const [courseSettings, setCourseSettings] = useState<Course>({
    courseNo: "",
    semester: "",
    ntustOnly: false,
    bachelorOnly: false,
    graduateOnly: false,
    enabledQuery: false,
  });

  const [dataValid, setDataValid] = useState(false);

  const handleCancelClick = () => onCancelClick && onCancelClick();
  const handleSubmitClick = () =>
    onSubmitClick && onSubmitClick(courseSettings);

  return (
    <Dialog open={open}>
      <DialogTitle>Add New Course</DialogTitle>
      <DialogContent>
        <DialogContentText sx={{ mb: 2 }}>
          Add course to keep course information up to date
        </DialogContentText>
        <QuerySettings
          value={courseSettings}
          onChange={(value) => setCourseSettings(value)}
          onValidChange={(valid) => setDataValid(valid)}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleCancelClick}>Cancel</Button>
        <Button autoFocus onClick={handleSubmitClick} disabled={!dataValid}>
          Add
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default NewCourseDialog;
