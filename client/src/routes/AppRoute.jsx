import React from 'react';
import { Route, Routes } from 'react-router-dom';
import OpenRoute from './OpenRoute';
import ProtectedRoute from './ProtectedRoute';
import SuperAdminDashboard from '../pages/superAdmin/SuperAdminDashboard.jsx';
import AdminDashboard from '../pages/admin/AdminDashboard.jsx';
import ManagerDashboard from '../pages/manager/ManagerDashboard.jsx';
import UserDashboard from '../pages/user/UserDashboard.jsx';
import Login from '../pages/auth/Login.jsx';
import Register from '../pages/auth/Register.jsx';
import Unauthorized from '../pages/auth/Unauthorized.jsx';
import CompanyRegister from '../pages/admin/CompanyRegister.jsx';

const AppRoute = () => {
  return (
    <Routes>
      <Route path="/login" element={<OpenRoute />}>
        <Route path="/login" element={<Login />} />
      </Route>
      <Route path="/register" element={<OpenRoute />}>
        <Route path="/register" element={<Register />} />
      </Route>

      <Route
        path="/superadmin/dashboard"
        element={<ProtectedRoute allowedRoles={['super_admin']} />}
      >
        <Route path="/superadmin/dashboard" element={<SuperAdminDashboard />} />
      </Route>

      <Route path="/admin/dashboard" element={<ProtectedRoute allowedRoles={['company_owner']} />}>
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
      </Route>

      <Route path="/register-company" element={<ProtectedRoute allowedRoles={['company_owner']} />}>
        <Route path="/register-company" element={<CompanyRegister />} />
      </Route>

      <Route path="/manager/dashboard" element={<ProtectedRoute allowedRoles={['manager']} />}>
        <Route path="/manager/dashboard" element={<ManagerDashboard />} />
      </Route>
      <Route path="/user/dashboard" element={<ProtectedRoute allowedRoles={['user']} />}>
        <Route path="/user/dashboard" element={<UserDashboard />} />
      </Route>

      <Route path="/unauthorized" element={<Unauthorized />} />

      <Route path="*" element={<Login />} />
    </Routes>
  );
};

export default AppRoute;
