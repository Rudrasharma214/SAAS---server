import React, { useState, useEffect } from 'react';
import { useTheme } from '../../context/themeContext';
import { getProjectsForManager } from '../../services/managerServices';
import { FolderKanban, Users, Edit } from 'lucide-react';
import toast from 'react-hot-toast';
import UpdateManagerProjectModal from './UpdateManagerProjectModal';

const ManagerProjects = () => {
  const { isDarkMode } = useTheme();
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    setLoading(true);
    try {
      const response = await getProjectsForManager();
      setProjects(response.data || []);
    } catch (error) {
      console.error("Error fetching manager's projects:", error);
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
  
  const handleOpenUpdateModal = (project) => {
    setSelectedProject(project);
    setIsUpdateModalOpen(true);
  };
  
  const handleCloseUpdateModal = () => {
    setIsUpdateModalOpen(false);
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
              View and manage all projects assigned to you.
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
                    <th className={`px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider ${isDarkMode ? 'text-cyan-300' : 'text-cyan-800'}`}>Team</th>
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
                        {formatDate(project.startDate)} - {formatDate(project.endDate)}
                      </td>
                      <td className={`px-6 py-4 whitespace-nowrap text-sm ${isDarkMode ? 'text-cyan-200' : 'text-sky-800'}`}>
                        {project.teamMembers.length} members
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold ${
                          project.status === 'completed' 
                            ? isDarkMode ? 'bg-green-500/10 text-green-300' : 'bg-green-100 text-green-800'
                            : project.status === 'in-progress' 
                              ? isDarkMode ? 'bg-orange-500/10 text-orange-300' : 'bg-orange-100 text-orange-800'
                              : project.status === 'on-hold'
                                ? isDarkMode ? 'bg-red-500/10 text-red-300' : 'bg-red-100 text-red-800'
                                : isDarkMode ? 'bg-blue-500/10 text-blue-300' : 'bg-blue-100 text-blue-800'
                        }`}>
                          {project.status || 'planned'}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-center">
                        <button 
                          onClick={() => handleOpenUpdateModal(project)}
                          className={`p-2 rounded-md transition-colors ${isDarkMode ? 'text-cyan-300 hover:bg-cyan-700/50 hover:text-white' : 'text-cyan-700 hover:bg-cyan-100 hover:text-cyan-900'}`} 
                          title="Manage Team & Status"
                        >
                          <Users size={16} />
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
      {/* Update Project Modal */}
      <UpdateManagerProjectModal 
        isOpen={isUpdateModalOpen}
        onClose={handleCloseUpdateModal}
        onProjectUpdated={fetchProjects}
        project={selectedProject}
      />
    </div>
  );
};

export default ManagerProjects;