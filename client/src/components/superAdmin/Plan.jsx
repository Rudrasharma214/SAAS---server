import React, { useEffect, useState } from 'react';
import { createPlan, getAllPlans } from '../../services/superAdminServices';
import { useTheme } from '../../context/themeContext';
import { Plus, X } from 'lucide-react';

const Plan = () => {
  const { isDarkMode } = useTheme();

  const [plans, setPlans] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showForm, setShowForm] = useState(false);
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

  return (
    <div className={`min-h-60vh p-6 transition-colors overflow-hidden bg-transparent`}>
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold tracking-wide">Subscription Plans</h2>
        <button
          onClick={() => setShowForm(true)}
          className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-pink-600 to-purple-600 text-white rounded-xl shadow-lg hover:shadow-pink-500/30 transition-all duration-300"
        >
          <Plus size={18} /> Create Plan
        </button>
      </div>

      {/* Plans List */}
      {loading ? (
        <div className="text-center text-zinc-400 py-12 text-lg">Loading plans...</div>
      ) : plans.length === 0 ? (
        <div className="text-center text-zinc-500 py-12 text-lg">No plans available.</div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {plans.map((plan) => (
            <div
              key={plan._id}
              className={`rounded-2xl p-6 shadow-lg backdrop-blur-sm border ${
                isDarkMode
                  ? 'bg-zinc-900/40 border-zinc-700/50 hover:bg-zinc-800/50'
                  : 'bg-white/60 border-zinc-300 hover:bg-zinc-100/80'
              } transition-all duration-300`}
            >
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-semibold">{plan.name}</h3>
                <span className="text-lg font-medium text-pink-500">
                  ₹{Number(plan.price).toLocaleString('en-IN')}
                </span>
              </div>

              <div className={`space-y-1 text-sm ${!isDarkMode ? 'text-black' : 'text-zinc-400'}`}>
                <p>Duration: {plan.durationInDays} days</p>
                <p>Managers: {plan.maxManagers}</p>
                <p>Employees: {plan.maxEmployees}</p>
              </div>

              <div className="flex gap-2 mt-4">
                <button className="flex-1 px-3 py-1 rounded-lg bg-indigo-600 hover:bg-indigo-500 transition">
                  Edit
                </button>
                <button className="flex-1 px-3 py-1 rounded-lg bg-red-600 hover:bg-red-500 transition">
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Create Plan Modal */}
      {showForm && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm z-50">
          <div
            className={`w-full max-w-lg p-6 rounded-2xl shadow-xl border relative ${
              isDarkMode ? 'bg-zinc-900/90 border-zinc-700' : 'bg-white border-zinc-300'
            }`}
          >
            <button
              onClick={() => setShowForm(false)}
              className="absolute top-4 right-4 text-zinc-400 hover:text-zinc-200"
            >
              <X size={22} />
            </button>

            <h2 className="text-2xl font-semibold mb-4 text-center">Create New Plan</h2>

            <form onSubmit={handleCreatePlan} className="grid grid-cols-1 gap-4">
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                placeholder="Plan Name"
                className="px-4 py-2 bg-zinc-800 text-zinc-100 border border-zinc-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
                required
              />
              <input
                type="number"
                name="price"
                value={formData.price}
                onChange={handleInputChange}
                placeholder="Price"
                className="px-4 py-2 bg-zinc-800 text-zinc-100 border border-zinc-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
                required
              />
              <input
                type="number"
                name="durationInDays"
                value={formData.durationInDays}
                onChange={handleInputChange}
                placeholder="Duration (days)"
                className="px-4 py-2 bg-zinc-800 text-zinc-100 border border-zinc-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
                required
              />
              <input
                type="number"
                name="maxManagers"
                value={formData.maxManagers}
                onChange={handleInputChange}
                placeholder="Max Managers"
                className="px-4 py-2 bg-zinc-800 text-zinc-100 border border-zinc-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
                required
              />
              <input
                type="number"
                name="maxEmployees"
                value={formData.maxEmployees}
                onChange={handleInputChange}
                placeholder="Max Employees"
                className="px-4 py-2 bg-zinc-800 text-zinc-100 border border-zinc-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
                required
              />
              <button
                type="submit"
                disabled={submitting}
                className="mt-2 px-6 py-2 bg-gradient-to-r from-pink-600 to-purple-600 text-white rounded-lg font-semibold hover:shadow-pink-500/40 shadow-md transition"
              >
                {submitting ? 'Creating...' : 'Create Plan'}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Plan;
