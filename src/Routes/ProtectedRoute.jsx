import React, { useEffect } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { CircularProgress } from "@mui/material";
import MainLayout from "../Layouts/MainLayout";
import { selectFirstLogin, selectWelcomeModalOpened } from "../Redux/Slices/System/systemSlice";

const CheckUserWelcomeState = ({ children }) => {
  const welcomeStatus = useSelector((state) => state.system);
  const dispatch=useDispatch()
  useEffect(() => {
    if(welcomeStatus==="newUser"){
      dispatch(selectWelcomeModalOpened())
    }
    else if(welcomeStatus==="currentUser"){
      
    }
    
    console.log("Shit");

    return () => {};
  }, []);

  return children;
};

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
