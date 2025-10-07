import { useState } from 'react';
import Navbar from '../../components/Navbar';
import SideBar, { SidebarItem } from '../../components/SideBar';
import CompaniesList from '../../components/superAdmin/CompaniesList';
import CompanyDetail from '../../components/superAdmin/CompanyDetail';
import Plan from '../../components/superAdmin/Plan';
import { useTheme } from '../../context/themeContext';
import { LayoutDashboard, Building, Package, Settings } from 'lucide-react';

const SuperAdminDashboardContent = () => {
  const [activeSection, setActiveSection] = useState('dashboard');
  const [selectedCompany, setSelectedCompany] = useState(null);
  const { isDarkMode } = useTheme();

  

  const sectionTitles = {
    dashboard: 'Dashboard',
    companies: 'Companies',
    plans: 'Plans',
    settings: 'Settings',
  };

  const activeSectionTitle = sectionTitles[activeSection] || 'Dashboard';

  const renderContent = () => {
    const contentWrapperClass = `
    h-full w-full flex flex-col overflow-hidden
    ${isDarkMode ? 'text-zinc-200 bg-transparent' : 'text-white bg-transparent'} transition-all
   
  `;

    const innerWrapper = `
    flex-1 overflow-auto p-6
  `;

    switch (activeSection) {
      case 'companies':
        return (
          <div className={contentWrapperClass}>
            <div className={innerWrapper}>
              {selectedCompany ? (
                <CompanyDetail
                  companyId={selectedCompany}
                  onBack={() => setSelectedCompany(null)}
                />
              ) : (
                <CompaniesList onCompanyClick={setSelectedCompany} />
              )}
            </div>
          </div>
        );

      case 'plans':
        return (
          <div className={contentWrapperClass}>
            <div className={innerWrapper}>
              <Plan />
            </div>
          </div>
        );

      case 'settings':
        return (
          <div className={contentWrapperClass}>
            <div className={innerWrapper}>
              <h1 className={`text-2xl ${isDarkMode ? 'text-zinc-200' : 'text-gray-900'} font-bold mb-4`}>Settings</h1>
              <p className={isDarkMode ? 'text-zinc-400' : 'text-gray-600'}>Settings functionality coming soon...</p>
            </div>
          </div>
        );

      default:
        return (
          <div className={contentWrapperClass}>
            <div className={innerWrapper}>
              <h1 className={`text-2xl ${isDarkMode ? 'text-zinc-200' : 'text-gray-900'} font-bold mb-4`}>
                Super Admin Dashboard
              </h1>
              <p className={isDarkMode ? 'text-zinc-400' : 'text-gray-600'}>
                Welcome to the Super Admin Dashboard. Use the sidebar to navigate.
              </p>
            </div>
          </div>
        );
    }
  };

  return (
    <div className={`flex h-screen ${isDarkMode ? 'bg-gradient-to-br from-zinc-950 via-zinc-900 to-zinc-800' : 'bg-gradient-to-br from-zinc-100 via-zinc-200 to-zinc-300'}`}>
      {/* Sidebar */}
      <SideBar>
        <SidebarItem
          icon={<LayoutDashboard size={20} />}
          text="Dashboard"
          active={activeSection === 'dashboard'}
          onClick={() => setActiveSection('dashboard')}
        />
        <SidebarItem
          icon={<Building size={20} />}
          text="Companies"
          active={activeSection === 'companies'}
          onClick={() => {
            setActiveSection('companies');
            setSelectedCompany(null);
          }}
        />
        <SidebarItem
          icon={<Package size={20} />}
          text="Plans"
          active={activeSection === 'plans'}
          onClick={() => setActiveSection('plans')}
        />
        <SidebarItem
          icon={<Settings size={20} />}
          text="Settings"
          active={activeSection === 'settings'}
          onClick={() => setActiveSection('settings')}
        />
      </SideBar>

      {/* Main Area */}
      <div className="flex flex-col flex-1 h-screen overflow-hidden">
        {/* Navbar is separated and dynamic */}
        <Navbar title={activeSectionTitle} />
        <div className={`flex-1 h-full overflow-hidden
          ${isDarkMode ? 'bg-gradient-to-r to-stone-800 from-slate-700' : 'bg-gradient-to-r to-indigo-400 from-blue-400'}`}>
          {renderContent()}
        </div>
      </div>
    </div>
  );
};

const SuperAdminDashboard = () => {
  return <SuperAdminDashboardContent />;
};

export default SuperAdminDashboard;
