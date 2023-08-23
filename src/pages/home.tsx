import MainLayout from "../layouts/MainLayout";
import Typography from "@mui/material/Typography";

const home = () => {
  return (
    <MainLayout title="Dashboard">
      <Typography paragraph>Welcome to Course Master.</Typography>
    </MainLayout>
  );
};

export default home;
