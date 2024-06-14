import React from "react";
import { Route, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectCurrentUser } from "../Firebase/firebaseSlice";
import RoleBasedRedirect from "../Components/RoleBasedRedirect";

const PrivateRoute = ({ element, roles, ...rest }) => {
  const currentUser = useSelector(selectCurrentUser);

  if (!currentUser) {
    return <Navigate to="/login" replace />;
  }

  if (roles && !roles.includes(currentUser.role)) {
    return <RoleBasedRedirect userRole={currentUser.role} />;
  }

  return <Route {...rest} element={element} />;
};

export default PrivateRoute;
