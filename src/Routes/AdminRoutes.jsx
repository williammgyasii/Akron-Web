import { Route } from "react-router-dom";

const AdminRoutes = () => {
    return (
      <>
        <Route path="/" element={<AdminDashboard />} />
        <Route path="/manage-users" element={<ManageUsers />} />
        <Route path="/manage-courses" element={<ManageCourses />} />
      </>
    );
  };
  