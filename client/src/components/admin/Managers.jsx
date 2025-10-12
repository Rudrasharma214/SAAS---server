import React, { useState, useEffect } from 'react';
import { useTheme } from '../../context/themeContext';
import { getAllManagers, createManager } from '../../services/adminServices';
import { UserPlus, Edit, Trash2 } from 'lucide-react';
import toast from 'react-hot-toast';
import CreateManagerModal from './CreateManagerModal';

const Managers = () => {
  const { isDarkMode } = useTheme();
  const [managers, setManagers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showCreateModal, setShowCreateModal] = useState(false);

  useEffect(() => {
    fetchManagers();
  }, []);

  const fetchManagers = async () => {
    setLoading(true);
    try {
      const response = await getAllManagers();
      console.log(response.data)
      setManagers(response.data || []);
    } catch (error) {
      console.error("Error fetching managers:", error);
      // toast.error(error.response?.data?.message || 'Failed to fetch managers.');
      setManagers([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="h-full w-full flex flex-col overflow-hidden bg-transparent transition-all">
        <div className="flex-1 overflow-auto p-6">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
            <div>
              <h1 className={`text-2xl ${isDarkMode ? 'text-zinc-200' : 'text-gray-900'} font-bold`}>
                Manage Managers
              </h1>
              <p className={isDarkMode ? 'text-zinc-400' : 'text-gray-600'}>
                View, create, and manage manager accounts.
              </p>
            </div>
            <button
              onClick={() => setShowCreateModal(true)}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-semibold shadow-lg transition-all duration-300 ${
                isDarkMode
                  ? 'bg-gradient-to-r from-blue-600 to-cyan-600 text-white hover:shadow-cyan-500/30'
                  : 'bg-gradient-to-r from-blue-500 to-cyan-500 text-white hover:shadow-blue-300/50 hover:scale-105'
              }`}
            >
              <UserPlus size={18} /> Create Manager
            </button>
          </div>

          {/* Table Container */}
          <div className={`rounded-xl border overflow-hidden ${isDarkMode ? 'bg-zinc-800/50 border-zinc-700/50' : 'bg-white border-gray-200 shadow-lg shadow-gray-200/20'}`}>
            {loading ? (
              <div className="text-center py-16">
                <div className={`inline-block animate-spin rounded-full h-10 w-10 border-b-2 ${isDarkMode ? 'border-cyan-400' : 'border-blue-500'}`}></div>
                <p className={`mt-4 text-lg font-medium ${isDarkMode ? 'text-zinc-400' : 'text-gray-500'}`}>Loading managers...</p>
              </div>
            ) : managers.length === 0 ? (
              <div className="text-center py-16">
                <UserPlus size={40} className={`mx-auto mb-4 ${isDarkMode ? 'text-zinc-600' : 'text-gray-400'}`} />
                <p className={`text-lg font-medium ${isDarkMode ? 'text-zinc-400' : 'text-gray-600'}`}>No managers found.</p>
                <p className={`mt-1 text-sm ${isDarkMode ? 'text-zinc-500' : 'text-gray-500'}`}>Get started by creating a new manager.</p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className={isDarkMode ? 'bg-zinc-900/50 border-b border-zinc-700' : 'bg-gray-50 border-b border-gray-200'}>
                      <th className={`px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider ${isDarkMode ? 'text-zinc-400' : 'text-gray-600'}`}>Name</th>
                      <th className={`px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider ${isDarkMode ? 'text-zinc-400' : 'text-gray-600'}`}>Email</th>
                      <th className={`px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider ${isDarkMode ? 'text-zinc-400' : 'text-gray-600'}`}>Status</th>
                      <th className={`px-6 py-3 text-center text-xs font-semibold uppercase tracking-wider ${isDarkMode ? 'text-zinc-400' : 'text-gray-600'}`}>Actions</th>
                    </tr>
                  </thead>
                  <tbody className={isDarkMode ? 'divide-y divide-zinc-700/50' : 'divide-y divide-gray-200'}>
                    {managers.map((manager) => (
                      <tr key={manager._id} className={`transition-colors ${isDarkMode ? 'hover:bg-zinc-800' : 'hover:bg-gray-50'}`}>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center gap-3">
                            <img
                              src={`https://ui-avatars.com/api/?name=${manager.name}&background=${isDarkMode ? '3f3f46' : 'e0e7ff'}&color=${isDarkMode ? 'f4f4f5' : '4338ca'}&bold=true`}
                              alt="Avatar"
                              className="w-9 h-9 rounded-full"
                            />
                            <span className={`font-medium ${isDarkMode ? 'text-zinc-200' : 'text-gray-900'}`}>{manager.name}</span>
                          </div>
                        </td>
                        <td className={`px-6 py-4 whitespace-nowrap ${isDarkMode ? 'text-zinc-300' : 'text-gray-700'}`}>{manager.email}</td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold ${
                            manager.isRegistered
                              ? (isDarkMode ? 'bg-green-500/10 text-green-400' : 'bg-green-100 text-green-800')
                              : (isDarkMode ? 'bg-yellow-500/10 text-yellow-400' : 'bg-yellow-100 text-yellow-800')
                          }`}>
                            <div className={`w-1.5 h-1.5 rounded-full ${manager.isRegistered ? 'bg-green-500' : 'bg-yellow-500'}`}></div>
                            {manager.isRegistered ? 'Registered' : 'Pending'}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-center">
                          <div className="flex items-center justify-center gap-2">
                            <button className={`p-2 rounded-md transition-colors ${isDarkMode ? 'text-zinc-400 hover:bg-zinc-700 hover:text-white' : 'text-gray-500 hover:bg-gray-100 hover:text-blue-600'}`} title="Edit">
                              <Edit size={16} />
                            </button>
                            <button className={`p-2 rounded-md transition-colors ${isDarkMode ? 'text-zinc-400 hover:bg-zinc-700 hover:text-red-500' : 'text-gray-500 hover:bg-gray-100 hover:text-red-600'}`} title="Delete">
                              <Trash2 size={16} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </div>

      <CreateManagerModal
        isOpen={showCreateModal}
        onClose={() => setShowCreateModal(false)}
        onManagerCreated={fetchManagers}
      />
    </>
  );
};

export default Managers;
