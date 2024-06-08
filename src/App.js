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

function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<RootLayout/>}>
        <Route element={<LoginPage />} index />
        <Route path="register" element={<RegisterPage/>}/>
      </Route>
    )
  );
  return <RouterProvider router={router} />;
}

export default App;
