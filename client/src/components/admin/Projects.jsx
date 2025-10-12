import React, { useState, useEffect } from 'react';
import { useTheme } from '../../context/themeContext';
import { getProjects } from '../../services/projectServices';
import { FolderPlus, Edit, Trash2, FolderKanban } from 'lucide-react';
import toast from 'react-hot-toast';
import CreateProjectModal from './CreateProjectModal';

const Projects = () => {
  const { isDarkMode } = useTheme();
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showCreateModal, setShowCreateModal] = useState(false);

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    setLoading(true);
    try {
      const response = await getProjects();
      console.log(response.data)
      setProjects(response.data || []);
    } catch (error) {
      console.error("Error fetching projects:", error);
      toast.error(error.response?.data?.message || 'Failed to fetch projects.');
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

  return (
    <>
      <div className="h-full w-full flex flex-col overflow-hidden bg-transparent transition-all">
        <div className="flex-1 overflow-auto p-6">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
            <div>
              <h1 className={`text-2xl ${isDarkMode ? 'text-zinc-200' : 'text-gray-900'} font-bold`}>
                Manage Projects
              </h1>
              <p className={isDarkMode ? 'text-zinc-400' : 'text-gray-600'}>
                Oversee all company projects from a single dashboard.
              </p>
            </div>
            <button
              onClick={() => setShowCreateModal(true)}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-semibold shadow-lg transition-all duration-300 ${
                isDarkMode
                  ? 'bg-gradient-to-r from-green-600 to-teal-600 text-white hover:shadow-teal-500/30'
                  : 'bg-gradient-to-r from-green-500 to-teal-500 text-white hover:shadow-green-300/50 hover:scale-105'
              }`}
            >
              <FolderPlus size={18} /> Create Project
            </button>
          </div>

          <div className={`rounded-xl border overflow-hidden ${isDarkMode ? 'bg-zinc-800/50 border-zinc-700/50' : 'bg-white border-gray-200 shadow-lg shadow-gray-200/20'}`}>
            {loading ? (
              <div className="text-center py-16">
                <div className={`inline-block animate-spin rounded-full h-10 w-10 border-b-2 ${isDarkMode ? 'border-teal-400' : 'border-green-500'}`}></div>
                <p className={`mt-4 text-lg font-medium ${isDarkMode ? 'text-zinc-400' : 'text-gray-500'}`}>Loading projects...</p>
              </div>
            ) : projects.length === 0 ? (
              <div className="text-center py-16">
                <FolderKanban size={40} className={`mx-auto mb-4 ${isDarkMode ? 'text-zinc-600' : 'text-gray-400'}`} />
                <p className={`text-lg font-medium ${isDarkMode ? 'text-zinc-400' : 'text-gray-600'}`}>No projects found.</p>
                <p className={`mt-1 text-sm ${isDarkMode ? 'text-zinc-500' : 'text-gray-500'}`}>Get started by creating a new project.</p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className={isDarkMode ? 'bg-zinc-900/50 border-b border-zinc-700' : 'bg-gray-50 border-b border-gray-200'}>
                      <th className={`px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider ${isDarkMode ? 'text-zinc-400' : 'text-gray-600'}`}>Project Name</th>
                      <th className={`px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider ${isDarkMode ? 'text-zinc-400' : 'text-gray-600'}`}>Timeline</th>
                      <th className={`px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider ${isDarkMode ? 'text-zinc-400' : 'text-gray-600'}`}>Status</th>
                      <th className={`px-6 py-3 text-center text-xs font-semibold uppercase tracking-wider ${isDarkMode ? 'text-zinc-400' : 'text-gray-600'}`}>Actions</th>
                    </tr>
                  </thead>
                  <tbody className={isDarkMode ? 'divide-y divide-zinc-700/50' : 'divide-y divide-gray-200'}>
                    {projects.map((project) => (
                      <tr key={project._id} className={`transition-colors ${isDarkMode ? 'hover:bg-zinc-800' : 'hover:bg-gray-50'}`}>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <p className={`font-medium ${isDarkMode ? 'text-zinc-200' : 'text-gray-900'}`}>{project.name}</p>
                          <p className={`text-sm truncate max-w-xs ${isDarkMode ? 'text-zinc-400' : 'text-gray-600'}`}>{project.description}</p>
                        </td>
                        <td className={`px-6 py-4 whitespace-nowrap text-sm ${isDarkMode ? 'text-zinc-300' : 'text-gray-700'}`}>
                          {formatDate(project.startDate)} - {formatDate(project.endDate)}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold ${isDarkMode ? 'bg-blue-500/10 text-blue-400' : 'bg-blue-100 text-blue-800'}`}>
                            {project.status}
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

      <CreateProjectModal
        isOpen={showCreateModal}
        onClose={() => setShowCreateModal(false)}
        onProjectCreated={fetchProjects}
      />
    </>
  );
};

export default Projects;
