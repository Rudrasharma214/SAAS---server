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
  AreaChart,
  Area,
} from 'recharts';
import {
  Users,
  Clock,
  TrendingUp,
  Calendar,
  Activity,
  CheckCircle,
  AlertCircle,
  UserPlus,
  Settings,
  LogOut,
  ChevronDown,
  Bell,
  Download,
} from 'lucide-react';

const AdminDashboard = () => {
  const { user, handleLogout } = useAuth();
  const [timeFilter, setTimeFilter] = useState('Last 1 month');
  const [showUserMenu, setShowUserMenu] = useState(false);

  // Mock data - replace with actual API calls
  const [dashboardData, setDashboardData] = useState({
    totalEmployees: 1247,
    presentToday: 1156,
    absentToday: 91,
    lateArrivals: 23,
    attendanceRate: 92.7,
    weeklyAttendance: [
      { day: 'Mon', present: 1200, absent: 47, late: 15 },
      { day: 'Tue', present: 1180, absent: 67, late: 20 },
      { day: 'Wed', present: 1220, absent: 27, late: 12 },
      { day: 'Thu', present: 1156, absent: 91, late: 23 },
      { day: 'Fri', present: 1195, absent: 52, late: 18 },
      { day: 'Sat', present: 890, absent: 357, late: 8 },
      { day: 'Sun', present: 245, absent: 1002, late: 2 },
    ],
    monthlyTrends: [
      { month: 'Jan', attendance: 94.2, productivity: 88 },
      { month: 'Feb', attendance: 93.8, productivity: 89 },
      { month: 'Mar', attendance: 95.1, productivity: 91 },
      { month: 'Apr', attendance: 92.9, productivity: 87 },
      { month: 'May', attendance: 94.5, productivity: 92 },
      { month: 'Jun', attendance: 92.7, productivity: 90 },
    ],
    departments: [
      { name: 'Engineering', employees: 420, present: 398, rate: 94.8 },
      { name: 'Sales', employees: 285, present: 263, rate: 92.3 },
      { name: 'Marketing', employees: 180, present: 171, rate: 95.0 },
      { name: 'HR', employees: 45, present: 42, rate: 93.3 },
      { name: 'Finance', employees: 67, present: 61, rate: 91.0 },
      { name: 'Operations', employees: 250, present: 221, rate: 88.4 },
    ],
  });

  const StatCard = ({ title, value, change, icon: Icon, color = 'blue', subtitle }) => (
    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-600">{title}</p>
          <p className="text-3xl font-bold text-gray-900 mt-2">
            {typeof value === 'number' && value > 100 ? value.toLocaleString() : value}
          </p>
          {subtitle && <p className="text-sm text-gray-500 mt-1">{subtitle}</p>}
          {change && (
            <div className="flex items-center mt-2">
              <TrendingUp
                className={`h-4 w-4 ${change > 0 ? 'text-green-500' : 'text-red-500'} mr-1`}
              />
              <span className={`text-sm ${change > 0 ? 'text-green-600' : 'text-red-600'}`}>
                {change > 0 ? '+' : ''}
                {change}%
              </span>
              <span className="text-sm text-gray-500 ml-1">vs yesterday</span>
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
              <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">A</span>
              </div>
              <span className="text-xl font-bold text-gray-900">AttendanceHub</span>
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
            <div className="text-sm text-gray-500">Today: {new Date().toLocaleDateString()}</div>

            {/* Export Button */}
            <button className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm font-medium">
              <Download className="h-4 w-4" />
              <span>Export</span>
            </button>

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
                <div className="w-8 h-8 bg-gradient-to-r from-green-500 to-blue-500 rounded-full flex items-center justify-center">
                  <span className="text-white text-sm font-medium">
                    {user?.name?.charAt(0) || 'A'}
                  </span>
                </div>
                <span className="text-sm font-medium">Welcome, {user?.name || 'Admin'}!</span>
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
                className="flex items-center space-x-3 px-3 py-2 bg-blue-50 text-blue-600 rounded-lg font-medium"
              >
                <Activity className="h-5 w-5" />
                <span>Dashboard</span>
              </a>

              <a
                href="#"
                className="flex items-center space-x-3 px-3 py-2 text-gray-600 hover:bg-gray-50 rounded-lg"
              >
                <Users className="h-5 w-5" />
                <span>Employees</span>
              </a>

              <a
                href="#"
                className="flex items-center space-x-3 px-3 py-2 text-gray-600 hover:bg-gray-50 rounded-lg"
              >
                <Clock className="h-5 w-5" />
                <span>Attendance</span>
              </a>

              <a
                href="#"
                className="flex items-center space-x-3 px-3 py-2 text-gray-600 hover:bg-gray-50 rounded-lg"
              >
                <Calendar className="h-5 w-5" />
                <span>Schedule</span>
              </a>

              <a
                href="#"
                className="flex items-center space-x-3 px-3 py-2 text-gray-600 hover:bg-gray-50 rounded-lg"
              >
                <TrendingUp className="h-5 w-5" />
                <span>Reports</span>
              </a>
            </nav>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-6">
          <div className="mb-8">
            <h1 className="text-2xl font-bold text-gray-900 mb-2">Attendance Dashboard</h1>
            <p className="text-gray-600">Monitor • Employee Attendance</p>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <StatCard
              title="Total Employees"
              value={dashboardData.totalEmployees}
              icon={Users}
              color="blue"
            />
            <StatCard
              title="Present Today"
              value={dashboardData.presentToday}
              change={2.1}
              icon={CheckCircle}
              color="green"
              subtitle={`${dashboardData.attendanceRate}% attendance rate`}
            />
            <StatCard
              title="Absent Today"
              value={dashboardData.absentToday}
              change={-5.2}
              icon={AlertCircle}
              color="red"
            />
            <StatCard
              title="Late Arrivals"
              value={dashboardData.lateArrivals}
              change={-12.3}
              icon={Clock}
              color="yellow"
            />
          </div>

          {/* Charts Section */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
            {/* Weekly Attendance Chart */}
            <div className="lg:col-span-2 bg-white rounded-xl p-6 shadow-sm border border-gray-100">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-gray-900">Weekly Attendance</h3>
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                    <span className="text-sm text-gray-600">Present</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                    <span className="text-sm text-gray-600">Absent</span>
                  </div>
                </div>
              </div>

              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={dashboardData.weeklyAttendance}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                    <XAxis
                      dataKey="day"
                      axisLine={false}
                      tickLine={false}
                      tick={{ fontSize: 12, fill: '#6b7280' }}
                    />
                    <YAxis
                      axisLine={false}
                      tickLine={false}
                      tick={{ fontSize: 12, fill: '#6b7280' }}
                    />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: 'white',
                        border: '1px solid #e5e7eb',
                        borderRadius: '8px',
                        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
                      }}
                    />
                    <Bar dataKey="present" fill="#10b981" radius={[4, 4, 0, 0]} />
                    <Bar dataKey="absent" fill="#ef4444" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Monthly Trends */}
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
              <h3 className="text-lg font-semibold text-gray-900 mb-6">Monthly Trends</h3>

              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={dashboardData.monthlyTrends}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                    <XAxis
                      dataKey="month"
                      axisLine={false}
                      tickLine={false}
                      tick={{ fontSize: 10, fill: '#6b7280' }}
                    />
                    <YAxis
                      axisLine={false}
                      tickLine={false}
                      tick={{ fontSize: 10, fill: '#6b7280' }}
                    />
                    <Tooltip
                      formatter={(value, name) => [
                        `${value}%`,
                        name === 'attendance' ? 'Attendance' : 'Productivity',
                      ]}
                      contentStyle={{
                        backgroundColor: 'white',
                        border: '1px solid #e5e7eb',
                        borderRadius: '8px',
                        fontSize: '12px',
                      }}
                    />
                    <Area
                      type="monotone"
                      dataKey="attendance"
                      stackId="1"
                      stroke="#3b82f6"
                      fill="#3b82f6"
                      fillOpacity={0.6}
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>

          {/* Department Statistics */}
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <h3 className="text-lg font-semibold text-gray-900 mb-6">Department Attendance</h3>

            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left py-3 px-4 font-semibold text-gray-700">Department</th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-700">
                      Total Employees
                    </th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-700">
                      Present Today
                    </th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-700">
                      Attendance Rate
                    </th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-700">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {dashboardData.departments.map((dept, index) => (
                    <tr key={index} className="border-b border-gray-100 hover:bg-gray-50">
                      <td className="py-3 px-4 font-medium text-gray-900">{dept.name}</td>
                      <td className="py-3 px-4 text-gray-600">{dept.employees}</td>
                      <td className="py-3 px-4 text-gray-600">{dept.present}</td>
                      <td className="py-3 px-4">
                        <div className="flex items-center space-x-2">
                          <div className="flex-1 bg-gray-200 rounded-full h-2">
                            <div
                              className="bg-blue-600 h-2 rounded-full"
                              style={{ width: `${dept.rate}%` }}
                            ></div>
                          </div>
                          <span className="text-sm font-medium text-gray-700">{dept.rate}%</span>
                        </div>
                      </td>
                      <td className="py-3 px-4">
                        <span
                          className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                            dept.rate >= 95
                              ? 'bg-green-100 text-green-800'
                              : dept.rate >= 90
                                ? 'bg-yellow-100 text-yellow-800'
                                : 'bg-red-100 text-red-800'
                          }`}
                        >
                          {dept.rate >= 95
                            ? 'Excellent'
                            : dept.rate >= 90
                              ? 'Good'
                              : 'Needs Attention'}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default AdminDashboard;
