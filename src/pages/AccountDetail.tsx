import { useRef, useState } from "react";
import { useParams } from "react-router-dom";
import Typography from "@mui/material/Typography";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Link from "@mui/material/Link";
import MainLayout from "../layouts/MainLayout";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Alert from "@mui/material/Alert";

const AccountDetail = () => {
  const initialized = useRef(false);

  const { account_id } = useParams();

  const [error, setError] = useState("");

  const breadcrumbs = (
    <div role="presentation">
      <Breadcrumbs aria-label="breadcrumb">
        <Link underline="hover" color="inherit" href="/accounts/">
          Accounts
        </Link>
        <Typography color="text.primary">{account_id}</Typography>
      </Breadcrumbs>
    </div>
  );

  return (
    <MainLayout title="Account Detail" breadcrumbs={breadcrumbs}>
      {error && (
        <Box sx={{ mb: 2 }}>
          <Alert severity="error">Failed to fetch data: {error}</Alert>
        </Box>
      )}
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
                Account Settings
              </Typography>
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
            </Box>
          </Paper>
        </Grid>
        <Grid item xs={12}>
          <Paper>
            <Box sx={{ p: 2 }}>
              <Typography
                component="h2"
                variant="h6"
                gutterBottom
                sx={{ mb: 2 }}
              >
                Chosen Courses
              </Typography>
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </MainLayout>
  );
};

export default AccountDetail;
