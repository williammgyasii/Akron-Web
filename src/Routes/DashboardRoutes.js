import { AccountBox, Settings } from "@mui/icons-material";
import DashboardPage from "../Pages/DashboardPage";
import ProfilePage from "../Pages/ProfilePage";
import SettingsPage from "../Pages/SettingsPage";

export const DASHBOARD_ROUTES = [
  {
    title: "Dashboard",
    path: "/dashboard",
    icon: <AccountBox />,
    component: <DashboardPage />,
    index:true
  },
  {
    title: "Profile",
    path: "profile",
    icon: <AccountBox />,
    component: <ProfilePage />,
  },
  {
    title: "Settings",
    path: "settings",
    icon: <Settings />,
    component: <SettingsPage />,
  },
];


