import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Outlet } from "react-router-dom";
import LoadingView from "../Components/LoadingView";
import { Container } from "@mui/material";

function RootLayout() {
  const dispatch = useDispatch();

  return false ? <LoadingView /> : <Outlet />;
}

export default RootLayout;
