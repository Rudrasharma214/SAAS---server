import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import Navbar from '../../components/Navbar';
import SideBar, { SidebarItem } from '../../components/SideBar';
import { useTheme } from '../../context/themeContext';
import {
  LayoutDashboard,
  Building,
  Users,
  FolderKanban,
  CalendarCheck,
  Package,
  Settings,
} from 'lucide-react';

const AdminDashboard = () => {
  const { isDarkMode } = useTheme();
  const navigate = useNavigate();
  const location = useLocation();

  // Determine which section is active from the URL
  const path = location.pathname;
  const activeSection =
    path.includes('managers') ? 'managers' :
    path.includes('users') ? 'users' :
    path.includes('projects') ? 'projects' :
    path.includes('attendance') ? 'attendance' :
    path.includes('plans') ? 'plans' :
    path.includes('settings') ? 'settings' :
    'dashboard';

  const sectionTitles = {
    dashboard: 'Dashboard',
    managers: 'Managers',
    users: 'Users',
    projects: 'Projects',
    attendance: 'Attendance',
    plans: 'Plans',
    settings: 'Settings',
  };

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <SideBar>
        <SidebarItem
          icon={<LayoutDashboard size={20} />}
          text="Dashboard"
          active={activeSection === 'dashboard'}
          onClick={() => navigate('/admin/dashboard')}
        />
        <SidebarItem
          icon={<Building size={20} />}
          text="Managers"
          active={activeSection === 'managers'}
          onClick={() => navigate('/admin/dashboard/managers')}
        />
        <SidebarItem
          icon={<Users size={20} />}
          text="Users"
          active={activeSection === 'users'}
          onClick={() => navigate('/admin/dashboard/users')}
        />
        <SidebarItem
          icon={<FolderKanban size={20} />}
          text="Projects"
          active={activeSection === 'projects'}
          onClick={() => navigate('/admin/dashboard/projects')}
        />
        <SidebarItem
          icon={<CalendarCheck size={20} />}
          text="Attendance"
          active={activeSection === 'attendance'}
          onClick={() => navigate('/admin/dashboard/attendance')}
        />
        <SidebarItem
          icon={<Package size={20} />}
          text="Plans"
          active={activeSection === 'plans'}
          onClick={() => navigate('/admin/dashboard/plans')}
        />
        <SidebarItem
          icon={<Settings size={20} />}
          text="Settings"
          active={activeSection === 'settings'}
          onClick={() => navigate('/admin/dashboard/settings')}
        />
      </SideBar>

      {/* Main Content */}
      <div className="flex flex-col flex-1 h-screen overflow-hidden">
        <Navbar title={sectionTitles[activeSection]} />
        <div
          className={`flex-1 h-full overflow-hidden ${
            isDarkMode
              ? 'bg-gradient-to-r to-stone-800 from-slate-700 text-zinc-100'
              : 'bg-gradient-to-r to-indigo-400 from-blue-400 text-white'
          }`}
        >
          {/* Nested routes will render here */}
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
