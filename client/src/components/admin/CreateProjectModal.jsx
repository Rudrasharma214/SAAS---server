import React, { useState } from 'react';
import { useTheme } from '../../context/themeContext';
import { createProject } from '../../services/projectServices';
import { X, FolderPlus, FileText, Calendar } from 'lucide-react';
import toast from 'react-hot-toast';

const CreateProjectModal = ({ isOpen, onClose, onProjectCreated }) => {
  const { isDarkMode } = useTheme();
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    startDate: '',
    endDate: '',
  });
  const [submitting, setSubmitting] = useState(false);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleCreateProject = async (e) => {
    e.preventDefault();
    const loadingToast = toast.loading('Creating project...');
    setSubmitting(true);
    try {
      await createProject(formData);
      toast.success('Project created successfully!', { id: loadingToast });
      setFormData({ name: '', description: '', startDate: '', endDate: '' });
      onProjectCreated();
      onClose();
    } catch (error) {
      console.error('Error creating project:', error);
      toast.error(error.response?.data?.message || 'Failed to create project.', { id: loadingToast });
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
            <div className={`p-3 rounded-xl ${isDarkMode ? 'bg-gradient-to-br from-green-500/10 to-teal-500/10' : 'bg-gradient-to-br from-green-50 to-teal-50'}`}>
              <FolderPlus size={24} className={isDarkMode ? 'text-teal-400' : 'text-green-600'} />
            </div>
            <div>
              <h2 className={`text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Create New Project</h2>
              <p className={`text-sm ${isDarkMode ? 'text-zinc-400' : 'text-gray-600'}`}>Define the details for a new project.</p>
            </div>
          </div>
        </div>
        <form onSubmit={handleCreateProject} className="p-6 space-y-4">
          <div className="relative">
            <FolderPlus size={18} className={`absolute left-3 top-1/2 -translate-y-1/2 ${isDarkMode ? 'text-zinc-500' : 'text-gray-400'}`} />
            <input type="text" name="name" value={formData.name} onChange={handleInputChange} placeholder="Project Name" required className={`w-full pl-10 pr-4 py-2.5 rounded-lg border transition-all ${isDarkMode ? 'bg-zinc-800 text-gray-100 border-zinc-700 focus:ring-teal-500' : 'bg-gray-50 text-gray-900 border-gray-200 focus:ring-green-500'} focus:outline-none focus:ring-2`} />
          </div>
          <div className="relative">
            <FileText size={18} className={`absolute left-3 top-3 ${isDarkMode ? 'text-zinc-500' : 'text-gray-400'}`} />
            <textarea name="description" value={formData.description} onChange={handleInputChange} placeholder="Project Description" rows="3" className={`w-full pl-10 pr-4 py-2.5 rounded-lg border transition-all ${isDarkMode ? 'bg-zinc-800 text-gray-100 border-zinc-700 focus:ring-teal-500' : 'bg-gray-50 text-gray-900 border-gray-200 focus:ring-green-500'} focus:outline-none focus:ring-2`}></textarea>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="relative">
              <Calendar size={18} className={`absolute left-3 top-1/2 -translate-y-1/2 ${isDarkMode ? 'text-zinc-500' : 'text-gray-400'}`} />
              <input type="date" name="startDate" value={formData.startDate} onChange={handleInputChange} required className={`w-full pl-10 pr-4 py-2.5 rounded-lg border transition-all ${isDarkMode ? 'bg-zinc-800 text-gray-100 border-zinc-700 focus:ring-teal-500' : 'bg-gray-50 text-gray-900 border-gray-200 focus:ring-green-500'} focus:outline-none focus:ring-2`} />
            </div>
            <div className="relative">
              <Calendar size={18} className={`absolute left-3 top-1/2 -translate-y-1/2 ${isDarkMode ? 'text-zinc-500' : 'text-gray-400'}`} />
              <input type="date" name="endDate" value={formData.endDate} onChange={handleInputChange} className={`w-full pl-10 pr-4 py-2.5 rounded-lg border transition-all ${isDarkMode ? 'bg-zinc-800 text-gray-100 border-zinc-700 focus:ring-teal-500' : 'bg-gray-50 text-gray-900 border-gray-200 focus:ring-green-500'} focus:outline-none focus:ring-2`} />
            </div>
          </div>
          <div className={`flex gap-3 pt-4 border-t ${isDarkMode ? 'border-zinc-700' : 'border-gray-200'}`}>
            <button type="button" onClick={onClose} className={`flex-1 px-6 py-2.5 rounded-lg font-semibold transition-all ${isDarkMode ? 'bg-zinc-800 hover:bg-zinc-700 text-zinc-200' : 'bg-gray-100 hover:bg-gray-200 text-gray-700'}`}>
              Cancel
            </button>
            <button type="submit" disabled={submitting} className={`flex-1 px-6 py-2.5 rounded-lg font-semibold shadow-lg transition-all text-white ${isDarkMode ? 'bg-gradient-to-r from-green-600 to-teal-600 hover:from-green-500 hover:to-teal-500' : 'bg-gradient-to-r from-green-500 to-teal-500 hover:from-green-600 hover:to-teal-600'} disabled:opacity-50`}>
              {submitting ? 'Creating...' : 'Create Project'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateProjectModal;