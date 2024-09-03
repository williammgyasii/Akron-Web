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
import LandingPage from "./Pages/LandingPage/LandingPage";
import { DASHBOARD_ROUTES } from "./Routes/dashboardRoutes";
import { navbarLinks } from "./Routes/landingRoutes";
function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<RootLayout />}>
        {navbarLinks.map((page, index) => (
          <Route
            key={index}
            path={page.link}
            element={page.element}
            index={page?.index}
          />
        ))}
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
