import Box from "@mui/material/Box";
import CoursesTable from "../components/CoursesTable";
import MainLayout from "../layouts/MainLayout";

const home = () => {
  return (
    <MainLayout title="Courses">
      <CoursesTable />
    </MainLayout>
  );
};

export default home;
