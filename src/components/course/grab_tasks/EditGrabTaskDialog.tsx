import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import GrabTaskSettings from "./GrabTaskSettings";
import { GrabTask, queryGrabTaskFn } from "@/query/grabTasks";
import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";

interface Props {
  open: boolean;
  courseID: number;
  taskID: number;
  onCancelClick?: () => void;
  onSubmitClick?: (value: GrabTask) => void;
}

const EditGrabTaskDialog = ({
  open,
  courseID,
  taskID,
  onCancelClick,
  onSubmitClick,
}: Props) => {
  const { data, isSuccess } = useQuery({
    enabled: open,
    queryKey: ["grab_task", courseID, taskID, open],
    queryFn: () => queryGrabTaskFn(courseID, taskID),
  });

  const [settings, setSettings] = useState<GrabTask>({
    ntustAccountID: -1,
    enabledGrab: false,
    forceGrab: false,
    priority: 0,
    autoDisable: false,
    selectMode: 0,
  });

  useEffect(() => {
    if (isSuccess) setSettings(data);
  }, [isSuccess, data]);

  const handleCancelClick = () => onCancelClick && onCancelClick();
  const handelSubmitClick = () => onSubmitClick && onSubmitClick(settings);

  return (
    <Dialog open={open}>
      <DialogTitle>Edit Grab Task {taskID}</DialogTitle>
      <DialogContent>
        <Box sx={{ mt: 1 }}>
          <GrabTaskSettings
            value={settings}
            onChange={(value) => setSettings(value)}
          />
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleCancelClick}>Cancel</Button>
        <Button autoFocus onClick={handelSubmitClick}>
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default EditGrabTaskDialog;
