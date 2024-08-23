import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import { CircularProgress } from "@mui/material";
import MainLayout from "../Layouts/MainLayout";

const PrivateRoute = ({ element }) => {
  const { currentUser, loading, status, error } = useSelector(
    (state) => state.user
  );
  // console.log(currentUser, loading, status, error);

  if (status === "loading") {
    if (loading) return <CircularProgress size={24} />; // or a spinner
  }

  return currentUser ? (
    <>
      <MainLayout>
        <Outlet />
      </MainLayout>
    </>
  ) : (
    <Navigate to="/login" />
  );
};

export default PrivateRoute;
