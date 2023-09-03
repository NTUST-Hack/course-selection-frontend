import { useParams } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import {
  Account,
  useUpdateAccount,
  useQueryAccount,
  useQueryAccountInfoCache,
  useQueryAccountChosenCourses,
} from "@/query/accounts";
import {
  Typography,
  Breadcrumbs,
  Link,
  Grid,
  Paper,
  Box,
  Alert,
  Stack,
  Button,
} from "@mui/material";
import { useEffect, useState } from "react";
import AccountSettings from "@/components/account/AccountSettings";
import ChosenCoursesTable from "@/components/account/ChosenCoursesTable";

const AccountDetailPage = () => {
  const { account_id } = useParams();
  const id = parseInt(account_id!);

  const { data: accountData, isError, error } = useQueryAccount(id);

  const { data: accountInfoData } = useQueryAccountInfoCache(id, 1000);
  const { data: chosenCoursesData } = useQueryAccountChosenCourses(id);

  const accountUpdate = useUpdateAccount(id);

  const [accountSettings, setAccountSettings] = useState<Account>({
    account: "",
    secret: "",
    autoLogin: false,
  });

  useEffect(() => {
    accountData && setAccountSettings(accountData);
    console.log(accountData);
  }, [accountData]);

  const AccountInfoItem = ({
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
      {isError && (
        <Box sx={{ mb: 2 }}>
          <Alert severity="error">Failed to fetch data: {String(error)}</Alert>
        </Box>
      )}
      <Grid container spacing={2} sx={{ mb: 2 }}>
        <Grid item xs={12} lg={6}>
          <Paper sx={{ width: "full" }}>
            <Box sx={{ p: 2 }}>
              <Typography
                component="h2"
                variant="h6"
                gutterBottom
                sx={{ mb: 2 }}
              >
                Account Settings
              </Typography>
              <AccountSettings
                value={accountSettings}
                onChange={(value) => setAccountSettings(value)}
              />
              <Stack direction="row" justifyContent="end">
                <Button
                  variant="text"
                  color="secondary"
                  onClick={() => accountUpdate.mutate(accountSettings)}
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
              <AccountInfoItem name="Real Name">
                {accountInfoData?.realName}
              </AccountInfoItem>
              <AccountInfoItem name="Major">
                {accountInfoData?.major}
              </AccountInfoItem>
              <AccountInfoItem name="Cookies">
                {accountInfoData?.cookies}
              </AccountInfoItem>
              <AccountInfoItem name="Status">
                {accountInfoData?.status}
              </AccountInfoItem>
              <AccountInfoItem name="Last Updated">
                {accountInfoData &&
                  new Date(accountInfoData.lastUpdated).toLocaleString()}
              </AccountInfoItem>
            </Box>
          </Paper>
        </Grid>
        <Grid item xs={12}>
          <ChosenCoursesTable data={chosenCoursesData} />
        </Grid>
      </Grid>
    </MainLayout>
  );
};

export default AccountDetailPage;
