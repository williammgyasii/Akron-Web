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
import Features from "./Pages/LandingPage/subpages/Features";
import About from "./Pages/LandingPage/subpages/About";
import Pricing from "./Pages/LandingPage/subpages/Pricing";
function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<RootLayout />}>
        <Route element={<LandingPage />} index />
        <Route element={<Features />} path="features" />
        <Route element={<About />} path="about" />
        <Route element={<Pricing />} path="pricing" />

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
