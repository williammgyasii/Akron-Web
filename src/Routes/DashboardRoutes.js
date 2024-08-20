import { AccountBox, Dashboard, Settings } from "@mui/icons-material";
import DashboardPage from "../Pages/DashboardPage";
import ProfilePage from "../Pages/ProfilePage";
import SettingsPage from "../Pages/SettingsPage";
import { IoGridOutline, IoMenu, IoNotifications } from "react-icons/io5";
import NotificationsPage from "../Pages/NotificationsPage";
import { MdTask } from "react-icons/md";
import TaskPage from "../Pages/TaskPage";
import GroupsPage from "../Pages/GroupsPage";
import { FaPeopleGroup } from "react-icons/fa6";
import { BiMessageSquare } from "react-icons/bi";
import MessagesPage from "../Pages/MessagesPage";

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
    title: "Groups",
    path: "groups",
    icon: <FaPeopleGroup />,
    component: <GroupsPage />,
  },
  {
    title: "Messages",
    path: "messages",
    icon: <BiMessageSquare />,
    component: <MessagesPage />,
  },
  {
    title: "Profile",
    path: "profile",
    // icon: < P/>,
    component: <ProfilePage />,
    subRoute: true,
  },
  {
    title: "Settings",
    path: "settings",
    // icon: < P/>,
    component: <SettingsPage />,
    subRoute: true,
  },
];
