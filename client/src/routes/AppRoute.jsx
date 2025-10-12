import { Route, Routes } from 'react-router-dom';
import OpenRoute from './OpenRoute';
import ProtectedRoute from './ProtectedRoute';
import SuperAdminDashboard from '../pages/superAdmin/SuperAdminDashboard.jsx';
import DashboardContent from '../components/superAdmin/DashboardContent';
import CompaniesPage from '../pages/superAdmin/CompaniesPage.jsx';
import Plan from '../components/superAdmin/Plan';
import Settings from '../components/superAdmin/Settings';
import AdminDashboard from '../pages/admin/AdminDashboard.jsx';
import ManagerDashboard from '../pages/manager/ManagerDashboard.jsx';
import UserDashboard from '../pages/user/UserDashboard.jsx';
import Login from '../pages/auth/Login.jsx';
import Register from '../pages/auth/Register.jsx';
import Unauthorized from '../pages/auth/Unauthorized.jsx';
import CompanyRegister from '../pages/admin/CompanyRegister.jsx';

// Admin section components
import Managers from '../components/admin/Managers';
import Users from '../components/admin/Users';
import Projects from '../components/admin/Projects';
import Attendance from '../components/admin/Attendance';
import AdminPlans from '../components/admin/AdminPlans';
import AdminSettings from '../components/admin/AdminSettings';
import AdminDashboardContent from '../components/admin/AdminDashboardContent';

import withDeviceCheck from '../components/DeviceCheck/withDeviceCheck.jsx';
import DeviceNotSupported from '../pages/DeviceNotSupported.jsx';


const DeviceCheckedSuperAdminDashboard = withDeviceCheck(SuperAdminDashboard);
const DeviceCheckedAdminDashboard = withDeviceCheck(AdminDashboard);
const DeviceCheckedManagerDashboard = withDeviceCheck(ManagerDashboard);
const DeviceCheckedUserDashboard = withDeviceCheck(UserDashboard);

const AppRoute = () => {
  return (
    <Routes>
      <Route path="/login" element={<OpenRoute />}>
        <Route index element={<Login />} />
      </Route>

      <Route path="/register" element={<OpenRoute />}>
        <Route index element={<Register />} />
      </Route>

      <Route
        path="/superadmin/dashboard"
        element={<ProtectedRoute allowedRoles={['super_admin']} />}
      >
        <Route element={<DeviceCheckedSuperAdminDashboard />}>
          <Route index element={<DashboardContent />} />
          <Route path="companies" element={<CompaniesPage />} />
          <Route path="plans" element={<Plan />} />
          <Route path="settings" element={<Settings />} />
        </Route>
      </Route>

      <Route path="/admin/dashboard" element={<ProtectedRoute allowedRoles={['company_owner']} />}>
        <Route element={<DeviceCheckedAdminDashboard />}>
          <Route index element={<AdminDashboardContent />} />
          <Route path="managers" element={<Managers />} />
          <Route path="users" element={<Users />} />
          <Route path="projects" element={<Projects />} />
          <Route path="attendance" element={<Attendance />} />
          <Route path="plans" element={<AdminPlans />} />
          <Route path="settings" element={<AdminSettings />} />
        </Route>
      </Route>

      <Route path="/register-company" element={<ProtectedRoute allowedRoles={['company_owner']} />}>
        <Route index element={<CompanyRegister />} />
      </Route>

      <Route path="/manager/dashboard" element={<ProtectedRoute allowedRoles={['manager']} />}>
        <Route index element={<DeviceCheckedManagerDashboard />} />
      </Route>

      <Route path="/user/dashboard" element={<ProtectedRoute allowedRoles={['user']} />}>
        <Route index element={<DeviceCheckedUserDashboard />} />
      </Route>

      <Route path="/unauthorized" element={<Unauthorized />} />
      <Route path="/device-not-supported" element={<DeviceNotSupported />} />
      <Route path="*" element={<Login />} />
    </Routes>
  );
};

export default AppRoute;
