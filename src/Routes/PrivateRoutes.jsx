import React from "react";
import { Route, Redirect } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import RoleBasedRedirect from "./RoleBasedRedirect";

const PrivateRoute = ({ component: Component, roles, ...rest }) => {
  const { currentUser } = useAuth();

  return (
    <Route
      {...rest}
      render={(props) => {
        if (!currentUser) {
          return <Redirect to="/login" />;
        }

        if (roles && roles.indexOf(currentUser.role) === -1) {
          return <RoleBasedRedirect userRole={currentUser.role} />;
        }

        return <Component {...props} />;
      }}
    />
  );
};

export default PrivateRoute;
