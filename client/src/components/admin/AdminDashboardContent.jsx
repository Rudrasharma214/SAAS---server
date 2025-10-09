import { useTheme } from '../../context/themeContext';

const AdminDashboardContent = () => {
  const { isDarkMode } = useTheme();

  return (
    <div className="h-full w-full flex flex-col overflow-hidden bg-transparent transition-all">
      <div className="flex-1 overflow-auto p-6">
        <h1 className={`text-2xl ${isDarkMode ? 'text-zinc-200' : 'text-gray-900'} font-bold mb-4`}>
          Admin Dashboard
        </h1>
        <p className={isDarkMode ? 'text-zinc-400' : 'text-gray-600'}>
          Welcome to the Admin Dashboard. Use the sidebar to navigate.
        </p>
      </div>
    </div>
  );
};

export default AdminDashboardContent;
