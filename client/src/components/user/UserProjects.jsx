import React, { useState, useEffect } from 'react';
import { useTheme } from '../../context/themeContext';
import { getProjectForUser } from '../../services/userServices';
import { FolderKanban, Users, Calendar, Clock, CheckCircle2, AlertCircle, CirclePause } from 'lucide-react';
import toast from 'react-hot-toast';

const UserProjects = () => {
  const { isDarkMode } = useTheme();
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);
  const [showDetails, setShowDetails] = useState(false);

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    setLoading(true);
    try {
      const response = await getProjectForUser();
      setProjects(response.data || []);
    } catch (error) {
      console.error("Error fetching user's projects:", error);
      toast.error(error.message || 'Failed to fetch projects.');
      setProjects([]);
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
  
  const getStatusIcon = (status) => {
    switch (status) {
      case 'planned':
        return <Clock size={18} className={isDarkMode ? 'text-yellow-300' : 'text-yellow-600'} />;
      case 'in-progress':
        return <AlertCircle size={18} className={isDarkMode ? 'text-orange-300' : 'text-orange-600'} />;
      case 'completed':
        return <CheckCircle2 size={18} className={isDarkMode ? 'text-green-300' : 'text-green-600'} />;
      case 'on-hold':
        return <CirclePause size={18} className={isDarkMode ? 'text-red-300' : 'text-red-600'} />;
      default:
        return <Clock size={18} className={isDarkMode ? 'text-gray-300' : 'text-gray-600'} />;
    }
  };
  
  const getStatusClass = (status) => {
    switch (status) {
      case 'planned':
        return isDarkMode ? 'bg-yellow-900/30 text-yellow-300' : 'bg-yellow-100 text-yellow-800';
      case 'in-progress':
        return isDarkMode ? 'bg-orange-900/30 text-orange-300' : 'bg-orange-100 text-orange-800';
      case 'completed':
        return isDarkMode ? 'bg-green-900/30 text-green-300' : 'bg-green-100 text-green-800';
      case 'on-hold':
        return isDarkMode ? 'bg-red-900/30 text-red-300' : 'bg-red-100 text-red-800';
      default:
        return isDarkMode ? 'bg-gray-800 text-gray-300' : 'bg-gray-100 text-gray-800';
    }
  };

  const handleViewDetails = (project) => {
    setSelectedProject(project);
    setShowDetails(true);
  };

  const handleCloseDetails = () => {
    setShowDetails(false);
    setSelectedProject(null);
  };

  return (
    <div className="h-full w-full flex flex-col overflow-hidden bg-transparent transition-all">
      <div className="flex-1 overflow-auto p-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
          <div>
            <h1 className={`text-2xl ${isDarkMode ? 'text-cyan-100' : 'text-cyan-900'} font-bold`}>
              My Projects
            </h1>
            <p className={isDarkMode ? 'text-cyan-300' : 'text-sky-700'}>
              View all projects you are assigned to.
            </p>
          </div>
        </div>

        <div className={`rounded-xl border overflow-hidden ${isDarkMode ? 'bg-slate-700/20 border-cyan-700/50' : 'bg-white/80 border-cyan-200 shadow-lg shadow-cyan-100/30'}`}>
          {loading ? (
            <div className="text-center py-16">
              <div className={`inline-block animate-spin rounded-full h-10 w-10 border-b-2 ${isDarkMode ? 'border-cyan-400' : 'border-cyan-600'}`}></div>
              <p className={`mt-4 text-lg font-medium ${isDarkMode ? 'text-cyan-300' : 'text-sky-700'}`}>Loading projects...</p>
            </div>
          ) : projects.length === 0 ? (
            <div className="text-center py-16">
              <FolderKanban size={40} className={`mx-auto mb-4 ${isDarkMode ? 'text-cyan-600' : 'text-cyan-400'}`} />
              <p className={`text-lg font-medium ${isDarkMode ? 'text-cyan-300' : 'text-sky-700'}`}>No projects found.</p>
              <p className={`mt-1 text-sm ${isDarkMode ? 'text-cyan-400' : 'text-sky-600'}`}>You have not been assigned to any projects yet.</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className={isDarkMode ? 'bg-slate-800/50 border-b border-cyan-700/50' : 'bg-cyan-50/50 border-b border-cyan-200'}>
                    <th className={`px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider ${isDarkMode ? 'text-cyan-300' : 'text-cyan-800'}`}>Project Name</th>
                    <th className={`px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider ${isDarkMode ? 'text-cyan-300' : 'text-cyan-800'}`}>Timeline</th>
                    <th className={`px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider ${isDarkMode ? 'text-cyan-300' : 'text-cyan-800'}`}>Manager</th>
                    <th className={`px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider ${isDarkMode ? 'text-cyan-300' : 'text-cyan-800'}`}>Status</th>
                    <th className={`px-6 py-3 text-center text-xs font-semibold uppercase tracking-wider ${isDarkMode ? 'text-cyan-300' : 'text-cyan-800'}`}>Actions</th>
                  </tr>
                </thead>
                <tbody className={isDarkMode ? 'divide-y divide-cyan-800/50' : 'divide-y divide-cyan-200'}>
                  {projects.map((project) => (
                    <tr key={project._id} className={`transition-colors ${isDarkMode ? 'hover:bg-slate-700/40' : 'hover:bg-cyan-50/70'}`}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <p className={`font-medium ${isDarkMode ? 'text-cyan-100' : 'text-cyan-900'}`}>{project.name}</p>
                        <p className={`text-sm truncate max-w-xs ${isDarkMode ? 'text-cyan-400' : 'text-sky-700'}`}>{project.description}</p>
                      </td>
                      <td className={`px-6 py-4 whitespace-nowrap text-sm ${isDarkMode ? 'text-cyan-200' : 'text-sky-800'}`}>
                        <div className="flex items-center">
                          <Calendar size={16} className="mr-2" />
                          {formatDate(project.startDate)} - {formatDate(project.endDate)}
                        </div>
                      </td>
                      <td className={`px-6 py-4 whitespace-nowrap text-sm ${isDarkMode ? 'text-cyan-200' : 'text-sky-800'}`}>
                        <div className="flex items-center">
                          <Users size={16} className="mr-2" />
                          {project.managerId?.name || 'Not Assigned'}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className={`inline-flex items-center px-3 py-1 rounded-full text-xs ${getStatusClass(project.status)}`}>
                          {getStatusIcon(project.status)}
                          <span className="ml-1 capitalize">{project.status.replace('-', ' ')}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-center">
                        <button
                          onClick={() => handleViewDetails(project)}
                          className={`px-3 py-1 rounded-md text-sm font-medium ${
                            isDarkMode 
                              ? 'bg-cyan-700/50 text-cyan-200 hover:bg-cyan-700/80' 
                              : 'bg-cyan-100 text-cyan-700 hover:bg-cyan-200'
                          } transition-colors`}
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

        {/* Project Details Modal */}
        {showDetails && selectedProject && (
          <div className="fixed inset-0 flex items-center justify-center bg-black/60 backdrop-blur-sm z-50 p-4">
            <div className={`w-full max-w-lg rounded-2xl shadow-2xl relative ${isDarkMode ? 'bg-zinc-900 border border-zinc-700' : 'bg-white'}`}>
              <div className={`p-6 border-b ${isDarkMode ? 'border-zinc-700' : 'border-gray-200'}`}>
                <button 
                  onClick={handleCloseDetails} 
                  className={`absolute top-4 right-4 p-2 rounded-lg transition-colors ${isDarkMode ? 'text-zinc-400 hover:bg-zinc-800' : 'text-gray-400 hover:bg-gray-100'}`}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </button>
                <div className="flex items-center gap-3">
                  <div className={`p-3 rounded-xl ${isDarkMode ? 'bg-gradient-to-br from-blue-500/10 to-cyan-500/10' : 'bg-gradient-to-br from-blue-50 to-cyan-50'}`}>
                    <FolderKanban size={24} className={isDarkMode ? 'text-cyan-400' : 'text-blue-600'} />
                  </div>
                  <div>
                    <h2 className={`text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>{selectedProject.name}</h2>
                    <div className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs ${getStatusClass(selectedProject.status)}`}>
                      {getStatusIcon(selectedProject.status)}
                      <span className="ml-1 capitalize">{selectedProject.status.replace('-', ' ')}</span>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="p-6 space-y-4">
                <div>
                  <h3 className={`text-sm font-medium mb-1 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>Description</h3>
                  <p className={`${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                    {selectedProject.description || 'No description provided.'}
                  </p>
                </div>
                
                <div>
                  <h3 className={`text-sm font-medium mb-1 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>Timeline</h3>
                  <p className={`flex items-center ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                    <Calendar size={16} className="mr-2" />
                    {formatDate(selectedProject.startDate)} - {formatDate(selectedProject.endDate)}
                  </p>
                </div>
                
                <div>
                  <h3 className={`text-sm font-medium mb-1 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>Manager</h3>
                  <p className={`flex items-center ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                    <Users size={16} className="mr-2" />
                    {selectedProject.managerId?.name || 'Not Assigned'}
                  </p>
                </div>
              </div>
              
              <div className={`p-6 border-t ${isDarkMode ? 'border-zinc-700' : 'border-gray-200'}`}>
                <button
                  onClick={handleCloseDetails}
                  className={`w-full px-6 py-2.5 rounded-lg font-semibold transition-all ${
                    isDarkMode 
                      ? 'bg-zinc-800 hover:bg-zinc-700 text-zinc-200'
                      : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
                  }`}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserProjects;
