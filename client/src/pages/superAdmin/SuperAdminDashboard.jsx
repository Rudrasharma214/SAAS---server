import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/authContext';
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from 'recharts';
import {
  Users,
  Building2,
  TrendingUp,
  DollarSign,
  Activity,
  Calendar,
  Eye,
  UserCheck,
  Settings,
  LogOut,
  ChevronDown,
  Bell,
  Search,
} from 'lucide-react';

const SuperAdminDashboard = () => {
  const { user, handleLogout } = useAuth();
  const [timeFilter, setTimeFilter] = useState('Last 1 month');
  const [showUserMenu, setShowUserMenu] = useState(false);

  // Mock data - replace with actual API calls
  const [dashboardData, setDashboardData] = useState({
    totalCompanies: 42010,
    activeCompanies: 23000,
    inactiveCompanies: 19010,
    totalRevenue: 145000,
    revenueGrowth: 12.5,
    monthlyRevenue: [
      { name: 'Jan', revenue: 120000, companies: 380 },
      { name: 'Feb', revenue: 125000, companies: 420 },
      { name: 'Mar', revenue: 130000, companies: 450 },
      { name: 'Apr', revenue: 135000, companies: 480 },
      { name: 'May', revenue: 140000, companies: 520 },
      { name: 'Jun', revenue: 145000, companies: 560 },
    ],
    companyTypes: [
      { name: 'Enterprise', value: 35, color: '#10B981' },
      { name: 'SMB', value: 45, color: '#3B82F6' },
      { name: 'Startup', value: 20, color: '#F59E0B' },
    ],
  });

  const StatCard = ({ title, value, growth, icon: Icon, color = 'blue' }) => (
    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-600">{title}</p>
          <p className="text-3xl font-bold text-gray-900 mt-2">
            {typeof value === 'number' ? value.toLocaleString() : value}
          </p>
          {growth && (
            <div className="flex items-center mt-2">
              <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
              <span className="text-sm text-green-600">+{growth}%</span>
              <span className="text-sm text-gray-500 ml-1">vs last month</span>
            </div>
          )}
        </div>
        <div className={`p-3 rounded-full bg-${color}-100`}>
          <Icon className={`h-6 w-6 text-${color}-600`} />
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-r from-orange-500 to-red-500 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">M</span>
              </div>
              <span className="text-xl font-bold text-gray-900">Montra</span>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            {/* Time Filter */}
            <div className="relative">
              <button
                onClick={() => setTimeFilter(timeFilter)}
                className="flex items-center space-x-2 px-4 py-2 bg-gray-100 rounded-lg text-sm font-medium"
              >
                <Calendar className="h-4 w-4" />
                <span>{timeFilter}</span>
                <ChevronDown className="h-4 w-4" />
              </button>
            </div>

            {/* Date Range */}
            <div className="text-sm text-gray-500">1 May 2024 - 1 Jun 2024</div>

            {/* Notifications */}
            <button className="p-2 hover:bg-gray-100 rounded-lg">
              <Bell className="h-5 w-5 text-gray-600" />
            </button>

            {/* User Menu */}
            <div className="relative">
              <button
                onClick={() => setShowUserMenu(!showUserMenu)}
                className="flex items-center space-x-2 p-2 hover:bg-gray-100 rounded-lg"
              >
                <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
                  <span className="text-white text-sm font-medium">
                    {user?.name?.charAt(0) || 'A'}
                  </span>
                </div>
                <span className="text-sm font-medium">Welcome back, {user?.name || 'Admin'}!</span>
              </button>

              {showUserMenu && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50">
                  <button className="flex items-center space-x-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 w-full">
                    <Settings className="h-4 w-4" />
                    <span>Settings</span>
                  </button>
                  <button
                    onClick={handleLogout}
                    className="flex items-center space-x-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 w-full"
                  >
                    <LogOut className="h-4 w-4" />
                    <span>Sign out</span>
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar */}
        <aside className="w-64 bg-white border-r border-gray-200 min-h-screen">
          <div className="p-6">
            <nav className="space-y-2">
              <div className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-4">
                Main Menu
              </div>

              <a
                href="#"
                className="flex items-center space-x-3 px-3 py-2 bg-orange-50 text-orange-600 rounded-lg font-medium"
              >
                <Activity className="h-5 w-5" />
                <span>Dashboard</span>
              </a>

              <a
                href="#"
                className="flex items-center space-x-3 px-3 py-2 text-gray-600 hover:bg-gray-50 rounded-lg"
              >
                <Building2 className="h-5 w-5" />
                <span>Companies</span>
              </a>

              <a
                href="#"
                className="flex items-center space-x-3 px-3 py-2 text-gray-600 hover:bg-gray-50 rounded-lg"
              >
                <Users className="h-5 w-5" />
                <span>Users</span>
              </a>

              <a
                href="#"
                className="flex items-center space-x-3 px-3 py-2 text-gray-600 hover:bg-gray-50 rounded-lg"
              >
                <DollarSign className="h-5 w-5" />
                <span>Revenue</span>
              </a>

              <a
                href="#"
                className="flex items-center space-x-3 px-3 py-2 text-gray-600 hover:bg-gray-50 rounded-lg"
              >
                <TrendingUp className="h-5 w-5" />
                <span>Transactions</span>
              </a>
            </nav>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-6">
          <div className="mb-8">
            <h1 className="text-2xl font-bold text-gray-900 mb-2">Companies</h1>
            <p className="text-gray-600">Monitor • Companies</p>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <StatCard
              title="Total Companies"
              value={dashboardData.totalCompanies}
              icon={Building2}
              color="blue"
            />
            <StatCard
              title="Active Companies"
              value={dashboardData.activeCompanies}
              growth={8.2}
              icon={UserCheck}
              color="green"
            />
            <StatCard
              title="Inactive Companies"
              value={dashboardData.inactiveCompanies}
              icon={Users}
              color="red"
            />
            <StatCard
              title="Monthly Revenue"
              value={`$${dashboardData.totalRevenue.toLocaleString()}`}
              growth={dashboardData.revenueGrowth}
              icon={DollarSign}
              color="emerald"
            />
          </div>

          {/* Charts Section */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Revenue Chart */}
            <div className="lg:col-span-2 bg-white rounded-xl p-6 shadow-sm border border-gray-100">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-gray-900">Revenue Growth</h3>
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 bg-emerald-500 rounded-full"></div>
                    <span className="text-sm text-gray-600">Revenue</span>
                  </div>
                  <div className="text-sm font-semibold text-emerald-600">+20%</div>
                </div>
              </div>

              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={dashboardData.monthlyRevenue}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                    <XAxis
                      dataKey="name"
                      axisLine={false}
                      tickLine={false}
                      tick={{ fontSize: 12, fill: '#6b7280' }}
                    />
                    <YAxis
                      axisLine={false}
                      tickLine={false}
                      tick={{ fontSize: 12, fill: '#6b7280' }}
                      tickFormatter={(value) => `$${value / 1000}k`}
                    />
                    <Tooltip
                      formatter={(value) => [`$${value.toLocaleString()}`, 'Revenue']}
                      labelStyle={{ color: '#374151' }}
                      contentStyle={{
                        backgroundColor: 'white',
                        border: '1px solid #e5e7eb',
                        borderRadius: '8px',
                        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
                      }}
                    />
                    <Line
                      type="monotone"
                      dataKey="revenue"
                      stroke="#10b981"
                      strokeWidth={3}
                      dot={{ fill: '#10b981', strokeWidth: 2, r: 4 }}
                      activeDot={{ r: 6, stroke: '#10b981', strokeWidth: 2 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Company Types Pie Chart */}
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
              <h3 className="text-lg font-semibold text-gray-900 mb-6">Company Types</h3>

              <div className="h-48 mb-6">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={dashboardData.companyTypes}
                      cx="50%"
                      cy="50%"
                      innerRadius={40}
                      outerRadius={80}
                      paddingAngle={5}
                      dataKey="value"
                    >
                      {dashboardData.companyTypes.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip formatter={(value) => [`${value}%`, 'Share']} />
                  </PieChart>
                </ResponsiveContainer>
              </div>

              <div className="space-y-3">
                {dashboardData.companyTypes.map((type, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <div
                        className="w-3 h-3 rounded-full"
                        style={{ backgroundColor: type.color }}
                      ></div>
                      <span className="text-sm text-gray-600">{type.name}</span>
                    </div>
                    <span className="text-sm font-semibold text-gray-900">{type.value}%</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Recent Activity */}
          <div className="mt-8 bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Company Activity</h3>

            <div className="space-y-4">
              {[
                {
                  company: 'TechCorp Inc.',
                  action: 'Upgraded to Enterprise plan',
                  time: '2 hours ago',
                  status: 'success',
                },
                {
                  company: 'StartupXYZ',
                  action: 'New registration',
                  time: '4 hours ago',
                  status: 'info',
                },
                {
                  company: 'MegaEnterprise',
                  action: 'Payment received',
                  time: '6 hours ago',
                  status: 'success',
                },
                {
                  company: 'SmallBiz Ltd.',
                  action: 'Subscription expired',
                  time: '1 day ago',
                  status: 'warning',
                },
              ].map((activity, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between py-3 border-b border-gray-100 last:border-b-0"
                >
                  <div className="flex items-center space-x-3">
                    <div
                      className={`w-2 h-2 rounded-full ${
                        activity.status === 'success'
                          ? 'bg-green-500'
                          : activity.status === 'warning'
                            ? 'bg-yellow-500'
                            : 'bg-blue-500'
                      }`}
                    ></div>
                    <div>
                      <p className="text-sm font-medium text-gray-900">{activity.company}</p>
                      <p className="text-sm text-gray-600">{activity.action}</p>
                    </div>
                  </div>
                  <div className="text-sm text-gray-500">{activity.time}</div>
                </div>
              ))}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default SuperAdminDashboard;
