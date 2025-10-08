import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import { useTheme } from '../../context/themeContext';
import Navbar from '../../components/Navbar';
import SideBar, { SidebarItem } from '../../components/SideBar';
import { LayoutDashboard, Building, Package, Settings } from 'lucide-react';

const SuperAdminDashboard = () => {
  const { isDarkMode } = useTheme();
  const navigate = useNavigate();
  const location = useLocation();

  // Determine active section based on URL
  const path = location.pathname;
  const activeSection =
    path.includes('companies') ? 'companies' :
    path.includes('plans') ? 'plans' :
    path.includes('settings') ? 'settings' :
    'dashboard';

  const sectionTitles = {
    dashboard: 'Dashboard',
    companies: 'Companies',
    plans: 'Plans',
    settings: 'Settings',
  };

  return (
    <div
      className={`flex h-screen ${
        isDarkMode
          ? 'bg-gradient-to-br from-zinc-950 via-zinc-900 to-zinc-800'
          : 'bg-gradient-to-br from-zinc-100 via-zinc-200 to-zinc-300'
      }`}
    >
      {/* Sidebar */}
      <SideBar>
        <SidebarItem
          icon={<LayoutDashboard size={20} />}
          text="Dashboard"
          active={activeSection === 'dashboard'}
          onClick={() => navigate('/superadmin/dashboard')}
        />
        <SidebarItem
          icon={<Building size={20} />}
          text="Companies"
          active={activeSection === 'companies'}
          onClick={() => navigate('/superadmin/dashboard/companies')}
        />
        <SidebarItem
          icon={<Package size={20} />}
          text="Plans"
          active={activeSection === 'plans'}
          onClick={() => navigate('/superadmin/dashboard/plans')}
        />
        <SidebarItem
          icon={<Settings size={20} />}
          text="Settings"
          active={activeSection === 'settings'}
          onClick={() => navigate('/superadmin/dashboard/settings')}
        />
      </SideBar>

      {/* Main Area */}
      <div className="flex flex-col flex-1 h-screen overflow-hidden">
        <Navbar title={sectionTitles[activeSection]} />
        <div
          className={`flex-1 h-full overflow-hidden ${
            isDarkMode
              ? 'bg-gradient-to-r to-stone-800 from-slate-700'
              : 'bg-gradient-to-r to-indigo-400 from-blue-400'
          }`}
        >
          {/* Nested Routes Render Here */}
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default SuperAdminDashboard;
