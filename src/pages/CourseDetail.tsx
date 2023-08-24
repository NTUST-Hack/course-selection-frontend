import { useState } from "react";
import { useParams } from "react-router-dom";
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

const CourseInfo = ({
  name,
  children,
}: {
  name: string;
  children?: string;
}) => {
  return (
    <Typography component="p" variant="body1" gutterBottom>
      <b>{name}:</b>&nbsp;{children}
    </Typography>
  );
};

const CourseDetail = () => {
  const params = useParams();

  const [open, setOpen] = useState(false);

  const breadcrumbs = (
    <div role="presentation">
      <Breadcrumbs aria-label="breadcrumb">
        <Link underline="hover" color="inherit" href="/">
          Home
        </Link>
        <Link underline="hover" color="inherit" href="/courses/">
          Courses
        </Link>
        <Typography color="text.primary">{params.course_id}</Typography>
      </Breadcrumbs>
    </div>
  );

  return (
    <MainLayout title="Course Detail" breadcrumbs={breadcrumbs}>
      <Box sx={{ flexGrow: 1, mb: 2 }}>
        <Grid container spacing={2}>
          <Grid item xs={12} md={6} lg={3}>
            <Paper
              sx={{
                p: 2,
                display: "flex",
                flexDirection: "column",
              }}
            >
              <Typography
                component="h2"
                variant="h6"
                color="primary"
                gutterBottom
              >
                Query
              </Typography>
              <Typography component="p" variant="h4">
                Running
              </Typography>
              <Typography color="text.secondary" sx={{ flex: 1 }}>
                Enable access to up-to-date information
              </Typography>
            </Paper>
          </Grid>
          <Grid item xs={12} md={6} lg={3}>
            <Paper
              sx={{
                p: 2,
                display: "flex",
                flexDirection: "column",
              }}
            >
              <Typography
                component="h2"
                variant="h6"
                color="primary"
                gutterBottom
              >
                Query Speed
              </Typography>
              <Typography component="p" variant="h4">
                200<small>/s</small>
              </Typography>
              <Typography color="text.secondary" sx={{ flex: 1 }}>
                Refresh times per second
              </Typography>
            </Paper>
          </Grid>
          <Grid item xs={12} md={6} lg={3}>
            <Paper
              sx={{
                p: 2,
                display: "flex",
                flexDirection: "column",
              }}
            >
              <Typography
                component="h2"
                variant="h6"
                color="primary"
                gutterBottom
              >
                Grab Tasks
              </Typography>
              <Typography component="p" variant="h4">
                2<small>/4</small>
              </Typography>
              <Typography color="text.secondary" sx={{ flex: 1 }}>
                Create grab task to grab a course
              </Typography>
            </Paper>
          </Grid>
          <Grid item xs={12} md={6} lg={3}>
            <Paper
              sx={{
                p: 2,
                display: "flex",
                flexDirection: "column",
              }}
            >
              <Typography
                component="h2"
                variant="h6"
                color="primary"
                gutterBottom
              >
                Spcae
              </Typography>
              <Typography component="p" variant="h4">
                47<small>/55</small>
              </Typography>
              <Typography color="text.secondary" sx={{ flex: 1 }}>
                Choose Student / Restrict2
              </Typography>
            </Paper>
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
              <QuerySettings />
            </Box>
          </Paper>
        </Grid>
        <Grid item md={12} lg={6}>
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
              <Box>
                <CourseInfo name="Course Name">資料結構</CourseInfo>
                <CourseInfo name="Teacher">陳冠宇</CourseInfo>
                <CourseInfo name="Choose Student">47</CourseInfo>
                <CourseInfo name="All Student">47</CourseInfo>
                <CourseInfo name="Restrict1">9999</CourseInfo>
                <CourseInfo name="Restrict2">55</CourseInfo>
                <CourseInfo name="Three Student">0</CourseInfo>
                <CourseInfo name="Queried Times">0</CourseInfo>
                <CourseInfo name="Times Per Second">0</CourseInfo>
                <CourseInfo name="Updated Time">
                  2023-08-23T23:03:05.476379-07:00
                </CourseInfo>
              </Box>
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
