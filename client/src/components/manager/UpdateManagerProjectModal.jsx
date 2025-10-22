import React, { useState, useEffect } from 'react';
import { useTheme } from '../../context/themeContext';
import { updateProject } from '../../services/projectServices';
import { getManagerEmployees, addTeamMembersToProject } from '../../services/managerServices';
import { X, Users, Clock, Check, AlertCircle } from 'lucide-react';
import toast from 'react-hot-toast';

const UpdateManagerProjectModal = ({ isOpen, onClose, onProjectUpdated, project }) => {
  const { isDarkMode } = useTheme();
  const [employees, setEmployees] = useState([]);
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [status, setStatus] = useState('');
  const [loading, setLoading] = useState(false);
  const [employeesLoading, setEmployeesLoading] = useState(false);
  
  const statusOptions = [
    { value: 'planned', label: 'Planned', icon: <Clock size={16} className={isDarkMode ? 'text-yellow-300' : 'text-yellow-600'} /> },
    { value: 'in-progress', label: 'In Progress', icon: <AlertCircle size={16} className={isDarkMode ? 'text-orange-300' : 'text-orange-600'} /> },
    { value: 'completed', label: 'Completed', icon: <Check size={16} className={isDarkMode ? 'text-green-300' : 'text-green-600'} /> },
    { value: 'on-hold', label: 'On Hold', icon: <AlertCircle size={16} className={isDarkMode ? 'text-red-300' : 'text-red-600'} /> }
  ];

  useEffect(() => {
    if (project) {
      setStatus(project.status || 'planned');
      
      // If project has team members, set them as selected
      if (project.teamMembers && Array.isArray(project.teamMembers)) {
        const memberIds = project.teamMembers.map(member => 
          typeof member === 'object' ? member._id : member
        );
        setSelectedUsers(memberIds);
      }
    }
  }, [project]);

  useEffect(() => {
    if (isOpen) {
      fetchEmployees();
    }
  }, [isOpen]);

  const fetchEmployees = async () => {
    setEmployeesLoading(true);
    try {
      const response = await getManagerEmployees();
      setEmployees(response.data || []);
    } catch (error) {
      console.error('Error fetching employees:', error);
      toast.error('Failed to load employees.');
    } finally {
      setEmployeesLoading(false);
    }
  };

  const handleUserToggle = (userId) => {
    setSelectedUsers(prevSelected => {
      if (prevSelected.includes(userId)) {
        return prevSelected.filter(id => id !== userId);
      } else {
        return [...prevSelected, userId];
      }
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!project?._id) return;

    setLoading(true);
    const loadingToast = toast.loading('Updating project...');
    
    try {
      // Combine status and team members in a single request
      const includes = {
        users: selectedUsers,
        status: status
      };
      
      // Send both status and users in a single API call
      await addTeamMembersToProject(project._id, includes);
      
      toast.success('Project updated successfully!', { id: loadingToast });
      onProjectUpdated();
      onClose();
    } catch (error) {
      console.error('Error updating project:', error);
      toast.error(error.response?.data?.message || 'Failed to update project.', { id: loadingToast });
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/60 backdrop-blur-sm z-50 p-4">
      <div className={`w-full max-w-lg rounded-2xl shadow-2xl relative ${isDarkMode ? 'bg-zinc-900 border border-zinc-700' : 'bg-white'}`}>
        <div className={`p-6 border-b ${isDarkMode ? 'border-zinc-700' : 'border-gray-200'}`}>
          <button onClick={onClose} className={`absolute top-4 right-4 p-2 rounded-lg transition-colors ${isDarkMode ? 'text-zinc-400 hover:bg-zinc-800' : 'text-gray-400 hover:bg-gray-100'}`}>
            <X size={20} />
          </button>
          <div className="flex items-center gap-3">
            <div className={`p-3 rounded-xl ${isDarkMode ? 'bg-gradient-to-br from-blue-500/10 to-cyan-500/10' : 'bg-gradient-to-br from-blue-50 to-cyan-50'}`}>
              <Users size={24} className={isDarkMode ? 'text-cyan-400' : 'text-blue-600'} />
            </div>
            <div>
              <h2 className={`text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Update Project</h2>
              <p className={`text-sm ${isDarkMode ? 'text-zinc-400' : 'text-gray-600'}`}>Update team members and status for {project?.name}</p>
            </div>
          </div>
        </div>
        <form onSubmit={handleSubmit} className="p-6 space-y-5">
          {/* Project Status */}
          <div>
            <label className={`block text-sm font-medium mb-2 ${isDarkMode ? 'text-gray-200' : 'text-gray-700'}`}>Project Status</label>
            <div className="flex flex-wrap gap-2">
              {statusOptions.map(option => (
                <button 
                  key={option.value}
                  type="button"
                  onClick={() => setStatus(option.value)}
                  className={`flex items-center gap-1.5 px-3 py-2 rounded-lg border transition-colors ${
                    status === option.value
                      ? isDarkMode 
                        ? 'border-cyan-500 bg-cyan-500/10 text-cyan-300'
                        : 'border-blue-500 bg-blue-50 text-blue-700'
                      : isDarkMode
                        ? 'border-zinc-700 bg-zinc-800/50 text-zinc-400 hover:border-zinc-600'
                        : 'border-gray-200 bg-gray-50 text-gray-600 hover:border-gray-300'
                  }`}
                >
                  {option.icon}
                  {option.label}
                </button>
              ))}
            </div>
          </div>
          
          {/* Team Members */}
          <div>
            <label className={`block text-sm font-medium mb-2 ${isDarkMode ? 'text-gray-200' : 'text-gray-700'}`}>Team Members</label>
            
            {employeesLoading ? (
              <div className={`rounded-lg p-4 ${isDarkMode ? 'bg-zinc-800' : 'bg-gray-50'}`}>
                <div className={`inline-block animate-spin rounded-full h-6 w-6 border-b-2 ${isDarkMode ? 'border-cyan-400' : 'border-blue-600'}`}></div>
                <span className={`ml-3 ${isDarkMode ? 'text-zinc-400' : 'text-gray-600'}`}>Loading employees...</span>
              </div>
            ) : employees.length === 0 ? (
              <div className={`rounded-lg p-4 text-center ${isDarkMode ? 'bg-zinc-800' : 'bg-gray-50'}`}>
                <p className={isDarkMode ? 'text-zinc-400' : 'text-gray-600'}>No employees available to assign.</p>
              </div>
            ) : (
              <div className={`max-h-60 overflow-y-auto rounded-lg border ${isDarkMode ? 'border-zinc-700' : 'border-gray-200'}`}>
                {employees.map(employee => (
                  <div 
                    key={employee._id} 
                    className={`flex items-center justify-between p-3 ${
                      isDarkMode 
                        ? 'border-b border-zinc-700 hover:bg-zinc-800'
                        : 'border-b border-gray-200 hover:bg-gray-50'
                    }`}
                  >
                    <div className="flex items-center">
                      <div className={`w-8 h-8 flex items-center justify-center rounded-full ${
                        isDarkMode ? 'bg-zinc-700 text-cyan-300' : 'bg-blue-100 text-blue-700'
                      }`}>
                        {employee.name.charAt(0).toUpperCase()}
                      </div>
                      <div className="ml-3">
                        <p className={isDarkMode ? 'text-gray-200' : 'text-gray-800'}>{employee.name}</p>
                        <p className={`text-sm ${isDarkMode ? 'text-zinc-400' : 'text-gray-500'}`}>{employee.email}</p>
                      </div>
                    </div>
                    <div>
                      <input
                        type="checkbox"
                        checked={selectedUsers.includes(employee._id)}
                        onChange={() => handleUserToggle(employee._id)}
                        className="h-5 w-5 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                      />
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
          
          <div className={`flex gap-3 pt-4 border-t ${isDarkMode ? 'border-zinc-700' : 'border-gray-200'}`}>
            <button
              type="button"
              onClick={onClose}
              className={`flex-1 px-6 py-2.5 rounded-lg font-semibold transition-all ${
                isDarkMode 
                  ? 'bg-zinc-800 hover:bg-zinc-700 text-zinc-200'
                  : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
              }`}
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className={`flex-1 px-6 py-2.5 rounded-lg font-semibold shadow-lg transition-all text-white ${
                isDarkMode 
                  ? 'bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500'
                  : 'bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600'
              } disabled:opacity-50`}
            >
              {loading ? 'Updating...' : 'Update Project'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateManagerProjectModal;