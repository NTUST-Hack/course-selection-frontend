import CoursesTable from "../components/course/CoursesTable";
import MainLayout from "../layouts/MainLayout";

const CoursePage = () => {
  return (
    <MainLayout title="Courses">
      <CoursesTable />
    </MainLayout>
  );
};

export default CoursePage;
