import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Course, updateCourse } from "@/api/courses";
import {
  Alert,
  Box,
  Breadcrumbs,
  Button,
  Grid,
  IconButton,
  Link,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import MainLayout from "@/layouts/MainLayout";
import QueryRunning from "@/components/course/overview_cards/QueryRunning";
import QuerySpeed from "@/components/course/overview_cards/QuerySpeed";
import GrabTasks from "@/components/course/overview_cards/GrabTasks";
import QuerySettings from "@/components/course/QuerySettings";
import CourseInfos from "@/components/course/CourseInfos";
import { Add, ExpandMore, PlayArrow, Stop } from "@mui/icons-material";
import { useQueryCourse, useQueryCourseInfoCache } from "@/query/courses";
import CourseAvailableSlots from "@/components/course/overview_cards/CourseAvailableSlots";

const CourseDetailPage = () => {
  const { course_id } = useParams();

  const [querySettings, setQuerySettings] = useState<Course>({
    courseNo: "",
    semester: "",
    ntustOnly: false,
    bachelorOnly: false,
    graduateOnly: false,
    enabledQuery: false,
  });

  const [querySettingsSavable, setQuerySettingsSavable] = useState(true);

  const {
    data: querySettingsData,
    error,
    isError,
  } = useQueryCourse(parseInt(course_id!), 1000);
  const { data: infoCacheData } = useQueryCourseInfoCache(
    parseInt(course_id!),
    1000
  );

  useEffect(() => {
    querySettingsData && setQuerySettings(querySettingsData);
  }, [querySettingsData]);

  const onQuerySettingsChange = (value: Course) => {
    setQuerySettings(value);
  };

  const handleSaveQuerySettings = async () => {
    if (course_id) {
      const course = await updateCourse(parseInt(course_id), querySettings);
      setQuerySettings(course);
    }
  };

  const breadcrumbs = (
    <div role="presentation">
      <Breadcrumbs aria-label="breadcrumb">
        <Link underline="hover" color="inherit" href="/courses/">
          Courses
        </Link>
        <Typography color="text.primary">{course_id}</Typography>
      </Breadcrumbs>
    </div>
  );

  return (
    <MainLayout title="Course Detail" breadcrumbs={breadcrumbs}>
      {isError && (
        <Box sx={{ mb: 2 }}>
          <Alert severity="error">Failed to fetch data: {String(error)}</Alert>
        </Box>
      )}
      <Box sx={{ flexGrow: 1, mb: 2 }}>
        <Grid container spacing={2}>
          <Grid item xs={12} md={6} lg={3}>
            <QueryRunning running={querySettingsData?.enabledQuery} />
          </Grid>
          <Grid item xs={12} md={6} lg={3}>
            <QuerySpeed speed={infoCacheData?.timesPerSec} />
          </Grid>
          <Grid item xs={12} md={6} lg={3}>
            <GrabTasks tasksNumber={0} />
          </Grid>
          <Grid item xs={12} md={6} lg={3}>
            <CourseAvailableSlots
              chosenNumber={infoCacheData?.chooseStudent}
              maximumNumber={infoCacheData?.restrict2}
            />
          </Grid>
        </Grid>
      </Box>
      <Grid container spacing={2} sx={{ mb: 2 }}>
        <Grid item xs={12} lg={6}>
          <Paper>
            <Box sx={{ p: 2 }}>
              <Typography
                component="h2"
                variant="h6"
                gutterBottom
                sx={{ mb: 2 }}
              >
                Query Settings
              </Typography>
              <QuerySettings
                value={querySettings}
                onChange={onQuerySettingsChange}
                onValidChange={(valid) => setQuerySettingsSavable(valid)}
              />
              <Stack direction="row" justifyContent="end">
                <Button
                  variant="text"
                  color="secondary"
                  disabled={!querySettingsSavable}
                  onClick={handleSaveQuerySettings}
                >
                  Save
                </Button>
              </Stack>
            </Box>
          </Paper>
        </Grid>
        <Grid item xs={12} lg={6}>
          <Paper>
            <Box sx={{ p: 2 }}>
              <Typography
                component="h2"
                variant="h6"
                gutterBottom
                sx={{ mb: 2 }}
              >
                Informations
              </Typography>
              {infoCacheData ? <CourseInfos data={infoCacheData} /> : "No data"}
            </Box>
          </Paper>
        </Grid>
      </Grid>
      <Paper sx={{ mb: 2 }}>
        <Box sx={{ p: 2 }}>
          <Stack direction="row" justifyContent="space-between" sx={{ mb: 2 }}>
            <Typography component="h2" variant="h6" gutterBottom>
              Grab Tasks
            </Typography>
            <IconButton aria-label="new-grab-task">
              <Add />
            </IconButton>
          </Stack>

          <ListItemButton>
            <ListItemIcon>
              <PlayArrow />
            </ListItemIcon>
            <ListItemText primary="1 (B11030202)" />
            <ExpandMore />
          </ListItemButton>

          <ListItemButton>
            <ListItemIcon>
              <Stop />
            </ListItemIcon>
            <ListItemText primary="2 (B11030203)" />
            <ExpandMore />
          </ListItemButton>
        </Box>
      </Paper>
    </MainLayout>
  );
};

export default CourseDetailPage;
