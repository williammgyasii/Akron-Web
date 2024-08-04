import { AccountBox } from "@mui/icons-material";
import DashboardPage from "../Pages/DashboardPage";
import ProfilePage from "../Pages/ProfilePage";

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
];


