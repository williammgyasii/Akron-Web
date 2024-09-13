import React, { useEffect } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { CircularProgress } from "@mui/material";
import MainLayout from "../Layouts/MainLayout";
import {
  selectFirstLogin,
  selectWelcomeModalOpened,
  setWelcomeModalOpen,
} from "../Redux/Slices/System/systemSlice";
import { FETCH_USER_GROUPS } from "../Redux/Slices/Groups/groupsSlice";
import { selectCurrentUser } from "../Redux/Slices/Users/UsersSlice";

const CheckUserWelcomeState = ({ children }) => {
  const welcomeStatus = useSelector((state) => state.system.appUserState);
  const dispatch = useDispatch();
  const currentUser = useSelector(selectCurrentUser);
  useEffect(() => {
    if (welcomeStatus === "newUser") {
      dispatch(setWelcomeModalOpen());
    } else if (welcomeStatus === "currentUser") {
    }
    dispatch(FETCH_USER_GROUPS(currentUser.uid));
    return () => {};
  }, [dispatch]);

  return children;
};

const PrivateRoute = ({ element }) => {
  const { currentUser, loading, status, error } = useSelector(
    (state) => state.user
  );

  if (status === "loading") {
    if (loading) return <CircularProgress size={24} />; // or a spinner
  }

  return currentUser ? (
    <>
      <CheckUserWelcomeState>
        <MainLayout>
          <Outlet />
        </MainLayout>
      </CheckUserWelcomeState>
    </>
  ) : (
    <Navigate to="/login" />
  );
};

export default PrivateRoute;
