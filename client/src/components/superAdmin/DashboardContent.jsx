import React, { useState } from 'react';
import { useTheme } from '../../context/themeContext';
import {
  TrendingUp,
  TrendingDown,
  Building2,
  DollarSign,
  Users,
  CreditCard,
  Activity,
  Clock,
  CheckCircle,
  AlertCircle,
  ArrowUpRight,
  ArrowDownRight,
} from 'lucide-react';

const DashboardContent = () => {
  const { isDarkMode } = useTheme();

  // Dummy data
  const stats = [
    {
      title: 'Total Companies',
      value: '1,234',
      change: '+12.5%',
      trend: 'up',
      icon: Building2,
      color: 'blue',
    },
    {
      title: 'Active Subscriptions',
      value: '956',
      change: '+8.2%',
      trend: 'up',
      icon: CreditCard,
      color: 'green',
    },
    {
      title: 'Monthly Revenue',
      value: '₹8,45,000',
      change: '+15.3%',
      trend: 'up',
      icon: DollarSign,
      color: 'purple',
    },
    {
      title: 'Total Users',
      value: '12,458',
      change: '-2.4%',
      trend: 'down',
      icon: Users,
      color: 'pink',
    },
  ];

  const recentCompanies = [
    {
      id: 1,
      name: 'Tech Solutions Inc',
      owner: 'John Doe',
      plan: 'Premium',
      status: 'active',
      joinedDate: '2025-10-08',
    },
    {
      id: 2,
      name: 'Digital Marketing Pro',
      owner: 'Jane Smith',
      plan: 'Basic',
      status: 'active',
      joinedDate: '2025-10-07',
    },
    {
      id: 3,
      name: 'Creative Designs Ltd',
      owner: 'Mike Johnson',
      plan: 'Enterprise',
      status: 'active',
      joinedDate: '2025-10-06',
    },
    {
      id: 4,
      name: 'Startup Hub',
      owner: 'Sarah Williams',
      plan: 'Basic',
      status: 'pending',
      joinedDate: '2025-10-05',
    },
    {
      id: 5,
      name: 'E-Commerce Express',
      owner: 'David Brown',
      plan: 'Premium',
      status: 'active',
      joinedDate: '2025-10-04',
    },
  ];

  const recentActivities = [
    {
      id: 1,
      type: 'subscription',
      message: 'New subscription to Premium plan',
      company: 'Tech Solutions Inc',
      time: '5 minutes ago',
      icon: CheckCircle,
      color: 'green',
    },
    {
      id: 2,
      type: 'registration',
      message: 'New company registered',
      company: 'Digital Marketing Pro',
      time: '1 hour ago',
      icon: Building2,
      color: 'blue',
    },
    {
      id: 3,
      type: 'payment',
      message: 'Payment received ₹25,000',
      company: 'Creative Designs Ltd',
      time: '2 hours ago',
      icon: DollarSign,
      color: 'purple',
    },
    {
      id: 4,
      type: 'expiring',
      message: 'Subscription expiring in 3 days',
      company: 'Startup Hub',
      time: '3 hours ago',
      icon: AlertCircle,
      color: 'yellow',
    },
    {
      id: 5,
      type: 'upgrade',
      message: 'Plan upgraded to Enterprise',
      company: 'E-Commerce Express',
      time: '5 hours ago',
      icon: TrendingUp,
      color: 'green',
    },
  ];

  const planDistribution = [
    { name: 'Free', count: 278, percentage: 22.5, color: 'gray' },
    { name: 'Basic', count: 456, percentage: 37.0, color: 'blue' },
    { name: 'Premium', count: 345, percentage: 28.0, color: 'purple' },
    { name: 'Enterprise', count: 155, percentage: 12.5, color: 'pink' },
  ];

  const getColorClasses = (color) => {
    const colors = {
      blue: {
        bg: isDarkMode ? 'bg-blue-500/10' : 'bg-blue-50',
        text: isDarkMode ? 'text-blue-400' : 'text-blue-600',
        border: isDarkMode ? 'border-blue-500/20' : 'border-blue-200',
      },
      green: {
        bg: isDarkMode ? 'bg-green-500/10' : 'bg-green-50',
        text: isDarkMode ? 'text-green-400' : 'text-green-600',
        border: isDarkMode ? 'border-green-500/20' : 'border-green-200',
      },
      purple: {
        bg: isDarkMode ? 'bg-purple-500/10' : 'bg-purple-50',
        text: isDarkMode ? 'text-purple-400' : 'text-purple-600',
        border: isDarkMode ? 'border-purple-500/20' : 'border-purple-200',
      },
      pink: {
        bg: isDarkMode ? 'bg-pink-500/10' : 'bg-pink-50',
        text: isDarkMode ? 'text-pink-400' : 'text-pink-600',
        border: isDarkMode ? 'border-pink-500/20' : 'border-pink-200',
      },
      yellow: {
        bg: isDarkMode ? 'bg-yellow-500/10' : 'bg-yellow-50',
        text: isDarkMode ? 'text-yellow-400' : 'text-yellow-600',
        border: isDarkMode ? 'border-yellow-500/20' : 'border-yellow-200',
      },
      gray: {
        bg: isDarkMode ? 'bg-gray-500/10' : 'bg-gray-50',
        text: isDarkMode ? 'text-gray-400' : 'text-gray-600',
        border: isDarkMode ? 'border-gray-500/20' : 'border-gray-200',
      },
    };
    return colors[color] || colors.blue;
  };

  return (
    <div className="h-full w-full overflow-auto p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="mb-8">
          <h1 className={`text-3xl font-bold mb-2 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
            Super Admin Dashboard
          </h1>
          <p className={`${isDarkMode ? 'text-zinc-400' : 'text-gray-600'}`}>
            Overview of your platform's performance and activity
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            const colorClasses = getColorClasses(stat.color);
            return (
              <div
                key={index}
                className={`rounded-xl p-6 border transition-all duration-300 hover:scale-105 ${
                  isDarkMode
                    ? 'bg-zinc-800/50 border-zinc-700/50 hover:border-zinc-600'
                    : 'bg-white border-indigo-100 shadow-lg shadow-indigo-100/20 hover:shadow-xl'
                }`}
              >
                <div className="flex items-start justify-between mb-4">
                  <div className={`p-3 rounded-lg ${colorClasses.bg}`}>
                    <Icon size={24} className={colorClasses.text} />
                  </div>
                  <div
                    className={`flex items-center gap-1 px-2 py-1 rounded-full text-xs font-semibold ${
                      stat.trend === 'up'
                        ? isDarkMode
                          ? 'bg-green-500/10 text-green-400'
                          : 'bg-green-50 text-green-600'
                        : isDarkMode
                          ? 'bg-red-500/10 text-red-400'
                          : 'bg-red-50 text-red-600'
                    }`}
                  >
                    {stat.trend === 'up' ? (
                      <ArrowUpRight size={14} />
                    ) : (
                      <ArrowDownRight size={14} />
                    )}
                    {stat.change}
                  </div>
                </div>
                <div>
                  <p className={`text-sm mb-1 ${isDarkMode ? 'text-zinc-400' : 'text-gray-600'}`}>
                    {stat.title}
                  </p>
                  <p
                    className={`text-3xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}
                  >
                    {stat.value}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Middle Section - Charts & Activities */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Plan Distribution */}
          <div
            className={`lg:col-span-2 rounded-xl p-6 border ${
              isDarkMode
                ? 'bg-zinc-800/50 border-zinc-700/50'
                : 'bg-white border-indigo-100 shadow-lg shadow-indigo-100/20'
            }`}
          >
            <h2 className={`text-lg font-bold mb-6 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
              Subscription Plan Distribution
            </h2>
            <div className="space-y-4">
              {planDistribution.map((plan, index) => {
                const colorClasses = getColorClasses(plan.color);
                return (
                  <div key={index}>
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-3">
                        <div
                          className={`w-3 h-3 rounded-full ${colorClasses.bg} ${colorClasses.border} border-2`}
                        ></div>
                        <span
                          className={`font-medium ${isDarkMode ? 'text-zinc-200' : 'text-gray-800'}`}
                        >
                          {plan.name}
                        </span>
                      </div>
                      <div className="flex items-center gap-3">
                        <span
                          className={`text-sm ${isDarkMode ? 'text-zinc-400' : 'text-gray-600'}`}
                        >
                          {plan.count} companies
                        </span>
                        <span className={`text-sm font-semibold ${colorClasses.text}`}>
                          {plan.percentage}%
                        </span>
                      </div>
                    </div>
                    <div
                      className={`w-full h-2 rounded-full overflow-hidden ${
                        isDarkMode ? 'bg-zinc-700' : 'bg-gray-200'
                      }`}
                    >
                      <div
                        className={`h-full rounded-full ${colorClasses.bg} ${colorClasses.border} border-r-2 transition-all duration-500`}
                        style={{ width: `${plan.percentage}%` }}
                      ></div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Recent Activities */}
          <div
            className={`rounded-xl p-6 border ${
              isDarkMode
                ? 'bg-zinc-800/50 border-zinc-700/50'
                : 'bg-white border-indigo-100 shadow-lg shadow-indigo-100/20'
            }`}
          >
            <h2 className={`text-lg font-bold mb-6 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
              Recent Activity
            </h2>
            <div className="space-y-4">
              {recentActivities.map((activity) => {
                const Icon = activity.icon;
                const colorClasses = getColorClasses(activity.color);
                return (
                  <div key={activity.id} className="flex gap-3">
                    <div className={`p-2 rounded-lg h-fit ${colorClasses.bg}`}>
                      <Icon size={16} className={colorClasses.text} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p
                        className={`text-sm font-medium mb-1 ${isDarkMode ? 'text-zinc-200' : 'text-gray-800'}`}
                      >
                        {activity.message}
                      </p>
                      <p
                        className={`text-xs ${isDarkMode ? 'text-zinc-500' : 'text-gray-500'} truncate`}
                      >
                        {activity.company}
                      </p>
                      <p
                        className={`text-xs mt-1 ${isDarkMode ? 'text-zinc-600' : 'text-gray-400'}`}
                      >
                        {activity.time}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Recent Companies Table */}
        <div
          className={`rounded-xl border overflow-hidden ${
            isDarkMode
              ? 'bg-zinc-800/50 border-zinc-700/50'
              : 'bg-white border-indigo-100 shadow-lg shadow-indigo-100/20'
          }`}
        >
          <div className="p-6 border-b ${isDarkMode ? 'border-zinc-700' : 'border-indigo-100'}">
            <h2 className={`text-lg font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
              Recent Companies
            </h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr
                  className={
                    isDarkMode
                      ? 'bg-zinc-900/50 border-b border-zinc-700'
                      : 'bg-gradient-to-r from-indigo-50 to-purple-50 border-b border-indigo-100'
                  }
                >
                  <th
                    className={`px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider ${
                      isDarkMode ? 'text-zinc-400' : 'text-gray-700'
                    }`}
                  >
                    Company
                  </th>
                  <th
                    className={`px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider ${
                      isDarkMode ? 'text-zinc-400' : 'text-gray-700'
                    }`}
                  >
                    Owner
                  </th>
                  <th
                    className={`px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider ${
                      isDarkMode ? 'text-zinc-400' : 'text-gray-700'
                    }`}
                  >
                    Plan
                  </th>
                  <th
                    className={`px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider ${
                      isDarkMode ? 'text-zinc-400' : 'text-gray-700'
                    }`}
                  >
                    Status
                  </th>
                  <th
                    className={`px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider ${
                      isDarkMode ? 'text-zinc-400' : 'text-gray-700'
                    }`}
                  >
                    Joined Date
                  </th>
                </tr>
              </thead>
              <tbody
                className={isDarkMode ? 'divide-y divide-zinc-700/50' : 'divide-y divide-indigo-50'}
              >
                {recentCompanies.map((company, index) => (
                  <tr
                    key={company.id}
                    className={`transition-colors ${
                      isDarkMode
                        ? 'hover:bg-zinc-700/30'
                        : index % 2 === 0
                          ? 'bg-white hover:bg-indigo-50/50'
                          : 'bg-slate-50/50 hover:bg-indigo-50/50'
                    }`}
                  >
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div
                          className={`w-10 h-10 rounded-lg flex items-center justify-center font-bold text-sm ${
                            isDarkMode
                              ? 'bg-gradient-to-br from-pink-500 to-purple-500 text-white'
                              : 'bg-gradient-to-br from-indigo-500 to-purple-500 text-white'
                          }`}
                        >
                          {company.name.charAt(0)}
                        </div>
                        <span
                          className={`font-semibold ${isDarkMode ? 'text-zinc-100' : 'text-gray-900'}`}
                        >
                          {company.name}
                        </span>
                      </div>
                    </td>
                    <td className={`px-6 py-4 ${isDarkMode ? 'text-zinc-300' : 'text-gray-700'}`}>
                      {company.owner}
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`inline-flex px-3 py-1 rounded-full text-xs font-semibold ${
                          company.plan === 'Enterprise'
                            ? isDarkMode
                              ? 'bg-pink-500/10 text-pink-400 border border-pink-500/20'
                              : 'bg-pink-50 text-pink-700 border border-pink-200'
                            : company.plan === 'Premium'
                              ? isDarkMode
                                ? 'bg-purple-500/10 text-purple-400 border border-purple-500/20'
                                : 'bg-purple-50 text-purple-700 border border-purple-200'
                              : isDarkMode
                                ? 'bg-blue-500/10 text-blue-400 border border-blue-500/20'
                                : 'bg-blue-50 text-blue-700 border border-blue-200'
                        }`}
                      >
                        {company.plan}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold ${
                          company.status === 'active'
                            ? isDarkMode
                              ? 'bg-green-500/10 text-green-400 border border-green-500/20'
                              : 'bg-green-50 text-green-700 border border-green-200'
                            : isDarkMode
                              ? 'bg-yellow-500/10 text-yellow-400 border border-yellow-500/20'
                              : 'bg-yellow-50 text-yellow-700 border border-yellow-200'
                        }`}
                      >
                        <div
                          className={`w-1.5 h-1.5 rounded-full ${
                            company.status === 'active'
                              ? isDarkMode
                                ? 'bg-green-400'
                                : 'bg-green-500'
                              : isDarkMode
                                ? 'bg-yellow-400'
                                : 'bg-yellow-500'
                          }`}
                        ></div>
                        {company.status}
                      </span>
                    </td>
                    <td className={`px-6 py-4 ${isDarkMode ? 'text-zinc-400' : 'text-gray-600'}`}>
                      {new Date(company.joinedDate).toLocaleDateString('en-IN', {
                        year: 'numeric',
                        month: 'short',
                        day: 'numeric',
                      })}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardContent;
