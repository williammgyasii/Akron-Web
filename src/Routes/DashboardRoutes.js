import { AccountBox, Dashboard, Settings } from "@mui/icons-material";
import DashboardPage from "../Pages/DashboardPage";
import ProfilePage from "../Pages/ProfilePage";
import SettingsPage from "../Pages/SettingsPage";
import { IoGridOutline, IoMenu, IoNotifications } from "react-icons/io5";
import NotificationsPage from "../Pages/NotificationsPage";
import { MdTask } from "react-icons/md";
import TaskPage from "../Pages/TaskPage";

export const DASHBOARD_ROUTES = [
  {
    title: "Dashboard",
    path: "/dashboard",
    icon: <IoGridOutline />,
    component: <DashboardPage />,
    index: true,
  },
  {
    title: "Task",
    path: "task",
    icon: <MdTask />,
    component: <TaskPage />,
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
