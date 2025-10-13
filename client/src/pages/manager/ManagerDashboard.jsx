import React, { useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import Sidebar_ME from '../../components/Sidebar_ME';
import { useTheme } from '../../context/themeContext';
import {
  LayoutDashboard,
  Search,
  Users,
  CheckSquare,
  User,
  Bell,
  FolderKanban,
} from 'lucide-react';

const ManagerDashboard = () => {
  const { isDarkMode } = useTheme();
  const navigate = useNavigate();
  const [activeSection, setActiveSection] = useState('dashboards');

  const handleSidebarItemClick = (itemId) => {
    setActiveSection(itemId);
    // You can expand this to navigate to different routes
    // For now, it just updates the active state
    switch (itemId) {
      case 'dashboard':
        navigate('/manager/dashboard');
        break;
      case 'projects':
        navigate('/manager/dashboard/projects');
        break;
      case 'employees':
        navigate('/manager/dashboard/employees');
        break;
      default:
        navigate('/manager/dashboard');
    }
  };

  const managerMenuItems = [
    {
      items: [
        { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
        { id: 'search', label: 'Search', icon: Search },
      ],
    },
    {
      title: 'Management',
      items: [
        { id: 'projects', label: 'Projects', icon: FolderKanban },
        { id: 'employees', label: 'My Team', icon: Users },
      ],
    },
    {
      title: 'Personal',
      items: [
        { id: 'tasks', label: 'My Tasks', icon: CheckSquare },
        { id: 'profile', label: 'Profile', icon: User },
        { id: 'notifications', label: 'Notifications', icon: Bell, notificationCount: 1 },
      ],
    },
  ];

  return (
    <div className={`flex h-screen p-4 gap-4 ${isDarkMode ? 'bg-gradient-to-r to-stone-800 from-slate-600' : 'bg-gradient-to-br from-slate-100 via-blue-100 to-indigo-100'}`}>
      <Sidebar_ME activeItem={activeSection} onItemClick={handleSidebarItemClick} menuSections={managerMenuItems} />
      <div className="flex-1 h-screen overflow-hidden">
        {/* Nested routes will render here */}
        <Outlet />
      </div>
    </div>
  );
};

export default ManagerDashboard;