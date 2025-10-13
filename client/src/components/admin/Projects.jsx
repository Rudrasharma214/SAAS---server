import React, { useState, useEffect } from 'react';
import { useTheme } from '../../context/themeContext';
import { getProjects, deleteProject } from '../../services/projectServices';
import { FolderPlus, Edit, Trash2, FolderKanban, AlertTriangle } from 'lucide-react';
import toast from 'react-hot-toast';
import CreateProjectModal from './CreateProjectModal';
import UpdateProjectModal from './UpdateProjectModal';
import { getAllManagers } from '../../services/adminServices';

const Projects = () => {
  const { isDarkMode } = useTheme();
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);
  const [projectToDelete, setProjectToDelete] = useState(null);
  const [managers, setManagers] = useState([]); 
  const [isDeleting, setIsDeleting] = useState(false);

 
  const fetchManagers = async () => {
    try {
      const response = await getAllManagers(); // Assume this function exists in your services
      setManagers(response.data || []);
    } catch (error) {
      console.error("Error fetching managers:", error);
      toast.error(error.response?.data?.message || 'Failed to fetch managers.');
      setManagers([]);
    }
  };

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

 useEffect(() => {
    fetchProjects();
    fetchManagers();
  }, []);

  const confirmDeleteProject = async () => {
    if (!projectToDelete) return;

    setIsDeleting(true);
    const loadingToast = toast.loading('Deleting project...');
    try {
      await deleteProject(projectToDelete._id);
      toast.success('Project deleted successfully!', { id: loadingToast });
      fetchProjects(); // Refresh the project list
      setProjectToDelete(null);
    } catch (error) {
      console.error("Error deleting project:", error);
      toast.error(error.response?.data?.message || 'Failed to delete project.', { id: loadingToast });
    } finally {
      setIsDeleting(false);
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
                      <th className={`px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider ${isDarkMode ? 'text-zinc-400' : 'text-gray-600'}`}>Manager</th>
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
                        <td className={`px-6 py-4 whitespace-nowrap text-sm ${isDarkMode ? 'text-zinc-300' : 'text-gray-700'}`}>
                          {project.managerId ? project.managerId.name : 'Unassigned'}
                          {project.managerId && (
                            <p className={`text-xs italic ${isDarkMode ? 'text-zinc-400' : 'text-gray-500'}`}>{project.managerId.email}</p>
                          )}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold ${isDarkMode ? 'bg-blue-500/10 text-blue-400' : 'bg-blue-100 text-blue-800'}`}>
                            {project.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-center">
                          <div className="flex items-center justify-center gap-2">
                            <button 
                              onClick={() => {
                                setSelectedProject(project);
                                setShowUpdateModal(true);
                              }}
                              className={`p-2 rounded-md transition-colors ${isDarkMode ? 'text-zinc-400 hover:bg-zinc-700 hover:text-white' : 'text-gray-500 hover:bg-gray-100 hover:text-blue-600'}`} title="Edit">
                              <Edit size={16} />
                            </button>
                            <button onClick={() => setProjectToDelete(project)} 
                              className={`p-2 rounded-md transition-colors ${isDarkMode ? 'text-zinc-400 hover:bg-zinc-700 hover:text-red-500' : 'text-gray-500 hover:bg-gray-100 hover:text-red-600'}`} title="Delete">
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
        managers={managers}
      />

      <UpdateProjectModal
        isOpen={showUpdateModal}
        onClose={() => setShowUpdateModal(false)}
        onProjectUpdated={fetchProjects}
        project={selectedProject}
        managers={managers}
      />

      {projectToDelete && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/60 backdrop-blur-sm z-50 p-4">
          <div className={`w-full max-w-md rounded-2xl shadow-2xl relative ${isDarkMode ? 'bg-zinc-900 border border-zinc-700' : 'bg-white border'}`}>
            <div className="p-6 text-center">
              <div className={`w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center ${isDarkMode ? 'bg-red-500/10' : 'bg-red-100'}`}>
                <AlertTriangle size={32} className="text-red-500" />
              </div>
              <h3 className={`text-xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                Delete Project
              </h3>
              <p className={`mt-2 text-sm ${isDarkMode ? 'text-zinc-400' : 'text-gray-600'}`}>
                Are you sure you want to delete the "<strong>{projectToDelete.name}</strong>" project? This action cannot be undone.
              </p>
            </div>

            <div className={`flex gap-3 p-4 border-t ${isDarkMode ? 'border-zinc-700 bg-zinc-900/50' : 'border-gray-200 bg-gray-50'} rounded-b-2xl`}>
              <button
                type="button"
                onClick={() => setProjectToDelete(null)}
                className={`flex-1 px-6 py-2.5 rounded-lg font-semibold transition-all ${isDarkMode ? 'bg-zinc-800 hover:bg-zinc-700 text-zinc-200' : 'bg-gray-200 hover:bg-gray-300 text-gray-800'}`}
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={confirmDeleteProject}
                disabled={isDeleting}
                className={`flex-1 px-6 py-2.5 rounded-lg font-semibold text-white transition-all flex items-center justify-center gap-2 ${isDarkMode ? 'bg-red-600 hover:bg-red-700 disabled:bg-red-800' : 'bg-red-500 hover:bg-red-600 disabled:bg-red-400'}`}
              >
                {isDeleting ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    Deleting...
                  </>
                ) : (
                  'Delete'
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Projects;
