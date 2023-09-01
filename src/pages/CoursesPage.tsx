import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";
import CoursesTable from "../components/course/CoursesTable";
import MainLayout from "../layouts/MainLayout";
import NewCourseDialog from "@/components/course/NewCourseDialog";
import DeleteCourseDialog from "@/components/course/DeleteCourseDialog";
import { Course, useCreateCourse, useDeleteCourse } from "@/query/courses";
import { Box, Fab } from "@mui/material";
import { Add } from "@mui/icons-material";

const CoursePage = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const [newCourseDialogOpen, setNewCourseDialogOpen] = useState(false);
  const [delCourseDialogOpen, setDelCourseDialogOpen] = useState(false);
  const [delCourseID, setDelCourseID] = useState(0);

  const createCourse = useCreateCourse();
  const deleteCourse = useDeleteCourse();

  const handleViewCourseClick = (id: number) => {
    navigate(`./${id}`);
  };

  const handleDelCourseClick = (id: number) => {
    setDelCourseDialogOpen(true);
    setDelCourseID(id);
  };

  const handleAddCourse = (value: Course) => {
    createCourse.mutate(value, {
      onSuccess: () => {
        queryClient.refetchQueries(["courses"]);
        setNewCourseDialogOpen(false);
      },
    });
  };

  const handleDelCourse = () => {
    deleteCourse.mutate(delCourseID, {
      onSuccess: () => {
        queryClient.refetchQueries(["courses"]);
        setDelCourseDialogOpen(false);
      },
    });
  };

  return (
    <MainLayout title="Courses">
      <CoursesTable
        onViewClick={handleViewCourseClick}
        onDeleteClick={handleDelCourseClick}
      />

      <Box sx={{ position: "fixed", bottom: "20px", right: "20px" }}>
        <Fab variant="extended" onClick={() => setNewCourseDialogOpen(true)}>
          <Add sx={{ mr: 1 }} />
          New Course
        </Fab>
      </Box>

      <NewCourseDialog
        open={newCourseDialogOpen}
        onCancelClick={() => setNewCourseDialogOpen(false)}
        onSubmitClick={handleAddCourse}
      />

      <DeleteCourseDialog
        open={delCourseDialogOpen}
        courseID={delCourseID}
        onCancelClick={() => setDelCourseDialogOpen(false)}
        onDeleteClick={handleDelCourse}
      />
    </MainLayout>
  );
};

export default CoursePage;
