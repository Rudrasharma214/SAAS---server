import React, { useState, useEffect } from 'react';
import { useTheme } from '../../context/themeContext';
import { getManagerEmployees } from '../../services/managerServices';
import { Users, Mail, CalendarClock, UserCheck, UserX } from 'lucide-react';
import toast from 'react-hot-toast';

const ManagerEmployee = () => {
  const { isDarkMode } = useTheme();
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchEmployees();
  }, []);

  const fetchEmployees = async () => {
    setLoading(true);
    try {
      const response = await getManagerEmployees();
      setEmployees(response.data || []);
    } catch (error) {
      console.error("Error fetching manager's employees:", error);
      toast.error(error.message || 'Failed to fetch employees.');
      setEmployees([]);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    return new Date(dateString).toLocaleDateString('en-IN', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
    });
  };

  return (
    <div className="h-full w-full flex flex-col overflow-hidden bg-transparent transition-all">
      <div className="flex-1 overflow-auto p-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
          <div>
            <h1 className={`text-2xl ${isDarkMode ? 'text-cyan-100' : 'text-cyan-900'} font-bold`}>
              My Team
            </h1>
            <p className={isDarkMode ? 'text-cyan-300' : 'text-sky-700'}>
              View and manage all employees assigned to you.
            </p>
          </div>
        </div>

        <div className={`rounded-xl border overflow-hidden ${isDarkMode ? 'bg-slate-700/20 border-cyan-700/50' : 'bg-white/80 border-cyan-200 shadow-lg shadow-cyan-100/30'}`}>
          {loading ? (
            <div className="text-center py-16">
              <div className={`inline-block animate-spin rounded-full h-10 w-10 border-b-2 ${isDarkMode ? 'border-cyan-400' : 'border-cyan-600'}`}></div>
              <p className={`mt-4 text-lg font-medium ${isDarkMode ? 'text-cyan-300' : 'text-sky-700'}`}>Loading employees...</p>
            </div>
          ) : employees.length === 0 ? (
            <div className="text-center py-16">
              <Users size={40} className={`mx-auto mb-4 ${isDarkMode ? 'text-cyan-600' : 'text-cyan-400'}`} />
              <p className={`text-lg font-medium ${isDarkMode ? 'text-cyan-300' : 'text-sky-700'}`}>No employees found.</p>
              <p className={`mt-1 text-sm ${isDarkMode ? 'text-cyan-400' : 'text-sky-600'}`}>You have not been assigned any team members yet.</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className={isDarkMode ? 'bg-slate-800/50 border-b border-cyan-700/50' : 'bg-cyan-50/50 border-b border-cyan-200'}>
                    <th className={`px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider ${isDarkMode ? 'text-cyan-300' : 'text-cyan-800'}`}>Employee</th>
                    <th className={`px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider ${isDarkMode ? 'text-cyan-300' : 'text-cyan-800'}`}>Email</th>
                    <th className={`px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider ${isDarkMode ? 'text-cyan-300' : 'text-cyan-800'}`}>Joined</th>
                    <th className={`px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider ${isDarkMode ? 'text-cyan-300' : 'text-cyan-800'}`}>Status</th>
                    <th className={`px-6 py-3 text-center text-xs font-semibold uppercase tracking-wider ${isDarkMode ? 'text-cyan-300' : 'text-cyan-800'}`}>Actions</th>
                  </tr>
                </thead>
                <tbody className={isDarkMode ? 'divide-y divide-cyan-800/50' : 'divide-y divide-cyan-200'}>
                  {employees.map((employee) => (
                    <tr key={employee._id} className={`transition-colors ${isDarkMode ? 'hover:bg-slate-700/40' : 'hover:bg-cyan-50/70'}`}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className={`w-10 h-10 flex items-center justify-center rounded-full ${isDarkMode ? 'bg-cyan-700/50' : 'bg-cyan-100'}`}>
                            <span className={`text-lg font-bold ${isDarkMode ? 'text-cyan-200' : 'text-cyan-700'}`}>
                              {employee.name.charAt(0).toUpperCase()}
                            </span>
                          </div>
                          <div className="ml-4">
                            <p className={`font-medium ${isDarkMode ? 'text-cyan-100' : 'text-cyan-900'}`}>{employee.name}</p>
                          </div>
                        </div>
                      </td>
                      <td className={`px-6 py-4 whitespace-nowrap ${isDarkMode ? 'text-cyan-200' : 'text-sky-800'}`}>
                        <div className="flex items-center">
                          <Mail size={16} className="mr-2" />
                          {employee.email}
                        </div>
                      </td>
                      <td className={`px-6 py-4 whitespace-nowrap ${isDarkMode ? 'text-cyan-200' : 'text-sky-800'}`}>
                        <div className="flex items-center">
                          <CalendarClock size={16} className="mr-2" />
                          {formatDate(employee.createdAt)}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {employee.isRegistered ? (
                          <div className={`flex items-center px-3 py-1 rounded-full text-xs ${isDarkMode ? 'bg-emerald-900/30 text-emerald-300' : 'bg-emerald-100 text-emerald-800'}`}>
                            <UserCheck size={14} className="mr-1" />
                            Registered
                          </div>
                        ) : (
                          <div className={`flex items-center px-3 py-1 rounded-full text-xs ${isDarkMode ? 'bg-amber-900/30 text-amber-300' : 'bg-amber-100 text-amber-800'}`}>
                            <UserX size={14} className="mr-1" />
                            Pending
                          </div>
                        )}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-center">
                        <button 
                          className={`px-3 py-1 rounded-md text-sm font-medium ${
                            isDarkMode 
                              ? 'bg-cyan-700/50 text-cyan-200 hover:bg-cyan-700/80' 
                              : 'bg-cyan-100 text-cyan-700 hover:bg-cyan-200'
                          } transition-colors`}
                          onClick={() => window.alert(`View details for ${employee.name}`)}
                        >
                          View Details
                        </button>
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
  );
};

export default ManagerEmployee;
