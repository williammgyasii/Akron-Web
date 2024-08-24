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
import LandingPageNew from "./Pages/LandingPageNew";
import { AccountBox } from "@mui/icons-material";
import { DASHBOARD_ROUTES } from "./Routes/dashboardRoutes";
import { useEffect } from "react";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { firebaseAuth } from "./Firebase/getFirebase";

function App() {
  // useEffect(() => {
  //   const unsubscribe = onAuthStateChanged(firebaseAuth, (user) => {
  //     if (user) {
  //       console.log("Current User", user);
  //       // signOut(firebaseAuth);
  //     } else {
  //       console.log("No User"); // User is signed out
  //     }
  //   });

  //   return () => unsubscribe(); // Cleanup listener on component unmount
  // }, []);
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
