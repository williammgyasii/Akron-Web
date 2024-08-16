import { AccountBox, Dashboard, Settings } from "@mui/icons-material";
import DashboardPage from "../Pages/DashboardPage";
import ProfilePage from "../Pages/ProfilePage";
import SettingsPage from "../Pages/SettingsPage";
import { IoNotifications } from "react-icons/io5";
import NotificationsPage from "../Pages/NotificationsPage";

export const DASHBOARD_ROUTES = [
  {
    title: "Dashboard",
    path: "/dashboard",
    icon: <Dashboard />,
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
  {
    title: "Notifications",
    path: "notifications",
    icon: <IoNotifications />,
    component: <NotificationsPage />,
  },


];


