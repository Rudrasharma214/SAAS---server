import React, { useEffect, useState } from 'react';
import { createPlan, getAllPlans } from '../../services/superAdminServices';

const Plan = () => {
  const [plans, setPlans] = useState([]);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    durationInDays: '',
    maxManagers: '',
    maxEmployees: '',
  });
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    fetchPlans();
  }, []);

  const fetchPlans = async () => {
    try {
      setLoading(true);
      const data = await getAllPlans();
      setPlans(data.data.plans || []);
      setLoading(false);
    } catch (err) {
      console.error('Error fetching plans:', err);
      setPlans([]);
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
      fetchPlans();
      setSubmitting(false);
    } catch (err) {
      console.error('Error creating plan:', err);
      setSubmitting(false);
    }
  };

  return (
    <div className="p-4 text-zinc-200">
      {/* Create Plan Form */}
      <div className="max-w-full bg-zinc-900/20 rounded-2xl p-6 shadow-lg border border-zinc-800/50 mb-6">
        <h2 className="text-2xl font-semibold text-zinc-100 mb-4">Create New Plan</h2>
        <form onSubmit={handleCreatePlan} className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
            className="col-span-1 md:col-span-2 px-6 py-2 bg-pink-600 hover:bg-pink-500 rounded-lg font-semibold text-white transition"
          >
            {submitting ? 'Creating...' : 'Create Plan'}
          </button>
        </form>
      </div>

      {/* Plans Table */}
      <div className="max-w-full bg-zinc-900/20 rounded-2xl p-6 shadow-lg border border-zinc-800/50 overflow-x-auto">
        <h2 className="text-2xl font-semibold text-zinc-100 mb-4">All Plans</h2>

        {loading ? (
          <div className="text-center text-zinc-400 py-8">Loading plans...</div>
        ) : !plans || plans.length === 0 ? (
          <div className="text-center text-zinc-400 py-8">No plans found.</div>
        ) : (
          <table className="min-w-full table-auto border-collapse">
            <thead>
              <tr className="bg-zinc-800/50 text-zinc-400">
                <th className="px-4 py-2 text-left">Name</th>
                <th className="px-4 py-2 text-left">Price</th>
                <th className="px-4 py-2 text-left">Duration (days)</th>
                <th className="px-4 py-2 text-left">Max Managers</th>
                <th className="px-4 py-2 text-left">Max Employees</th>
                <th className="px-4 py-2 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {plans.map((plan) => (
                <tr key={plan._id} className="hover:bg-zinc-800/50 border-b border-zinc-700">
                  <td className="px-4 py-2">{plan.name}</td>
                  <td className="px-4 py-2">₹{plan.price}</td>
                  <td className="px-4 py-2">{plan.durationInDays}</td>
                  <td className="px-4 py-2">{plan.maxManagers}</td>
                  <td className="px-4 py-2">{plan.maxEmployees}</td>
                  <td className="px-4 py-2 flex gap-2">
                    <button className="px-3 py-1 bg-indigo-600 text-white rounded-md shadow-sm hover:bg-indigo-500 transition-all duration-200">
                      Edit
                    </button>
                    <button className="px-3 py-1 bg-red-600 text-white rounded-md shadow-sm hover:bg-red-500 transition-all duration-200">
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default Plan;
