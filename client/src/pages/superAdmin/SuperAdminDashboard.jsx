import React, { useState } from 'react';
import SideBar, { SidebarItem } from '../../components/SideBar';
import CompaniesList from '../../components/superAdmin/CompaniesList';
import CompanyDetail from '../../components/superAdmin/CompanyDetail';
import Plan from '../../components/superAdmin/Plan';
import { useTheme } from '../../context/themeContext';
import { LayoutDashboard, Building, Users, Package, Settings } from 'lucide-react';

const SuperAdminDashboardContent = () => {
  const [activeSection, setActiveSection] = useState('dashboard');
  const [selectedCompany, setSelectedCompany] = useState(null);
  const { current: theme } = useTheme();

  const renderContent = () => {
    const contentWrapperClass = `
      relative h-full flex flex-col overflow-hidden
      ${theme.text} ${theme.border} shadow-sm rounded-lg m-4
      ${theme.contentBg}
      ${theme.glowEffects}
    `;

    switch (activeSection) {
      case 'companies':
        return (
          <div className={contentWrapperClass}>
            <div className="p-6 flex-1 overflow-auto">
              {selectedCompany ? (
                <CompanyDetail companyId={selectedCompany} onBack={() => setSelectedCompany(null)} />
              ) : (
                <CompaniesList onCompanyClick={setSelectedCompany} />
              )}
            </div>
          </div>
        );
      case 'plans':
        return (
          <div className={contentWrapperClass}>
            <div className="p-6 flex-1 overflow-auto">
              <Plan />
            </div>
          </div>
        );
      case 'settings':
        return (
          <div className={contentWrapperClass}>
            <div className="p-8">
              <h1 className={`text-2xl ${theme.textPrimary} font-bold mb-4`}>Settings</h1>
              <p className={theme.textSecondary}>Settings functionality coming soon...</p>
            </div>
          </div>
        );
      default:
        return (
          <div className={contentWrapperClass}>
            <div className="p-8">
              <h1 className={`text-2xl ${theme.textPrimary} font-bold mb-4`}>Super Admin Dashboard</h1>
              <p className={theme.textSecondary}>Welcome to the Super Admin Dashboard. Use the sidebar to navigate.</p>
            </div>
          </div>
        );
    }
  };

  return (
    <div className={`flex h-screen ${theme.background}`}>
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
      <main className="flex-1 flex flex-col">
        {renderContent()}
      </main>
    </div>
  );
};

const SuperAdminDashboard = () => {
  return <SuperAdminDashboardContent />;
};

export default SuperAdminDashboard;