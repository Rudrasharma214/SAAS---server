import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import { useTheme } from '../../context/themeContext';
import Sidebar_ME, { Sidebar_MEItem } from '../../components/Sidebar_ME.jsx';
import { LayoutDashboard, Building, Package, Settings } from 'lucide-react';

const ManagerDashboard = () => {
  const { isDarkMode } = useTheme();
  const navigate = useNavigate();
  const location = useLocation();

  // Determine active section based on URL
  const path = location.pathname;
  const activeSection = path.includes('attendance')
    ? 'attendance'
    : path.includes('projects')
      ? 'projects'
      : 'dashboard';


  return (
    <div
      className={`flex h-screen ${
        isDarkMode
          ? 'bg-gradient-to-r to-stone-800 from-slate-600'
          : 'bg-gradient-to-br from-slate-100 via-blue-100 to-indigo-100'
      }`}
    >
      {/* Sidebar */}
      <Sidebar_ME>
        <Sidebar_MEItem
          icon={<LayoutDashboard size={20} />}
          text="Dashboard"
          active={activeSection === 'dashboard'}
          onClick={() => navigate('/manager/dashboard')}
        />
        <Sidebar_MEItem
          icon={<Building size={20} />}
          text="Attendance"
          active={activeSection === 'attendance'}
          onClick={() => navigate('/manager/dashboard/attendance')}
        />
        <Sidebar_MEItem
          icon={<Package size={20} />}
          text="Projects"
          active={activeSection === 'projects'}
          onClick={() => navigate('/manager/dashboard/projects')}
        />
      </Sidebar_ME>

      {/* Main Area */}
      <div className="flex flex-col flex-1 h-screen overflow-hidden">
        <div
          className={`flex-1 overflow-y-auto ${
            isDarkMode
              ? 'bg-gradient-to-r to-stone-800 from-slate-600'
              : 'bg-gradient-to-br from-slate-100 via-blue-100 to-indigo-100'
          }`}
        >
          {/* Nested Routes Render Here */}
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default ManagerDashboard;
