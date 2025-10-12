import React from 'react';
import { X, Sparkles } from 'lucide-react';

const CreatePlanModal = ({
  isOpen,
  onClose,
  onSubmit,
  formData,
  onInputChange,
  submitting,
  isDarkMode
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/60 backdrop-blur-sm z-50 p-4">
      <div
        className={`w-full max-w-lg rounded-2xl shadow-2xl relative ${
          isDarkMode
            ? 'bg-zinc-900 border border-zinc-700'
            : 'bg-white border border-indigo-100'
        }`}
      >
        {/* Modal Header */}
        <div
          className={`p-6 border-b ${isDarkMode ? 'border-zinc-700' : 'border-indigo-100'}`}
        >
          <button
            onClick={onClose}
            className={`absolute top-4 right-4 p-2 rounded-lg transition-colors ${
              isDarkMode
                ? 'text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800'
                : 'text-gray-400 hover:text-gray-600 hover:bg-gray-100'
            }`}
          >
            <X size={20} />
          </button>

          <div className="flex items-center gap-3">
            <div
              className={`p-3 rounded-xl ${
                isDarkMode
                  ? 'bg-gradient-to-br from-pink-500/10 to-purple-500/10'
                  : 'bg-gradient-to-br from-indigo-50 to-purple-50'
              }`}
            >
              <Sparkles
                size={24}
                className={isDarkMode ? 'text-pink-400' : 'text-indigo-600'}
              />
            </div>
            <div>
              <h2
                className={`text-2xl font-bold ${
                  isDarkMode ? 'text-white' : 'text-gray-900'
                }`}
              >
                Create New Plan
              </h2>
              <p className={`text-sm ${isDarkMode ? 'text-zinc-400' : 'text-gray-600'}`}>
                Set up a new subscription plan
              </p>
            </div>
          </div>
        </div>

        {/* Modal Body */}
        <form onSubmit={onSubmit} className="p-6 space-y-4">
          <div>
            <label
              className={`block text-sm font-medium mb-2 ${
                isDarkMode ? 'text-zinc-300' : 'text-gray-700'
              }`}
            >
              Plan Name
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={onInputChange}
              placeholder="e.g., Premium, Enterprise"
              className={`w-full px-4 py-2.5 rounded-lg border transition-all focus:outline-none focus:ring-2 ${
                isDarkMode
                  ? 'bg-zinc-800 text-zinc-100 border-zinc-700 focus:ring-pink-500 focus:border-pink-500'
                  : 'bg-white text-gray-900 border-indigo-200 focus:ring-indigo-500 focus:border-indigo-500'
              }`}
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label
                className={`block text-sm font-medium mb-2 ${
                  isDarkMode ? 'text-zinc-300' : 'text-gray-700'
                }`}
              >
                Price (₹)
              </label>
              <input
                type="number"
                name="price"
                value={formData.price}
                onChange={onInputChange}
                placeholder="999"
                className={`w-full px-4 py-2.5 rounded-lg border transition-all focus:outline-none focus:ring-2 ${
                  isDarkMode
                    ? 'bg-zinc-800 text-zinc-100 border-zinc-700 focus:ring-pink-500 focus:border-pink-500'
                    : 'bg-white text-gray-900 border-indigo-200 focus:ring-indigo-500 focus:border-indigo-500'
                }`}
                required
              />
            </div>

            <div>
              <label
                className={`block text-sm font-medium mb-2 ${
                  isDarkMode ? 'text-zinc-300' : 'text-gray-700'
                }`}
              >
                Duration (days)
              </label>
              <input
                type="number"
                name="durationInDays"
                value={formData.durationInDays}
                onChange={onInputChange}
                placeholder="30"
                className={`w-full px-4 py-2.5 rounded-lg border transition-all focus:outline-none focus:ring-2 ${
                  isDarkMode
                    ? 'bg-zinc-800 text-zinc-100 border-zinc-700 focus:ring-pink-500 focus:border-pink-500'
                    : 'bg-white text-gray-900 border-indigo-200 focus:ring-indigo-500 focus:border-indigo-500'
                }`}
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label
                className={`block text-sm font-medium mb-2 ${
                  isDarkMode ? 'text-zinc-300' : 'text-gray-700'
                }`}
              >
                Max Managers
              </label>
              <input
                type="number"
                name="maxManagers"
                value={formData.maxManagers}
                onChange={onInputChange}
                placeholder="5"
                className={`w-full px-4 py-2.5 rounded-lg border transition-all focus:outline-none focus:ring-2 ${
                  isDarkMode
                    ? 'bg-zinc-800 text-zinc-100 border-zinc-700 focus:ring-pink-500 focus:border-pink-500'
                    : 'bg-white text-gray-900 border-indigo-200 focus:ring-indigo-500 focus:border-indigo-500'
                }`}
                required
              />
            </div>

            <div>
              <label
                className={`block text-sm font-medium mb-2 ${
                  isDarkMode ? 'text-zinc-300' : 'text-gray-700'
                }`}
              >
                Max Employees
              </label>
              <input
                type="number"
                name="maxEmployees"
                value={formData.maxEmployees}
                onChange={onInputChange}
                placeholder="50"
                className={`w-full px-4 py-2.5 rounded-lg border transition-all focus:outline-none focus:ring-2 ${
                  isDarkMode
                    ? 'bg-zinc-800 text-zinc-100 border-zinc-700 focus:ring-pink-500 focus:border-pink-500'
                    : 'bg-white text-gray-900 border-indigo-200 focus:ring-indigo-500 focus:border-indigo-500'
                }`}
                required
              />
            </div>
          </div>

          {/* Modal Footer */}
          <div
            className={`flex gap-3 pt-4 border-t ${
              isDarkMode ? 'border-zinc-700' : 'border-indigo-100'
            }`}
          >
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
              disabled={submitting}
              className={`flex-1 px-6 py-2.5 rounded-lg font-semibold shadow-lg transition-all ${
                isDarkMode
                  ? 'bg-gradient-to-r from-pink-600 to-purple-600 hover:from-pink-500 hover:to-purple-500 text-white disabled:opacity-50'
                  : 'bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600 text-white disabled:opacity-50 shadow-indigo-200/50'
              }`}
            >
              {submitting ? 'Creating...' : 'Create Plan'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreatePlanModal;
