import React from "react";
import { useSelector } from "react-redux";
import { selectCurrentUser } from "../Firebase/firebaseSlice";
import { Navigate, Outlet } from "react-router-dom";

function ProtectedRoute() {
  const currentUser = useSelector(selectCurrentUser);
  return currentUser ? <Outlet /> : <Navigate to={"/login"} />;
}

export default ProtectedRoute;
