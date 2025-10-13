import React, { useState, useEffect } from 'react';
import { useTheme } from '../../context/themeContext';
import { updateProject } from '../../services/projectServices';
import { X, Folder, FileText, Calendar, UserCheck } from 'lucide-react';
import toast from 'react-hot-toast';

const UpdateProjectModal = ({ isOpen, onClose, onProjectUpdated, project, managers = [] }) => {
  const { isDarkMode } = useTheme();
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    startDate: '',
    endDate: '',
    managerId: '',
  });
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (project) {
      setFormData({
        name: project.name || '',
        description: project.description || '',
        startDate: project.startDate ? new Date(project.startDate).toISOString().split('T')[0] : '',
        endDate: project.endDate ? new Date(project.endDate).toISOString().split('T')[0] : '',
        managerId: project.managerId?._id || project.managerId || '',
      });
    }
  }, [project]);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleUpdateProject = async (e) => {
    e.preventDefault();
    if (!project?._id) return;

    const loadingToast = toast.loading('Updating project...');
    setSubmitting(true);
    try {
      await updateProject(project._id, formData);
      toast.success('Project updated successfully!', { id: loadingToast });
      onProjectUpdated();
      onClose();
    } catch (error) {
      console.error('Error updating project:', error);
      toast.error(error.response?.data?.message || 'Failed to update project.', { id: loadingToast });
    } finally {
      setSubmitting(false);
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
              <Folder size={24} className={isDarkMode ? 'text-cyan-400' : 'text-blue-600'} />
            </div>
            <div>
              <h2 className={`text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Edit Project</h2>
              <p className={`text-sm ${isDarkMode ? 'text-zinc-400' : 'text-gray-600'}`}>Update the details for the project.</p>
            </div>
          </div>
        </div>
        <form onSubmit={handleUpdateProject} className="p-6 space-y-4">
          <div className="relative">
            <Folder size={18} className={`absolute left-3 top-1/2 -translate-y-1/2 ${isDarkMode ? 'text-zinc-500' : 'text-gray-400'}`} />
            <input type="text" name="name" value={formData.name} onChange={handleInputChange} placeholder="Project Name" required className={`w-full pl-10 pr-4 py-2.5 rounded-lg border transition-all ${isDarkMode ? 'bg-zinc-800 text-gray-100 border-zinc-700 focus:ring-cyan-500' : 'bg-gray-50 text-gray-900 border-gray-200 focus:ring-blue-500'} focus:outline-none focus:ring-2`} />
          </div>
          <div className="relative">
            <FileText size={18} className={`absolute left-3 top-3 ${isDarkMode ? 'text-zinc-500' : 'text-gray-400'}`} />
            <textarea name="description" value={formData.description} onChange={handleInputChange} placeholder="Project Description" rows="3" className={`w-full pl-10 pr-4 py-2.5 rounded-lg border transition-all ${isDarkMode ? 'bg-zinc-800 text-gray-100 border-zinc-700 focus:ring-cyan-500' : 'bg-gray-50 text-gray-900 border-gray-200 focus:ring-blue-500'} focus:outline-none focus:ring-2`}></textarea>
          </div>
          <div className="relative">
            <UserCheck size={18} className={`absolute left-3 top-1/2 -translate-y-1/2 ${isDarkMode ? 'text-zinc-500' : 'text-gray-400'}`} />
            <select name="managerId" value={formData.managerId} onChange={handleInputChange} required className={`w-full pl-10 pr-4 py-2.5 rounded-lg border transition-all appearance-none ${isDarkMode ? 'bg-zinc-800 text-gray-100 border-zinc-700 focus:ring-cyan-500' : 'bg-gray-50 text-gray-900 border-gray-200 focus:ring-blue-500'} focus:outline-none focus:ring-2`}>
              <option value="">Assign Manager</option>
              {managers.map((manager) => (
                <option key={manager._id} value={manager._id}>{manager.name} ({manager.email})</option>
              ))}
            </select>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="relative">
              <Calendar size={18} className={`absolute left-3 top-1/2 -translate-y-1/2 ${isDarkMode ? 'text-zinc-500' : 'text-gray-400'}`} />
              <input type="date" name="startDate" value={formData.startDate} onChange={handleInputChange} required className={`w-full pl-10 pr-4 py-2.5 rounded-lg border transition-all ${isDarkMode ? 'bg-zinc-800 text-gray-100 border-zinc-700 focus:ring-cyan-500' : 'bg-gray-50 text-gray-900 border-gray-200 focus:ring-blue-500'} focus:outline-none focus:ring-2`} />
            </div>
            <div className="relative">
              <Calendar size={18} className={`absolute left-3 top-1/2 -translate-y-1/2 ${isDarkMode ? 'text-zinc-500' : 'text-gray-400'}`} />
              <input type="date" name="endDate" value={formData.endDate} onChange={handleInputChange} className={`w-full pl-10 pr-4 py-2.5 rounded-lg border transition-all ${isDarkMode ? 'bg-zinc-800 text-gray-100 border-zinc-700 focus:ring-cyan-500' : 'bg-gray-50 text-gray-900 border-gray-200 focus:ring-blue-500'} focus:outline-none focus:ring-2`} />
            </div>
          </div>
          <div className={`flex gap-3 pt-4 border-t ${isDarkMode ? 'border-zinc-700' : 'border-gray-200'}`}>
            <button type="button" onClick={onClose} className={`flex-1 px-6 py-2.5 rounded-lg font-semibold transition-all ${isDarkMode ? 'bg-zinc-800 hover:bg-zinc-700 text-zinc-200' : 'bg-gray-100 hover:bg-gray-200 text-gray-700'}`}>
              Cancel
            </button>
            <button type="submit" disabled={submitting} className={`flex-1 px-6 py-2.5 rounded-lg font-semibold shadow-lg transition-all text-white ${isDarkMode ? 'bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500' : 'bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600'} disabled:opacity-50`}>
              {submitting ? 'Updating...' : 'Update Project'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateProjectModal;