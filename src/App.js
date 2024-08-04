import {
  BrowserRouter,
  RouterProvider,
  Route,
  createBrowserRouter,
  createRoutesFromElements,
  Routes,
} from "react-router-dom";
import RootLayout from "./Routes/RootLayout";
import LoginPage from "./Pages/LoginPage";
import RegisterPage from "./Pages/RegisterPage";
import ProtectedRoute from "./Routes/ProtectedRoute";
import LandingPage from "./Pages/LandingPage";
import ProfilePage from "./Pages/ProfilePage";
import DashboardPage from "./Pages/DashboardPage";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { listenForAuthChanges } from "./Redux/Slices/Users/UsersSlice";
import LandingPageNew from "./Pages/LandingPageNew";
import { AccountBox } from "@mui/icons-material";
import { DASHBOARD_ROUTES } from "./Routes/DashboardRoutes";

function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<RootLayout />}>
        <Route element={<LandingPageNew />} index />
        <Route element={<LoginPage />} path="login" />
        <Route element={<RegisterPage />} path="join" />
        <Route path="dashboard" element={<ProtectedRoute />}>
          {DASHBOARD_ROUTES.map((section, index) => (
            <Route
              key={index}
              path={section.path}
              element={section.component}
              index={section.index}
            />
          ))}
          
        </Route>
      </Route>
    )
  );
  return <RouterProvider router={router} />;
}

export default App;
