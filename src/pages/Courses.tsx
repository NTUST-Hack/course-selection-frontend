import CoursesTable from "../components/course/CoursesTable";
import MainLayout from "../layouts/MainLayout";

const home = () => {
  return (
    <MainLayout title="Courses">
      <CoursesTable />
    </MainLayout>
  );
};

export default home;
