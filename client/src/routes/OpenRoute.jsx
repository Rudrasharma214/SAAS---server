import React from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import { useAuth } from '../context/authContext';

function OpenRoute() {
  const { user } = useAuth();
  if (user) {
    if (user.role === 'super_admin') {
      return <Navigate to="/superadmin/dashboard" replace />;
    } else if (user.role === 'company_owner') {
      return <Navigate to="/admin/dashboard" replace />;
    } else if (user.role === 'manager') {
      return <Navigate to="/manager/dashboard" replace />;
    } else if (user.role === 'user') {
      return <Navigate to="/user/dashboard" replace />;
    }
  }
  return <Outlet />;
}

export default OpenRoute;
