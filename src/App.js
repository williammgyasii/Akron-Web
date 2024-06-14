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
import PrivateRoute from "./Routes/PrivateRoutes";

function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<RootLayout />}>
        <Route element={<LandingPage />} index />
        <Route path="login" element={<LoginPage />} />
        <Route path="register" element={<RegisterPage />} />

        <PrivateRoute
          path="/admin/*"
          element={<AdminRoutes />}
          roles={["admin"]}
        />
        <PrivateRoute
          path="/teacher/*"
          element={<TeacherRoutes />}
          roles={["teacher"]}
        />
        <PrivateRoute
          path="/student/*"
          element={<StudentRoutes />}
          roles={["student"]}
        />

        {/* PROTECTED ROUTES */}
        {/* <Route path="home" element={<ProtectedRoute />}>
          <Route index element={<DashboardPage />} />
          <Route path="profile" element={<ProfilePage />} />
        </Route> */}
      </Route>
    )
  );
  return <RouterProvider router={router} />;
}

export default App;
