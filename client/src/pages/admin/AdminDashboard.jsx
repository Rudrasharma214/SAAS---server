import { useState } from "react";
import SideBar, { SidebarItem } from "../../components/SideBar";
import { useTheme } from "../../context/themeContext";
import {
  LayoutDashboard,
  Building,
  Users,
  FolderKanban,
  CalendarCheck,
  Package,
  Settings,
} from "lucide-react";

const AdminDashboardContent = () => {
  const [activeSection, setActiveSection] = useState("dashboard");
  const [selectedCompany, setSelectedCompany] = useState(null);
  const { current: theme, isDarkMode } = useTheme();

  const renderContent = () => {
    const contentWrapperClass = `
      relative h-full flex flex-col overflow-hidden
      bg-gradient-to-r from-zinc-900 via-zinc-800 to-zinc-950 text-zinc-100 shadow-inner rounded-2xl m-4 p-6 transition-all duration-500
    `;

    switch (activeSection) {
      case "managers":
        return (
          <div className={contentWrapperClass}>
            <h1 className="text-2xl font-semibold mb-2">Users</h1>
            <p className={theme.textSecondary}>
              Manager management section coming soon...
            </p>
          </div>
        );

      case "users":
        return (
          <div className={contentWrapperClass}>
            <h1 className="text-2xl font-semibold mb-2">Users</h1>
            <p className={theme.textSecondary}>
              User management section coming soon...
            </p>
          </div>
        );

      case "projects":
        return (
          <div className={contentWrapperClass}>
            <h1 className="text-2xl font-semibold mb-2">Projects</h1>
            <p className={theme.textSecondary}>
              Manage and track your company projects here.
            </p>
          </div>
        );

      case "attendance":
        return (
          <div className={contentWrapperClass}>
            <h1 className="text-2xl font-semibold mb-2">Attendance</h1>
            <p className={theme.textSecondary}>
              Attendance tracking and reports will appear here.
            </p>
          </div>
        );

      case "plans":
        return (
          <div className={contentWrapperClass}>
            <h1 className="text-2xl font-semibold mb-2">Settings</h1>
            <p className={theme.textSecondary}>
              Plan functionality coming soon...
            </p>
          </div>
        );

      case "settings":
        return (
          <div className={contentWrapperClass}>
            <h1 className="text-2xl font-semibold mb-2">Settings</h1>
            <p className={theme.textSecondary}>
              Settings functionality coming soon...
            </p>
          </div>
        );

      default:
        return (
          <div className={contentWrapperClass}>
            <h1 className="text-2xl font-semibold mb-2">
              Admin Dashboard
            </h1>
            <p className={theme.textSecondary}>
              Welcome to the Admin Dashboard. Use the sidebar to
              navigate.
            </p>
          </div>
        );
    }
  };

  return (
    <div
      className={`flex h-screen relative transition-colors duration-700 ${theme.background}`}
    >
      {/* Sidebar */}
      <SideBar>
        <SidebarItem
          icon={<LayoutDashboard size={20} />}
          text="Dashboard"
          active={activeSection === "dashboard"}
          onClick={() => setActiveSection("dashboard")}
        />
        <SidebarItem
          icon={<Building size={20} />}
          text="Managers"
          active={activeSection === "managers"}
          onClick={() => {
            setActiveSection("managers");
            setSelectedCompany(null);
          }}
        />
        <SidebarItem
          icon={<Users size={20} />}
          text="Users"
          active={activeSection === "users"}
          onClick={() => setActiveSection("users")}
        />
        <SidebarItem
          icon={<FolderKanban size={20} />}
          text="Projects"
          active={activeSection === "projects"}
          onClick={() => setActiveSection("projects")}
        />
        <SidebarItem
          icon={<CalendarCheck size={20} />}
          text="Attendance"
          active={activeSection === "attendance"}
          onClick={() => setActiveSection("attendance")}
        />
        <SidebarItem
          icon={<Package size={20} />}
          text="Plans"
          active={activeSection === "plans"}
          onClick={() => setActiveSection("plans")}
        />
        <SidebarItem
          icon={<Settings size={20} />}
          text="Settings"
          active={activeSection === "settings"}
          onClick={() => setActiveSection("settings")}
        />
      </SideBar>

      {/* Main Content */}
      <main className="flex-1 flex flex-col overflow-hidden">{renderContent()}</main>
    </div>
  );
};

const AdminDashboard = () => {
  return <AdminDashboardContent />;
};

export default AdminDashboard;
