import {
  BrowserRouter,
  RouterProvider,
  Route,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import "./App.css";
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

function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<RootLayout />}>
        <Route element={<LandingPage />}  />
        <Route element={<LoginPage />} index path="login" />

        <Route path="dashboard" element={<ProtectedRoute />}>
          <Route element={<DashboardPage />} index />
          <Route element={<ProfilePage />} path="profile" />
        </Route>
      </Route>
    )
  );
  return <RouterProvider router={router} />;
}

export default App;
