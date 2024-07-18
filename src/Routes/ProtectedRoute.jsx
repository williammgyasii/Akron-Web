import React from "react";
import { Navigate, Outlet } from "react-router-dom";

function ProtectedRoute() {
  return true ? <Outlet /> : <Navigate to={"/login"} />;
}

export default ProtectedRoute;
