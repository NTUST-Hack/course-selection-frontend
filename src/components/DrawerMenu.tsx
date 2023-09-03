import { useNavigate } from "react-router-dom";
import Divider from "@mui/material/Divider";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Toolbar from "@mui/material/Toolbar";
import DashboardIcon from "@mui/icons-material/Dashboard";
import SettingsIcon from "@mui/icons-material/Settings";
import HistoryIcon from "@mui/icons-material/History";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import BookIcon from "@mui/icons-material/Book";

type MenuItem = {
  icon: React.ReactNode;
  name: string;
  link?: string;
  disabled?: boolean;
};

const DrawerMenu = () => {
  const navigate = useNavigate();

  const menus: MenuItem[][] = [
    [
      {
        icon: <DashboardIcon />,
        name: "Dashboard",
        link: "/",
      },
      {
        icon: <BookIcon />,
        name: "Courses",
        link: "/courses",
      },
      {
        icon: <AccountCircleIcon />,
        name: "Accounts",
        link: "/accounts",
      },
    ],
    [
      {
        icon: <HistoryIcon />,
        name: "Logs",
      },
      {
        icon: <SettingsIcon />,
        name: "Settings",
      },
    ],
  ];

  return (
    <div>
      <Toolbar />
      <Divider />
      {menus.map((menu, index) => (
        <div key={"menus" + index}>
          <List>
            {menu.map(({ icon, name, link, disabled }) => (
              <ListItem key={name} disablePadding>
                <ListItemButton
                  disabled={disabled}
                  onClick={() => link && navigate(link)}
                >
                  <ListItemIcon>{icon}</ListItemIcon>
                  <ListItemText primary={name} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
          {index !== menus.length - 1 && <Divider />}
        </div>
      ))}
    </div>
  );
};

export default DrawerMenu;
