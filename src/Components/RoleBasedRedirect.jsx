import React from 'react';

const RoleBasedRedirect = ({ userRole }) => {
  return (
    <div>
      <h1>Access Denied</h1>
      <p>You do not have permission to view this page as a {userRole}.</p>
    </div>
  );
};

export default RoleBasedRedirect;
