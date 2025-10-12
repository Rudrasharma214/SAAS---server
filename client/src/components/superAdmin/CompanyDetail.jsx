import React, { useEffect, useState } from 'react';
import { getCompanyById } from '../../services/superAdminServices';
import {
  ArrowLeft,
  Loader,
  Calendar,
  User,
  CreditCard,
  CheckCircle,
  XCircle,
  Mail,
  Globe,
  Building2,
  Users,
  UserCheck,
  Shield,
  Clock,
  TrendingUp,
} from 'lucide-react';
import { useTheme } from '../../context/themeContext';

const CompanyDetail = ({ companyId, onBack }) => {
  const { isDarkMode } = useTheme();
  const [company, setCompany] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (companyId) {
      setCompany(null);
      fetchCompanyDetail();
    }
  }, [companyId]);

  const fetchCompanyDetail = async () => {
    try {
      setLoading(true);
      const data = await getCompanyById(companyId);
      setCompany(data.data.company);
    } catch (err) {
      console.error('Error fetching company detail:', err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div
        className={`flex flex-col justify-center items-center h-full ${
          isDarkMode ? 'text-zinc-400' : 'text-indigo-600'
        }`}
      >
        <Loader className="animate-spin mb-3" size={40} />
        <p className="text-sm font-medium">Loading company details...</p>
      </div>
    );
  }

  if (!company) {
    return (
      <div className="flex flex-col justify-center items-center h-full">
        <div
          className={`rounded-xl border p-8 ${
            isDarkMode ? 'bg-zinc-800/30 border-zinc-700' : 'bg-white border-indigo-100 shadow-lg'
          }`}
        >
          <XCircle
            size={48}
            className={`mb-3 mx-auto ${isDarkMode ? 'text-zinc-600' : 'text-red-400'}`}
          />
          <p className={`text-lg mb-4 ${isDarkMode ? 'text-zinc-400' : 'text-gray-700'}`}>
            Company not found
          </p>
          <button
            onClick={onBack}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              isDarkMode
                ? 'bg-zinc-700 hover:bg-zinc-600 text-zinc-200'
                : 'bg-indigo-500 hover:bg-indigo-600 text-white'
            }`}
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  const isActive = company.subscription?.status === 'active';
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-IN', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  // Calculate days remaining
  let daysRemaining = null;
  if (isActive && company.subscription?.endDate) {
    const remaining = Math.ceil(
      (new Date(company.subscription.endDate) - new Date()) / (1000 * 60 * 60 * 24)
    );
    if (remaining > 0) daysRemaining = remaining;
  }

  // Calculate usage percentages
  const managerUsage = company.subscription?.maxManagers
    ? (company.subscription.currentManagers / company.subscription.maxManagers) * 100
    : 0;
  const employeeUsage = company.subscription?.maxEmployees
    ? (company.subscription.currentEmployees / company.subscription.maxEmployees) * 100
    : 0;

  return (
    <div className="h-full overflow-y-auto">
      <div className={`p-6 pb-8 ${isDarkMode ? 'text-zinc-200' : 'text-gray-800'}`}>
        <div className="max-w-5xl mx-auto">
          {/* Back Button */}
          <button
            onClick={onBack}
            className={`mb-6 flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all ${
              isDarkMode
                ? 'bg-zinc-800/50 hover:bg-zinc-800 text-zinc-300 hover:text-white'
                : 'bg-white hover:bg-indigo-50 text-gray-700 hover:text-indigo-700 border border-indigo-100 shadow-sm'
            }`}
          >
            <ArrowLeft size={18} />
            <span className="text-sm">Back to Companies</span>
          </button>

          {/* Company Header Card */}
          <div
            className={`rounded-2xl p-8 mb-6 ${
              isDarkMode
                ? 'bg-gradient-to-br from-zinc-800 via-zinc-800/95 to-zinc-900 border border-zinc-700 shadow-xl'
                : 'bg-gradient-to-br from-indigo-200 via-blue-200 to-purple-200 border border-white/20 shadow-2xl shadow-indigo-200/50'
            }`}
          >
            <div className="flex flex-col md:flex-row items-start gap-6 mb-6">
              {/* Company Logo */}
              <div className="relative">
                <div
                  className={`w-24 h-24 ${isDarkMode ? 'bg-white/10' : 'bg-white'} rounded-2xl flex items-center justify-center overflow-hidden shadow-xl ring-4 ring-white/20`}
                >
                  {company.logoUrl ? (
                    <img
                      src={company.logoUrl}
                      alt={company.name}
                      className="w-full h-full object-contain p-2"
                    />
                  ) : (
                    <Building2 size={40} className="text-indigo-600" />
                  )}
                </div>
                {company.isVerified && (
                  <div className="absolute -bottom-2 -right-2 bg-green-500 rounded-full p-1.5 ring-4 ring-white/20">
                    <CheckCircle size={16} className="text-white" />
                  </div>
                )}
              </div>

              {/* Company Info */}
              <div className="flex-1">
                <h1
                  className={`text-3xl md:text-4xl font-bold mb-3 ${
                    isDarkMode ? 'text-white' : 'text-gray-700'
                  }`}
                >
                  {company.name}
                </h1>

                <div className="flex flex-wrap items-center gap-2 mb-4">
                  <span
                    className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold ${
                      isActive
                        ? 'bg-green-400/20 text-green-600 border border-green-400/40 shadow-lg shadow-green-500/20'
                        : 'bg-red-500/20 text-red-100 border border-red-400/40'
                    }`}
                  >
                    <div
                      className={`w-2 h-2 rounded-full ${
                        isActive ? 'bg-green-700 animate-pulse' : 'bg-red-300'
                      }`}
                    ></div>
                    {company.subscription?.status || 'Inactive'}
                  </span>

                  <span
                    className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold border backdrop-blur-sm ${
                      isDarkMode
                        ? 'bg-white/10 text-white border-white/20'
                        : 'bg-gray-200 text-gray-700 border-gray-300'
                    }`}
                  >
                    <Building2 size={12} />
                    {company.type}
                  </span>

                  {!company.isVerified && (
                    <span
                      className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold border ${
                        isDarkMode
                          ? 'bg-yellow-500/20 text-yellow-100 border-yellow-400/40'
                          : 'bg-yellow-100 text-yellow-700 border-yellow-300'
                      }`}
                    >
                      <Shield size={12} />
                      Pending Verification
                    </span>
                  )}
                </div>

                {/* Quick Contact */}
                <div
                  className={`flex flex-wrap gap-4 text-sm ${
                    isDarkMode ? 'text-white/90' : 'text-gray-700'
                  }`}
                >
                  {company.contactEmail && (
                    <div className="flex items-center gap-2">
                      <Mail size={14} />
                      <span>{company.contactEmail}</span>
                    </div>
                  )}
                  {company.website && (
                    <div className="flex items-center gap-2">
                      <Globe size={14} />
                      <span>{company.website}</span>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Subscription Expiry Alert */}
            {daysRemaining && (
              <div
                className={`backdrop-blur-md rounded-xl px-5 py-3 border ${
                  isDarkMode ? 'bg-white/10 border-white/20' : 'bg-gray-100 border-gray-300'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Clock size={20} className={isDarkMode ? 'text-white' : 'text-gray-700'} />
                    <span
                      className={`text-sm font-medium ${
                        isDarkMode ? 'text-white/90' : 'text-gray-700'
                      }`}
                    >
                      Subscription Expires In
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span
                      className={`text-2xl font-bold ${
                        isDarkMode ? 'text-white' : 'text-gray-700'
                      }`}
                    >
                      {daysRemaining}
                    </span>
                    <span className={`text-sm ${isDarkMode ? 'text-white/80' : 'text-gray-700'}`}>
                      days
                    </span>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left Column - Company & Owner Info */}
            <div className="lg:col-span-2 space-y-6">
              {/* Company Owner */}
              <div
                className={`rounded-xl p-6 ${
                  isDarkMode
                    ? 'bg-zinc-800/50 border border-zinc-700/50'
                    : 'bg-white border border-indigo-100 shadow-lg shadow-indigo-100/20'
                }`}
              >
                <h2
                  className={`text-lg font-bold mb-4 flex items-center gap-2 ${
                    isDarkMode ? 'text-zinc-100' : 'text-gray-900'
                  }`}
                >
                  <div
                    className={`p-2 rounded-lg ${isDarkMode ? 'bg-pink-500/10' : 'bg-indigo-50'}`}
                  >
                    <User size={18} className={isDarkMode ? 'text-pink-400' : 'text-indigo-600'} />
                  </div>
                  Company Owner
                </h2>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <p
                      className={`text-xs font-medium mb-1 ${
                        isDarkMode ? 'text-zinc-500' : 'text-gray-500'
                      }`}
                    >
                      Name
                    </p>
                    <p
                      className={`text-base font-semibold ${
                        isDarkMode ? 'text-zinc-100' : 'text-gray-900'
                      }`}
                    >
                      {company.ownerId?.name || 'Not assigned'}
                    </p>
                  </div>

                  <div>
                    <p
                      className={`text-xs font-medium mb-1 ${
                        isDarkMode ? 'text-zinc-500' : 'text-gray-500'
                      }`}
                    >
                      Email
                    </p>
                    <p
                      className={`text-base font-semibold flex items-center gap-2 ${
                        isDarkMode ? 'text-zinc-100' : 'text-gray-900'
                      }`}
                    >
                      <Mail size={14} className={isDarkMode ? 'text-zinc-400' : 'text-gray-400'} />
                      <span className="truncate">{company.ownerId?.email || 'N/A'}</span>
                    </p>
                  </div>

                  <div>
                    <p
                      className={`text-xs font-medium mb-1 ${
                        isDarkMode ? 'text-zinc-500' : 'text-gray-500'
                      }`}
                    >
                      Role
                    </p>
                    <p
                      className={`text-base font-semibold ${
                        isDarkMode ? 'text-zinc-100' : 'text-gray-900'
                      }`}
                    >
                      {company.ownerId?.role?.replace('_', ' ').toUpperCase() || 'N/A'}
                    </p>
                  </div>

                  <div>
                    <p
                      className={`text-xs font-medium mb-1 ${
                        isDarkMode ? 'text-zinc-500' : 'text-gray-500'
                      }`}
                    >
                      Status
                    </p>
                    <span
                      className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold ${
                        company.ownerId?.isRegistered
                          ? isDarkMode
                            ? 'bg-green-500/10 text-green-400 border border-green-500/20'
                            : 'bg-green-50 text-green-700 border border-green-200'
                          : isDarkMode
                            ? 'bg-zinc-700/50 text-zinc-400 border border-zinc-600/30'
                            : 'bg-gray-100 text-gray-600 border border-gray-300'
                      }`}
                    >
                      <div
                        className={`w-1.5 h-1.5 rounded-full ${
                          company.ownerId?.isRegistered
                            ? isDarkMode
                              ? 'bg-green-400'
                              : 'bg-green-500'
                            : isDarkMode
                              ? 'bg-zinc-500'
                              : 'bg-gray-400'
                        }`}
                      ></div>
                      {company.ownerId?.isRegistered ? 'Registered' : 'Pending'}
                    </span>
                  </div>
                </div>
              </div>

              {/* Subscription Details */}
              <div
                className={`rounded-xl p-6 ${
                  isDarkMode
                    ? 'bg-zinc-800/50 border border-zinc-700/50'
                    : 'bg-white border border-indigo-100 shadow-lg shadow-indigo-100/20'
                }`}
              >
                <h2
                  className={`text-lg font-bold mb-4 flex items-center gap-2 ${
                    isDarkMode ? 'text-zinc-100' : 'text-gray-900'
                  }`}
                >
                  <div
                    className={`p-2 rounded-lg ${isDarkMode ? 'bg-purple-500/10' : 'bg-purple-50'}`}
                  >
                    <CreditCard
                      size={18}
                      className={isDarkMode ? 'text-purple-400' : 'text-purple-600'}
                    />
                  </div>
                  Subscription Plan
                </h2>

                <div className="grid grid-cols-3 gap-4 mb-6">
                  <div
                    className={`p-4 rounded-lg ${isDarkMode ? 'bg-zinc-900/50' : 'bg-indigo-50'}`}
                  >
                    <p
                      className={`text-xs font-medium mb-1 ${
                        isDarkMode ? 'text-zinc-500' : 'text-gray-500'
                      }`}
                    >
                      Plan
                    </p>
                    <p
                      className={`text-xl font-bold ${
                        isDarkMode ? 'text-zinc-100' : 'text-indigo-700'
                      }`}
                    >
                      {company.subscription?.planId?.name || 'Free'}
                    </p>
                  </div>

                  <div
                    className={`p-4 rounded-lg ${isDarkMode ? 'bg-zinc-900/50' : 'bg-green-50'}`}
                  >
                    <p
                      className={`text-xs font-medium mb-1 ${
                        isDarkMode ? 'text-zinc-500' : 'text-gray-500'
                      }`}
                    >
                      Price
                    </p>
                    <p
                      className={`text-xl font-bold ${
                        isDarkMode ? 'text-green-400' : 'text-green-600'
                      }`}
                    >
                      ₹{(company.subscription?.planId?.price || 0).toLocaleString('en-IN')}
                    </p>
                  </div>

                  <div className={`p-4 rounded-lg ${isDarkMode ? 'bg-zinc-900/50' : 'bg-blue-50'}`}>
                    <p
                      className={`text-xs font-medium mb-1 ${
                        isDarkMode ? 'text-zinc-500' : 'text-gray-500'
                      }`}
                    >
                      Duration
                    </p>
                    <p
                      className={`text-xl font-bold ${
                        isDarkMode ? 'text-zinc-100' : 'text-blue-700'
                      }`}
                    >
                      {company.subscription?.planId?.durationInDays || 0}
                      <span className="text-sm font-normal"> days</span>
                    </p>
                  </div>
                </div>

                {/* Subscription Period */}
                {company.subscription?.startDate && company.subscription?.endDate && (
                  <div
                    className={`pt-4 border-t ${
                      isDarkMode ? 'border-zinc-700' : 'border-indigo-100'
                    }`}
                  >
                    <div className="flex items-center gap-2 mb-3">
                      <Calendar
                        size={16}
                        className={isDarkMode ? 'text-purple-400' : 'text-purple-600'}
                      />
                      <h3
                        className={`text-sm font-semibold ${
                          isDarkMode ? 'text-zinc-400' : 'text-gray-700'
                        }`}
                      >
                        Active Period
                      </h3>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div
                        className={`p-3 rounded-lg ${
                          isDarkMode ? 'bg-zinc-900/50' : 'bg-slate-50'
                        }`}
                      >
                        <p
                          className={`text-xs font-medium mb-1 ${
                            isDarkMode ? 'text-zinc-500' : 'text-gray-500'
                          }`}
                        >
                          Start Date
                        </p>
                        <p
                          className={`text-sm font-semibold ${
                            isDarkMode ? 'text-zinc-100' : 'text-gray-900'
                          }`}
                        >
                          {formatDate(company.subscription.startDate)}
                        </p>
                      </div>

                      <div
                        className={`p-3 rounded-lg ${
                          isDarkMode ? 'bg-zinc-900/50' : 'bg-slate-50'
                        }`}
                      >
                        <p
                          className={`text-xs font-medium mb-1 ${
                            isDarkMode ? 'text-zinc-500' : 'text-gray-500'
                          }`}
                        >
                          End Date
                        </p>
                        <p
                          className={`text-sm font-semibold ${
                            isDarkMode ? 'text-zinc-100' : 'text-gray-900'
                          }`}
                        >
                          {formatDate(company.subscription.endDate)}
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Right Column - Usage Stats */}
            <div className="space-y-6">
              {/* Company Info - Created Date */}
              <div
                className={`rounded-xl p-6 ${
                  isDarkMode
                    ? 'bg-zinc-800/50 border border-zinc-700/50'
                    : 'bg-white border border-indigo-100 shadow-lg shadow-indigo-100/20'
                }`}
              >
                <h2
                  className={`text-lg font-bold mb-4 flex items-center gap-2 ${
                    isDarkMode ? 'text-zinc-100' : 'text-gray-900'
                  }`}
                >
                  <div className={`p-2 rounded-lg ${isDarkMode ? 'bg-blue-500/10' : 'bg-blue-50'}`}>
                    <Building2
                      size={18}
                      className={isDarkMode ? 'text-blue-400' : 'text-blue-600'}
                    />
                  </div>
                  Company Info
                </h2>

                <div>
                  <p
                    className={`text-xs font-medium mb-1 ${
                      isDarkMode ? 'text-zinc-500' : 'text-gray-500'
                    }`}
                  >
                    Created
                  </p>
                  <p
                    className={`text-sm font-semibold ${
                      isDarkMode ? 'text-zinc-100' : 'text-gray-900'
                    }`}
                  >
                    {formatDate(company.createdAt)}
                  </p>
                </div>
              </div>

              {/* Usage Stats - Managers & Employees Combined */}
              <div
                className={`rounded-xl p-6 ${
                  isDarkMode
                    ? 'bg-zinc-800/50 border border-zinc-700/50'
                    : 'bg-white border border-indigo-100 shadow-lg shadow-indigo-100/20'
                }`}
              >
                <h2
                  className={`text-lg font-bold mb-4 flex items-center gap-2 ${
                    isDarkMode ? 'text-zinc-100' : 'text-gray-900'
                  }`}
                >
                  <div
                    className={`p-2 rounded-lg ${isDarkMode ? 'bg-purple-500/10' : 'bg-purple-50'}`}
                  >
                    <TrendingUp
                      size={18}
                      className={isDarkMode ? 'text-purple-400' : 'text-purple-600'}
                    />
                  </div>
                  Usage Stats
                </h2>

                <div className="space-y-6">
                  {/* Managers */}
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-2">
                        <div
                          className={`p-1.5 rounded-lg ${
                            isDarkMode ? 'bg-pink-500/10' : 'bg-pink-50'
                          }`}
                        >
                          <UserCheck
                            size={16}
                            className={isDarkMode ? 'text-pink-400' : 'text-pink-600'}
                          />
                        </div>
                        <h3
                          className={`text-sm font-semibold ${
                            isDarkMode ? 'text-zinc-100' : 'text-gray-900'
                          }`}
                        >
                          Managers
                        </h3>
                      </div>
                      <span
                        className={`text-xs font-bold ${
                          isDarkMode ? 'text-zinc-400' : 'text-gray-600'
                        }`}
                      >
                        {company.subscription?.currentManagers || 0} /{' '}
                        {company.subscription?.maxManagers || 0}
                      </span>
                    </div>

                    <div
                      className={`w-full rounded-full h-3 mb-2 ${
                        isDarkMode ? 'bg-zinc-700' : 'bg-gray-200'
                      }`}
                    >
                      <div
                        className="h-3 rounded-full transition-all duration-300 bg-gradient-to-r from-pink-500 to-rose-500"
                        style={{ width: `${Math.min(managerUsage, 100)}%` }}
                      ></div>
                    </div>

                    <p
                      className={`text-xs font-medium ${
                        isDarkMode ? 'text-zinc-500' : 'text-gray-600'
                      }`}
                    >
                      {Math.round(managerUsage)}% capacity used
                    </p>
                  </div>

                  {/* Employees */}
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-2">
                        <div
                          className={`p-1.5 rounded-lg ${
                            isDarkMode ? 'bg-blue-500/10' : 'bg-blue-50'
                          }`}
                        >
                          <Users
                            size={16}
                            className={isDarkMode ? 'text-blue-400' : 'text-blue-600'}
                          />
                        </div>
                        <h3
                          className={`text-sm font-semibold ${
                            isDarkMode ? 'text-zinc-100' : 'text-gray-900'
                          }`}
                        >
                          Employees
                        </h3>
                      </div>
                      <span
                        className={`text-xs font-bold ${
                          isDarkMode ? 'text-zinc-400' : 'text-gray-600'
                        }`}
                      >
                        {company.subscription?.currentEmployees || 0} /{' '}
                        {company.subscription?.maxEmployees || 0}
                      </span>
                    </div>

                    <div
                      className={`w-full rounded-full h-3 mb-2 ${
                        isDarkMode ? 'bg-zinc-700' : 'bg-gray-200'
                      }`}
                    >
                      <div
                        className="h-3 rounded-full transition-all duration-300 bg-gradient-to-r from-blue-500 to-indigo-500"
                        style={{ width: `${Math.min(employeeUsage, 100)}%` }}
                      ></div>
                    </div>

                    <p
                      className={`text-xs font-medium ${
                        isDarkMode ? 'text-zinc-500' : 'text-gray-600'
                      }`}
                    >
                      {Math.round(employeeUsage)}% capacity used
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CompanyDetail;
