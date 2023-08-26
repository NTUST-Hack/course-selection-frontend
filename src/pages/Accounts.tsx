import AccountsTable from "@/components/account/AccountsTable";
import MainLayout from "../layouts/MainLayout";

const home = () => {
  return (
    <MainLayout title="Accounts">
      <AccountsTable />
    </MainLayout>
  );
};

export default home;
