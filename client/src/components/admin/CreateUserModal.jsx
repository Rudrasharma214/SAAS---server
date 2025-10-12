import React, { useState } from 'react';
import { useTheme } from '../../context/themeContext';
import { createEmployee } from '../../services/adminServices';
import { X, UserPlus, Mail, Lock } from 'lucide-react';
import toast from 'react-hot-toast';

const CreateUserModal = ({ isOpen, onClose, onUserCreated }) => {
  const { isDarkMode } = useTheme();
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const [submitting, setSubmitting] = useState(false);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleCreateUser = async (e) => {
    e.preventDefault();
    if (formData.password.length < 6) {
      toast.error('Password must be at least 6 characters long.');
      return;
    }

    const loadingToast = toast.loading('Creating employee...');
    setSubmitting(true);
    try {
      await createEmployee(formData);
      toast.success('Employee created successfully!', { id: loadingToast });
      setFormData({ name: '', email: '', password: '' });
      onUserCreated();
      onClose();
    } catch (error) {
      console.error('Error creating employee:', error);
      toast.error(error.response?.data?.message || 'Failed to create employee.', { id: loadingToast });
    } finally {
      setSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/60 backdrop-blur-sm z-50 p-4">
      <div className={`w-full max-w-md rounded-2xl shadow-2xl relative ${isDarkMode ? 'bg-zinc-900 border border-zinc-700' : 'bg-white'}`}>
        <div className={`p-6 border-b ${isDarkMode ? 'border-zinc-700' : 'border-gray-200'}`}>
          <button onClick={onClose} className={`absolute top-4 right-4 p-2 rounded-lg transition-colors ${isDarkMode ? 'text-zinc-400 hover:bg-zinc-800' : 'text-gray-400 hover:bg-gray-100'}`}>
            <X size={20} />
          </button>
          <div className="flex items-center gap-3">
            <div className={`p-3 rounded-xl ${isDarkMode ? 'bg-gradient-to-br from-blue-500/10 to-cyan-500/10' : 'bg-gradient-to-br from-blue-50 to-cyan-50'}`}>
              <UserPlus size={24} className={isDarkMode ? 'text-cyan-400' : 'text-blue-600'} />
            </div>
            <div>
              <h2 className={`text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Add New Employee</h2>
              <p className={`text-sm ${isDarkMode ? 'text-zinc-400' : 'text-gray-600'}`}>Invite a new employee to the company.</p>
            </div>
          </div>
        </div>
        <form onSubmit={handleCreateUser} className="p-6 space-y-4">
          <div className="relative">
            <Mail size={18} className={`absolute left-3 top-1/2 -translate-y-1/2 ${isDarkMode ? 'text-zinc-500' : 'text-gray-400'}`} />
            <input type="email" name="email" value={formData.email} onChange={handleInputChange} placeholder="Email Address" required className={`w-full pl-10 pr-4 py-2.5 rounded-lg border transition-all ${isDarkMode ? 'bg-zinc-800 border-zinc-700 focus:ring-cyan-500' : 'bg-gray-50 border-gray-200 focus:ring-blue-500'} focus:outline-none focus:ring-2`} />
          </div>
          <div className="relative">
            <UserPlus size={18} className={`absolute left-3 top-1/2 -translate-y-1/2 ${isDarkMode ? 'text-zinc-500' : 'text-gray-400'}`} />
            <input type="text" name="name" value={formData.name} onChange={handleInputChange} placeholder="Full Name" required className={`w-full pl-10 pr-4 py-2.5 rounded-lg border transition-all ${isDarkMode ? 'bg-zinc-800 border-zinc-700 focus:ring-cyan-500' : 'bg-gray-50 border-gray-200 focus:ring-blue-500'} focus:outline-none focus:ring-2`} />
          </div>
          <div className="relative">
            <Lock size={18} className={`absolute left-3 top-1/2 -translate-y-1/2 ${isDarkMode ? 'text-zinc-500' : 'text-gray-400'}`} />
            <input type="password" name="password" value={formData.password} onChange={handleInputChange} placeholder="Password (min. 6 characters)" required className={`w-full pl-10 pr-4 py-2.5 rounded-lg border transition-all ${isDarkMode ? 'bg-zinc-800 border-zinc-700 focus:ring-cyan-500' : 'bg-gray-50 border-gray-200 focus:ring-blue-500'} focus:outline-none focus:ring-2`} />
          </div>
          <div className={`flex gap-3 pt-4 border-t ${isDarkMode ? 'border-zinc-700' : 'border-gray-200'}`}>
            <button type="button" onClick={onClose} className={`flex-1 px-6 py-2.5 rounded-lg font-semibold transition-all ${isDarkMode ? 'bg-zinc-800 hover:bg-zinc-700 text-zinc-200' : 'bg-gray-100 hover:bg-gray-200 text-gray-700'}`}>
              Cancel
            </button>
            <button type="submit" disabled={submitting} className={`flex-1 px-6 py-2.5 rounded-lg font-semibold shadow-lg transition-all text-white ${isDarkMode ? 'bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500' : 'bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600'} disabled:opacity-50`}>
              {submitting ? 'Creating...' : 'Create Manager'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateUserModal;