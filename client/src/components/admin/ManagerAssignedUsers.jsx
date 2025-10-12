import React, { useState, useEffect } from 'react';
import { useTheme } from '../../context/themeContext';
import { getUsersByManager } from '../../services/adminServices';
import { X, Users, UserX, Edit, Trash2 } from 'lucide-react';
import toast from 'react-hot-toast';

const ManagerAssignedUsers = ({ isOpen, onClose, manager }) => {
  const { isDarkMode } = useTheme();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isOpen && manager?._id) {
      const fetchUsers = async () => {
        setLoading(true);
        try {
          const response = await getUsersByManager(manager._id);
          setUsers(response.data || []);
        } catch (error) {
          console.error(`Error fetching users for manager ${manager._id}:`, error);
          toast.error('Failed to fetch assigned users.');
          setUsers([]);
        } finally {
          setLoading(false);
        }
      };
      fetchUsers();
    }
  }, [isOpen, manager]);

  if (!isOpen || !manager) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/60 backdrop-blur-sm z-50 p-4">
      <div
        className={`w-full max-w-2xl rounded-2xl shadow-2xl relative ${isDarkMode ? 'bg-zinc-900 border border-zinc-700' : 'bg-white'}`}
      >
        {/* Modal Header */}
        <div className={`p-6 border-b ${isDarkMode ? 'border-zinc-700' : 'border-gray-200'}`}>
          <button
            onClick={onClose}
            className={`absolute top-4 right-4 p-2 rounded-lg transition-colors ${isDarkMode ? 'text-zinc-400 hover:bg-zinc-800' : 'text-gray-400 hover:bg-gray-100'}`}
          >
            <X size={20} />
          </button>
          <div className="flex items-center gap-3">
            <div
              className={`p-3 rounded-xl ${isDarkMode ? 'bg-gradient-to-br from-blue-500/10 to-cyan-500/10' : 'bg-gradient-to-br from-blue-50 to-cyan-50'}`}
            >
              <Users size={24} className={isDarkMode ? 'text-cyan-400' : 'text-blue-600'} />
            </div>
            <div>
              <h2 className={`text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                Assigned Employees
              </h2>
              <p className={`text-sm ${isDarkMode ? 'text-zinc-400' : 'text-gray-600'}`}>
                Showing employees managed by <span className="font-semibold">{manager.name}</span>
              </p>
            </div>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-6 max-h-[60vh] overflow-y-auto">
          {loading ? (
            <div className="flex flex-col items-center justify-center py-10">
              <div
                className={`animate-spin rounded-full h-10 w-10 border-b-2 ${isDarkMode ? 'border-cyan-400' : 'border-blue-500'}`}
              ></div>
              <p
                className={`mt-4 text-lg font-medium ${isDarkMode ? 'text-zinc-400' : 'text-gray-500'}`}
              >
                Loading employees...
              </p>
            </div>
          ) : users.length === 0 ? (
            <div className="text-center py-10">
              <UserX
                size={40}
                className={`mx-auto mb-4 ${isDarkMode ? 'text-zinc-600' : 'text-gray-400'}`}
              />
              <p
                className={`text-lg font-medium ${isDarkMode ? 'text-zinc-400' : 'text-gray-600'}`}
              >
                No employees assigned.
              </p>
              <p className={`mt-1 text-sm ${isDarkMode ? 'text-zinc-500' : 'text-gray-500'}`}>
                This manager does not have any employees assigned to them yet.
              </p>
            </div>
          ) : (
            <ul className={`divide-y ${isDarkMode ? 'divide-zinc-700/50' : 'divide-gray-200'}`}>
              {users.map((user) => (
                <li key={user._id} className="flex items-center justify-between py-3">
                  <div className="flex items-center gap-3">
                    <img
                      src={`https://ui-avatars.com/api/?name=${user.name}&background=${isDarkMode ? '3f3f46' : 'e0e7ff'}&color=${isDarkMode ? 'f4f4f5' : '4338ca'}&bold=true`}
                      alt="Avatar"
                      className="w-9 h-9 rounded-full"
                    />
                    <div>
                      <p
                        className={`font-medium ${isDarkMode ? 'text-zinc-200' : 'text-gray-900'}`}
                      >
                        {user.name}
                      </p>
                      <p className={`text-sm ${isDarkMode ? 'text-zinc-400' : 'text-gray-500'}`}>
                        {user.email}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <span
                      className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold ${
                        user.isRegistered
                          ? isDarkMode
                            ? 'bg-green-500/10 text-green-400'
                            : 'bg-green-100 text-green-800'
                          : isDarkMode
                            ? 'bg-yellow-500/10 text-yellow-400'
                            : 'bg-yellow-100 text-yellow-800'
                      }`}
                    >
                      <div
                        className={`w-1.5 h-1.5 rounded-full ${user.isRegistered ? 'bg-green-500' : 'bg-yellow-500'}`}
                      ></div>
                      {user.isRegistered ? 'Registered' : 'Pending'}
                    </span>
                    <div className="flex items-center gap-1">
                      <button
                        className={`p-2 rounded-md transition-colors ${isDarkMode ? 'text-zinc-400 hover:bg-zinc-700 hover:text-white' : 'text-gray-500 hover:bg-gray-100 hover:text-blue-600'}`}
                        title="Edit"
                      >
                        <Edit size={16} />
                      </button>
                      <button
                        className={`p-2 rounded-md transition-colors ${isDarkMode ? 'text-zinc-400 hover:bg-zinc-700 hover:text-red-500' : 'text-gray-500 hover:bg-gray-100 hover:text-red-600'}`}
                        title="Delete"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Modal Footer */}
        <div
          className={`flex justify-end p-4 border-t ${isDarkMode ? 'border-zinc-700' : 'border-gray-200'}`}
        >
          <button
            type="button"
            onClick={onClose}
            className={`px-6 py-2.5 rounded-lg font-semibold transition-all ${isDarkMode ? 'bg-zinc-800 hover:bg-zinc-700 text-zinc-200' : 'bg-gray-100 hover:bg-gray-200 text-gray-700'}`}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default ManagerAssignedUsers;
