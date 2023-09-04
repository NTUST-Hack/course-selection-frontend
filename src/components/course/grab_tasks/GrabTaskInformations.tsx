import { useState } from "react";
import { queryAccountFn } from "@/query/accounts";
import {
  GrabTask,
  SelectMode,
  useDeleteGrabTask,
  useQueryGrabTask,
  useUpdateGrabTask,
} from "@/query/grabTasks";
import { Delete, Edit, Pause, PlayArrow } from "@mui/icons-material";
import { Box, Chip, IconButton, Paper, Stack, Typography } from "@mui/material";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import "./GrabTaskInformations.css";
import EditGrabTaskDialog from "./EditGrabTaskDialog";
import DeleteGrabTaskDialog from "./DeleteGrabTaskDialog";

interface Props {
  courseID: number;
  taskID: number;
}

const TaskInfoItem = ({
  name,
  children,
}: {
  name: string;
  children?: string | number;
}) => {
  return (
    <Typography component="p" variant="body1" gutterBottom>
      <b>{name}:</b>&nbsp;{children}
    </Typography>
  );
};

const GrabTaskInformations = ({ courseID, taskID }: Props) => {
  const queryClient = useQueryClient();

  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [delDialogOpen, setDelDialogOpen] = useState(false);

  const { data, isSuccess } = useQueryGrabTask(courseID, taskID);
  const { data: accountData } = useQuery({
    queryKey: ["account", data],
    queryFn: () =>
      queryAccountFn(data?.ntustAccountID ? data.ntustAccountID : -1),
    enabled: isSuccess,
  });

  const updateGrabTask = useUpdateGrabTask(courseID, taskID);
  const deleteGrabTask = useDeleteGrabTask(courseID, taskID);

  const handleUpdateSaveClick = (value: GrabTask) => {
    updateGrabTask.mutate(value, {
      onSuccess: () => {
        setEditDialogOpen(false);
        queryClient.refetchQueries(["grab_task", courseID, taskID]);
      },
    });
  };

  const handleDeleteClick = () => {
    deleteGrabTask.mutate(undefined, {
      onSuccess: () => {
        setEditDialogOpen(false);
        queryClient.refetchQueries(["grab_tasks"]);
      },
    });
  };

  return (
    <>
      <Paper>
        <Box sx={{ p: 2 }}>
          <Typography component="h2" variant="h6" gutterBottom sx={{ mb: 2 }}>
            Task {taskID}
          </Typography>
          <TaskInfoItem name="Account">
            {`${data?.ntustAccountID} (${
              accountData?.account ? accountData.account : "unknown"
            })`}
          </TaskInfoItem>
          <TaskInfoItem name="Enabled Grab">
            {data?.enabledGrab ? "true" : "false"}
          </TaskInfoItem>
          <TaskInfoItem name="Force Grab">
            {data?.forceGrab ? "true" : "false"}
          </TaskInfoItem>
          <TaskInfoItem name="Priority">{data?.priority}</TaskInfoItem>
          <TaskInfoItem name="Auto Disable">
            {data?.autoDisable ? "true" : "false"}
          </TaskInfoItem>
          <TaskInfoItem name="Select Mode">
            {data ? SelectMode[data.selectMode] : ""}
          </TaskInfoItem>

          <Stack direction="row" justifyContent="space-between">
            <Box sx={{ whiteSpace: "nowrap" }}>
              {data?.enabledGrab ? (
                <Chip
                  variant="outlined"
                  color="success"
                  icon={<PlayArrow />}
                  className="breathing"
                  label="Running"
                />
              ) : (
                <Chip
                  variant="outlined"
                  color="error"
                  icon={<Pause />}
                  label="Stopped"
                />
              )}
            </Box>
            <Box sx={{ whiteSpace: "nowrap" }}>
              <IconButton
                aria-label="edit"
                onClick={() => setEditDialogOpen(true)}
              >
                <Edit />
              </IconButton>
              <IconButton
                aria-label="delete"
                onClick={() => setDelDialogOpen(true)}
              >
                <Delete />
              </IconButton>
            </Box>
          </Stack>
        </Box>
      </Paper>

      <EditGrabTaskDialog
        courseID={courseID}
        taskID={taskID}
        open={editDialogOpen}
        onCancelClick={() => setEditDialogOpen(false)}
        onSubmitClick={handleUpdateSaveClick}
      />

      <DeleteGrabTaskDialog
        open={delDialogOpen}
        taskID={taskID}
        onCancelClick={() => setDelDialogOpen(false)}
        onDeleteClick={handleDeleteClick}
      />
    </>
  );
};

export default GrabTaskInformations;
