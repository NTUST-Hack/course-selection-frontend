import { useCallback, useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import {
  Course,
  CourseInfoCache,
  getCourse,
  getCourseInfoCache,
  updateCourse,
} from "@/api/courses";
import Typography from "@mui/material/Typography";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Link from "@mui/material/Link";
import MainLayout from "../layouts/MainLayout";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import QuerySettings from "../components/course/QuerySettings";
import IconButton from "@mui/material/IconButton";
import AddIcon from "@mui/icons-material/Add";
import Stack from "@mui/material/Stack";
import Collapse from "@mui/material/Collapse";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import StopIcon from "@mui/icons-material/Stop";
import { ExpandLess, ExpandMore } from "@mui/icons-material";
import Button from "@mui/material/Button";
import QueryRunning from "../components/course/overview_cards/QueryRunning";
import QuerySpeed from "../components/course/overview_cards/QuerySpeed";
import GrabTasks from "../components/course/overview_cards/GrabTasks";
import CourseSpace from "../components/course/overview_cards/CourseSpace";
import CourseInfos from "../components/course/CourseInfos";
import Alert from "@mui/material/Alert";
const CourseDetail = () => {
  const initialized = useRef(false);

  const { course_id } = useParams();

  const [error, setError] = useState("");

  const [open, setOpen] = useState(false);

  const [courseInfo, setCourseInfo] = useState<Course>();
  const [courseInfoCache, setCourseInfoCache] = useState<CourseInfoCache>();

  const [querySettingsData, setQuerySettingsData] = useState<Course>({
    courseNo: "",
    semester: "",
    ntustOnly: false,
    bachelorOnly: false,
    graduateOnly: false,
    enabledQuery: false,
  });
  const [querySettingsSavable, setQuerySettingsSavable] = useState(true);

  const getCourseInfo = useCallback(async () => {
    if (course_id) {
      const id = parseInt(course_id);

      try {
        const course = await getCourse(id);
        setCourseInfo(course);

        const infoCache = await getCourseInfoCache(id);
        setCourseInfoCache(infoCache);
        setError("");
      } catch (error) {
        let message = "Unknown Error";
        if (error instanceof Error) message = error.message;
        // we'll proceed, but let's report it
        setError(message);
      }
    }
  }, [course_id]);

  useEffect(() => {
    const updatePage = async () => {
      if (initialized.current) return;
      initialized.current = true;

      if (course_id) {
        const id = parseInt(course_id);
        try {
          const course = await getCourse(id);
          setQuerySettingsData(course);
          setError("");
        } catch (error) {
          let message = "Unknown Error";
          if (error instanceof Error) message = error.message;
          // we'll proceed, but let's report it
          setError(message);
        }
      }
    };

    updatePage();

    const updateInfoInterval = setInterval(async () => {
      await getCourseInfo();
      console.log("updated");
    }, 1000);
    return () => clearInterval(updateInfoInterval);
  }, [course_id, getCourseInfo]);

  const onQuerySettingsChange = (value: Course) => {
    setQuerySettingsData(value);
  };

  const handleSaveQuerySettings = async () => {
    if (course_id) {
      const course = await updateCourse(parseInt(course_id), querySettingsData);
      setQuerySettingsData(course);
      await getCourseInfo();
      console.log(`save query settings`);
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
      {error && (
        <Box sx={{ mb: 2 }}>
          <Alert severity="error">Failed to fetch data: {error}</Alert>
        </Box>
      )}
      <Box sx={{ flexGrow: 1, mb: 2 }}>
        <Grid container spacing={2}>
          <Grid item xs={12} md={6} lg={3}>
            <QueryRunning running={courseInfo?.enabledQuery} />
          </Grid>
          <Grid item xs={12} md={6} lg={3}>
            <QuerySpeed speed={courseInfoCache?.timesPerSec} />
          </Grid>
          <Grid item xs={12} md={6} lg={3}>
            <GrabTasks tasksNumber={0} />
          </Grid>
          <Grid item xs={12} md={6} lg={3}>
            <CourseSpace
              chosenNumber={courseInfoCache?.chooseStudent}
              maximumNumber={courseInfoCache?.restrict2}
            />
          </Grid>
        </Grid>
      </Box>
      <Grid container spacing={2} sx={{ mb: 2 }}>
        <Grid item md={12} lg={6}>
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
                value={querySettingsData}
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
        <Grid item md={12} lg={6}>
          <Paper>
            <Box sx={{ p: 2 }}>
              <CourseInfos data={courseInfoCache} />
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
              <AddIcon />
            </IconButton>
          </Stack>

          <ListItemButton onClick={() => setOpen(!open)}>
            <ListItemIcon>
              <PlayArrowIcon />
            </ListItemIcon>
            <ListItemText primary="1 (B11030202)" />
            {open ? <ExpandLess /> : <ExpandMore />}
          </ListItemButton>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              <ListItemButton sx={{ pl: 4 }}>
                <ListItemText primary="Starred" />
              </ListItemButton>
            </List>
          </Collapse>

          <ListItemButton>
            <ListItemIcon>
              <StopIcon />
            </ListItemIcon>
            <ListItemText primary="2 (B11030203)" />
            <ExpandMore />
          </ListItemButton>
        </Box>
      </Paper>
    </MainLayout>
  );
};

export default CourseDetail;
