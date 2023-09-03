import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import GrabTaskSettings from "./GrabTaskSettings";
import { GrabTask } from "@/query/grabTasks";
import { useState } from "react";

interface Props {
  open: boolean;
  onCancelClick?: () => void;
  onSubmitClick?: (value: GrabTask) => void;
}

const NewGrabTaskDialog = ({ open, onCancelClick, onSubmitClick }: Props) => {
  const [settings, setSettings] = useState<GrabTask>({
    ntustAccountID: -1,
    enabledGrab: false,
    forceGrab: false,
    priority: 0,
    autoDisable: true,
    selectMode: 0,
  });
  const [savable, setSavable] = useState(false);

  const handleCancelClick = () => onCancelClick && onCancelClick();
  const handelSubmitClick = () => onSubmitClick && onSubmitClick(settings);

  return (
    <Dialog open={open}>
      <DialogTitle>Create Grab Task</DialogTitle>
      <DialogContent>
        <Box sx={{ mt: 1 }}>
          <GrabTaskSettings
            value={settings}
            onChange={(value) => setSettings(value)}
            onValidChange={(valid) => setSavable(valid)}
          />
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleCancelClick}>Cancel</Button>
        <Button autoFocus disabled={!savable} onClick={handelSubmitClick}>
          Create
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default NewGrabTaskDialog;
