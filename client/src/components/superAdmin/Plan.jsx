import React, { useEffect, useState } from 'react';
import { createPlan, getAllPlans as getAllSuperAdminPlans } from '../../services/superAdminServices';
import { updatePlan, deletePlan, getAllPlans } from '../../services/planServices';
import { useTheme } from '../../context/themeContext';
import { Plus, X, Edit, Trash2, Users, UserCheck, Calendar, DollarSign, Sparkles, AlertTriangle } from 'lucide-react';

const Plan = () => {
  const { isDarkMode } = useTheme();

  const [plans, setPlans] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [editingPlan, setEditingPlan] = useState(null); // State to hold the plan being edited
  const [deletingPlan, setDeletingPlan] = useState(null); // State for delete confirmation modal
  const [submitting, setSubmitting] = useState(false);

  const [formData, setFormData] = useState({
    name: '',
    price: '',
    durationInDays: '',
    maxManagers: '',
    maxEmployees: '',
  });

  useEffect(() => {
    fetchPlans();
  }, []);

  const fetchPlans = async () => {
    try {
      setLoading(true);
      const data = await getAllPlans();
      setPlans(data.data.plans || []);
    } catch (err) {
      console.error('Error fetching plans:', err);
      setPlans([]);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleCreatePlan = async (e) => {
    e.preventDefault();
    try {
      setSubmitting(true);
      await createPlan(formData);
      setFormData({
        name: '',
        price: '',
        durationInDays: '',
        maxManagers: '',
        maxEmployees: '',
      });
      setShowForm(false);
      fetchPlans();
    } catch (err) {
      console.error('Error creating plan:', err);
    } finally {
      setSubmitting(false);
    }
  };

  const handleEditClick = (plan) => {
    setEditingPlan(plan);
    setFormData({
      name: plan.name,
      price: plan.price,
      durationInDays: plan.durationInDays,
      maxManagers: plan.maxManagers,
      maxEmployees: plan.maxEmployees,
    });
  };

  const handleUpdatePlan = async (e) => {
    e.preventDefault();
    if (!editingPlan) return;

    try {
      setSubmitting(true);
      await updatePlan(editingPlan._id, formData);
      setFormData({
        name: '',
        price: '',
        durationInDays: '',
        maxManagers: '',
        maxEmployees: '',
      });
      setEditingPlan(null);
      fetchPlans();
    } catch (err) {
      console.error('Error updating plan:', err);
    } finally {
      setSubmitting(false);
    }
  };

  const handleDeletePlan = async () => {
    if (!deletingPlan) return;

    try {
      setSubmitting(true);
      await deletePlan(deletingPlan._id);
      setDeletingPlan(null);
      fetchPlans(); // Refresh the list
    } catch (err) {
      console.error('Error deleting plan:', err);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="p-6 min-h-screen">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
          <div>
            <h2 className={`text-3xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
              Subscription Plans
            </h2>
            <p className={`text-sm mt-1 ${isDarkMode ? 'text-zinc-400' : 'text-gray-600'}`}>
              Create and manage subscription plans for your platform
            </p>
          </div>
          <button
            onClick={() => setShowForm(true)}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-semibold shadow-lg transition-all duration-300 ${
              isDarkMode
                ? 'bg-gradient-to-r from-pink-600 to-purple-600 text-white hover:shadow-pink-500/30'
                : 'bg-gradient-to-r from-indigo-500 to-purple-500 text-white hover:shadow-indigo-300/50 hover:scale-105'
            }`}
          >
            <Plus size={18} /> Create Plan
          </button>
        </div>

        {/* Plans Grid */}
        {loading ? (
          <div className="flex flex-col items-center justify-center py-20">
            <div className={`animate-spin rounded-full h-12 w-12 border-b-2 mb-4 ${
              isDarkMode ? 'border-pink-500' : 'border-indigo-500'
            }`}></div>
            <p className={`text-lg font-medium ${isDarkMode ? 'text-zinc-400' : 'text-gray-600'}`}>
              Loading plans...
            </p>
          </div>
        ) : plans.length === 0 ? (
          <div className={`text-center py-20 rounded-2xl border ${
            isDarkMode 
              ? 'bg-zinc-800/30 border-zinc-700' 
              : 'bg-white border-indigo-100 shadow-lg'
          }`}>
            <div className={`w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center ${
              isDarkMode ? 'bg-zinc-700/50' : 'bg-indigo-50'
            }`}>
              <Sparkles size={32} className={isDarkMode ? 'text-zinc-500' : 'text-indigo-400'} />
            </div>
            <p className={`text-lg font-medium ${isDarkMode ? 'text-zinc-400' : 'text-gray-700'}`}>
              No plans available
            </p>
            <p className={`text-sm mt-2 ${isDarkMode ? 'text-zinc-500' : 'text-gray-500'}`}>
              Create your first subscription plan to get started
            </p>
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {plans.map((plan, index) => (
              <div
                key={plan._id}
                className={`group relative rounded-2xl p-6 border transition-all duration-300 hover:scale-105 ${
                  isDarkMode
                    ? 'bg-zinc-800/50 border-zinc-700/50 hover:bg-zinc-800 hover:border-pink-500/30 hover:shadow-xl hover:shadow-pink-500/10'
                    : 'bg-white border-indigo-100 hover:border-indigo-300 shadow-lg shadow-indigo-100/20 hover:shadow-xl hover:shadow-indigo-200/30'
                }`}
              >
                

                {/* Plan Header */}
                <div className="mb-6">
                  <h3 className={`text-2xl font-bold mb-2 ${
                    isDarkMode ? 'text-white' : 'text-gray-900'
                  }`}>
                    {plan.name}
                  </h3>
                  <div className="flex items-baseline gap-1">
                    <span className={`text-4xl font-bold ${
                      isDarkMode ? 'text-pink-400' : 'text-indigo-600'
                    }`}>
                      ₹{Number(plan.price).toLocaleString('en-IN')}
                    </span>
                    <span className={`text-sm ${isDarkMode ? 'text-zinc-400' : 'text-gray-600'}`}>
                      / {plan.durationInDays} days
                    </span>
                  </div>
                </div>

                {/* Features List */}
                <div className="space-y-3 mb-6">
                  <div className={`flex items-center gap-3 p-3 rounded-lg ${
                    isDarkMode ? 'bg-zinc-900/50' : 'bg-indigo-50'
                  }`}>
                    <div className={`p-2 rounded-lg ${
                      isDarkMode ? 'bg-blue-500/10' : 'bg-blue-100'
                    }`}>
                      <Calendar size={18} className={isDarkMode ? 'text-blue-400' : 'text-blue-600'} />
                    </div>
                    <div className="flex-1">
                      <p className={`text-xs ${isDarkMode ? 'text-zinc-500' : 'text-gray-500'}`}>
                        Duration
                      </p>
                      <p className={`text-sm font-semibold ${
                        isDarkMode ? 'text-zinc-200' : 'text-gray-900'
                      }`}>
                        {plan.durationInDays} days
                      </p>
                    </div>
                  </div>

                  <div className={`flex items-center gap-3 p-3 rounded-lg ${
                    isDarkMode ? 'bg-zinc-900/50' : 'bg-pink-50'
                  }`}>
                    <div className={`p-2 rounded-lg ${
                      isDarkMode ? 'bg-pink-500/10' : 'bg-pink-100'
                    }`}>
                      <UserCheck size={18} className={isDarkMode ? 'text-pink-400' : 'text-pink-600'} />
                    </div>
                    <div className="flex-1">
                      <p className={`text-xs ${isDarkMode ? 'text-zinc-500' : 'text-gray-500'}`}>
                        Max Managers
                      </p>
                      <p className={`text-sm font-semibold ${
                        isDarkMode ? 'text-zinc-200' : 'text-gray-900'
                      }`}>
                        {plan.maxManagers} managers
                      </p>
                    </div>
                  </div>

                  <div className={`flex items-center gap-3 p-3 rounded-lg ${
                    isDarkMode ? 'bg-zinc-900/50' : 'bg-purple-50'
                  }`}>
                    <div className={`p-2 rounded-lg ${
                      isDarkMode ? 'bg-purple-500/10' : 'bg-purple-100'
                    }`}>
                      <Users size={18} className={isDarkMode ? 'text-purple-400' : 'text-purple-600'} />
                    </div>
                    <div className="flex-1">
                      <p className={`text-xs ${isDarkMode ? 'text-zinc-500' : 'text-gray-500'}`}>
                        Max Employees
                      </p>
                      <p className={`text-sm font-semibold ${
                        isDarkMode ? 'text-zinc-200' : 'text-gray-900'
                      }`}>
                        {plan.maxEmployees} employees
                      </p>
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-2">
                  <button
                    onClick={() => handleEditClick(plan)}
                    className={`flex-1 px-4 py-2.5 rounded-lg font-medium transition-all ${
                      isDarkMode
                        ? 'bg-zinc-700 hover:bg-zinc-600 text-zinc-200'
                        : 'bg-indigo-100 hover:bg-indigo-200 text-indigo-700'
                    }`}
                  >
                    <Edit size={16} className="inline mr-1" />
                    Edit
                  </button>
                  <button
                    onClick={() => setDeletingPlan(plan)}
                    className={`flex-1 px-4 py-2.5 rounded-lg font-medium transition-all ${
                      isDarkMode
                        ? 'bg-red-900/30 hover:bg-red-900/50 text-red-400'
                        : 'bg-red-100 hover:bg-red-200 text-red-700'
                    }`}
                  >
                    <Trash2 size={16} className="inline mr-1" />
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Create Plan Modal */}
        {showForm && (
          <div className="fixed inset-0 flex items-center justify-center bg-black/60 backdrop-blur-sm z-50 p-4">
            <div
              className={`w-full max-w-lg rounded-2xl shadow-2xl relative ${
                isDarkMode 
                  ? 'bg-zinc-900 border border-zinc-700' 
                  : 'bg-white border border-indigo-100'
              }`}
            >
              {/* Modal Header */}
              <div className={`p-6 border-b ${
                isDarkMode ? 'border-zinc-700' : 'border-indigo-100'
              }`}>
                <button
                  onClick={() => setShowForm(false)}
                  className={`absolute top-4 right-4 p-2 rounded-lg transition-colors ${
                    isDarkMode 
                      ? 'text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800' 
                      : 'text-gray-400 hover:text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  <X size={20} />
                </button>

                <div className="flex items-center gap-3">
                  <div className={`p-3 rounded-xl ${
                    isDarkMode 
                      ? 'bg-gradient-to-br from-pink-500/10 to-purple-500/10' 
                      : 'bg-gradient-to-br from-indigo-50 to-purple-50'
                  }`}>
                    <Sparkles size={24} className={
                      isDarkMode ? 'text-pink-400' : 'text-indigo-600'
                    } />
                  </div>
                  <div>
                    <h2 className={`text-2xl font-bold ${
                      isDarkMode ? 'text-white' : 'text-gray-900'
                    }`}>
                      Create New Plan
                    </h2>
                    <p className={`text-sm ${
                      isDarkMode ? 'text-zinc-400' : 'text-gray-600'
                    }`}>
                      Set up a new subscription plan
                    </p>
                  </div>
                </div>
              </div>

              {/* Modal Body */}
              <form onSubmit={handleCreatePlan} className="p-6 space-y-4">
                <div>
                  <label className={`block text-sm font-medium mb-2 ${
                    isDarkMode ? 'text-zinc-300' : 'text-gray-700'
                  }`}>
                    Plan Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
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
                    <label className={`block text-sm font-medium mb-2 ${
                      isDarkMode ? 'text-zinc-300' : 'text-gray-700'
                    }`}>
                      Price (₹)
                    </label>
                    <input
                      type="number"
                      name="price"
                      value={formData.price}
                      onChange={handleInputChange}
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
                    <label className={`block text-sm font-medium mb-2 ${
                      isDarkMode ? 'text-zinc-300' : 'text-gray-700'
                    }`}>
                      Duration (days)
                    </label>
                    <input
                      type="number"
                      name="durationInDays"
                      value={formData.durationInDays}
                      onChange={handleInputChange}
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
                    <label className={`block text-sm font-medium mb-2 ${
                      isDarkMode ? 'text-zinc-300' : 'text-gray-700'
                    }`}>
                      Max Managers
                    </label>
                    <input
                      type="number"
                      name="maxManagers"
                      value={formData.maxManagers}
                      onChange={handleInputChange}
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
                    <label className={`block text-sm font-medium mb-2 ${
                      isDarkMode ? 'text-zinc-300' : 'text-gray-700'
                    }`}>
                      Max Employees
                    </label>
                    <input
                      type="number"
                      name="maxEmployees"
                      value={formData.maxEmployees}
                      onChange={handleInputChange}
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
                <div className={`flex gap-3 pt-4 border-t ${
                  isDarkMode ? 'border-zinc-700' : 'border-indigo-100'
                }`}>
                  <button
                    type="button"
                    onClick={() => setShowForm(false)}
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
        )}

        {/* Edit Plan Modal */}
        {editingPlan && (
          <div className="fixed inset-0 flex items-center justify-center bg-black/60 backdrop-blur-sm z-50 p-4">
            <div
              className={`w-full max-w-lg rounded-2xl shadow-2xl relative ${
                isDarkMode ? 'bg-zinc-900 border border-zinc-700' : 'bg-white border border-indigo-100'
              }`}
            >
              {/* Modal Header */}
              <div className={`p-6 border-b ${isDarkMode ? 'border-zinc-700' : 'border-indigo-100'}`}>
                <button
                  onClick={() => setEditingPlan(null)}
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
                    <Edit size={24} className={isDarkMode ? 'text-pink-400' : 'text-indigo-600'} />
                  </div>
                  <div>
                    <h2 className={`text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                      Edit Plan
                    </h2>
                    <p className={`text-sm ${isDarkMode ? 'text-zinc-400' : 'text-gray-600'}`}>
                      Update the details for "{editingPlan.name}"
                    </p>
                  </div>
                </div>
              </div>

              {/* Modal Body */}
              <form onSubmit={handleUpdatePlan} className="p-6 space-y-4">
                <div>
                  <label className={`block text-sm font-medium mb-2 ${isDarkMode ? 'text-zinc-300' : 'text-gray-700'}`}>
                    Plan Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
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
                    <label className={`block text-sm font-medium mb-2 ${isDarkMode ? 'text-zinc-300' : 'text-gray-700'}`}>
                      Price (₹)
                    </label>
                    <input
                      type="number"
                      name="price"
                      value={formData.price}
                      onChange={handleInputChange}
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
                    <label className={`block text-sm font-medium mb-2 ${isDarkMode ? 'text-zinc-300' : 'text-gray-700'}`}>
                      Duration (days)
                    </label>
                    <input
                      type="number"
                      name="durationInDays"
                      value={formData.durationInDays}
                      onChange={handleInputChange}
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
                    <label className={`block text-sm font-medium mb-2 ${isDarkMode ? 'text-zinc-300' : 'text-gray-700'}`}>
                      Max Managers
                    </label>
                    <input
                      type="number"
                      name="maxManagers"
                      value={formData.maxManagers}
                      onChange={handleInputChange}
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
                    <label className={`block text-sm font-medium mb-2 ${isDarkMode ? 'text-zinc-300' : 'text-gray-700'}`}>
                      Max Employees
                    </label>
                    <input
                      type="number"
                      name="maxEmployees"
                      value={formData.maxEmployees}
                      onChange={handleInputChange}
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
                <div className={`flex gap-3 pt-4 border-t ${isDarkMode ? 'border-zinc-700' : 'border-indigo-100'}`}>
                  <button
                    type="button"
                    onClick={() => setEditingPlan(null)}
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
                    {submitting ? 'Updating...' : 'Update Plan'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Delete Confirmation Modal */}
        {deletingPlan && (
          <div className="fixed inset-0 flex items-center justify-center bg-black/60 backdrop-blur-sm z-50 p-4">
            <div
              className={`w-full max-w-md rounded-2xl shadow-2xl relative ${
                isDarkMode ? 'bg-zinc-900 border border-zinc-700' : 'bg-white border'
              }`}
            >
              <div className="p-6 text-center">
                <div
                  className={`w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center ${
                    isDarkMode ? 'bg-red-500/10' : 'bg-red-100'
                  }`}
                >
                  <AlertTriangle size={32} className="text-red-500" />
                </div>
                <h3 className={`text-xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                  Delete Plan
                </h3>
                <p className={`mt-2 text-sm ${isDarkMode ? 'text-zinc-400' : 'text-gray-600'}`}>
                  Are you sure you want to delete the "<strong>{deletingPlan.name}</strong>" plan? This action cannot be undone.
                </p>
              </div>

              {/* Modal Footer */}
              <div
                className={`flex gap-3 p-4 border-t ${
                  isDarkMode ? 'border-zinc-700 bg-zinc-900/50' : 'border-gray-200 bg-gray-50'
                } rounded-b-2xl`}
              >
                <button
                  type="button"
                  onClick={() => setDeletingPlan(null)}
                  className={`flex-1 px-6 py-2.5 rounded-lg font-semibold transition-all ${
                    isDarkMode
                      ? 'bg-zinc-800 hover:bg-zinc-700 text-zinc-200'
                      : 'bg-gray-200 hover:bg-gray-300 text-gray-800'
                  }`}
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleDeletePlan}
                  disabled={submitting}
                  className={`flex-1 px-6 py-2.5 rounded-lg font-semibold text-white transition-all flex items-center justify-center gap-2 ${
                    isDarkMode
                      ? 'bg-red-600 hover:bg-red-700 disabled:bg-red-800'
                      : 'bg-red-500 hover:bg-red-600 disabled:bg-red-400'
                  }`}
                >
                  {submitting ? (
                    <><div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div> Deleting...</>
                  ) : (
                    'Delete'
                  )}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Plan;
