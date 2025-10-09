import React, { useEffect, useState } from 'react';
import { getAllCompanies } from '../../services/superAdminServices';
import { useTheme } from '../../context/themeContext';
import { Eye, Search, X } from 'lucide-react';

const CompaniesList = ({ onCompanyClick }) => {
  const { isDarkMode } = useTheme();
  const [companies, setCompanies] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [pagination, setPagination] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchCompanies();
  }, [page]);

  const fetchCompanies = async () => {
    try {
      setLoading(true);
      const data = await getAllCompanies(page, 10);
      setCompanies(data.data.companies);
      setFiltered(data.data.companies);
      setPagination(data.data.pagination);
      setLoading(false);
    } catch (err) {
      console.error('Error fetching companies:', err);
      setLoading(false);
    }
  };

  const handleSearch = (value) => {
    setSearch(value);
    if (!value.trim()) {
      setFiltered(companies);
      return;
    }
    const filteredData = companies.filter((company) =>
      company.name.toLowerCase().includes(value.toLowerCase())
    );
    setFiltered(filteredData);
  };

  const clearSearch = () => {
    setSearch('');
    setFiltered(companies);
  };

  return (
    <div className={`p-6 ${isDarkMode ? 'text-zinc-200' : 'text-gray-800'}`}>
      <div className="max-w-full">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
          <div>
            <h2 className={`text-2xl font-bold ${isDarkMode ? 'text-zinc-100' : 'text-gray-900'}`}>
              All Companies
            </h2>
            <p className={`text-sm mt-1 ${isDarkMode ? 'text-zinc-400' : 'text-gray-600'}`}>
              Manage and view all registered companies
            </p>
          </div>
          
          {/* Search Bar */}
          <div className="relative w-full sm:w-80">
            <Search 
              className={`absolute left-3 top-1/2 -translate-y-1/2 ${
                isDarkMode ? 'text-zinc-400' : 'text-gray-400'
              }`} 
              size={18} 
            />
            <input
              type="text"
              value={search}
              onChange={(e) => handleSearch(e.target.value)}
              placeholder="Search companies..."
              className={`w-full pl-10 pr-10 py-2.5 rounded-lg border transition-all ${
                isDarkMode
                  ? 'bg-zinc-800 text-zinc-100 border-zinc-700 focus:border-pink-500 focus:ring-2 focus:ring-pink-500/20'
                  : 'bg-white text-gray-900 border-indigo-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20'
              } focus:outline-none`}
            />
            {search && (
              <button
                onClick={clearSearch}
                className={`absolute right-3 top-1/2 -translate-y-1/2 p-1 rounded-full transition-colors ${
                  isDarkMode 
                    ? 'text-zinc-400 hover:text-zinc-200 hover:bg-zinc-700' 
                    : 'text-gray-400 hover:text-gray-600 hover:bg-gray-100'
                }`}
              >
                <X size={16} />
              </button>
            )}
          </div>
        </div>

        {/* Table Container */}
        <div className={`rounded-xl border overflow-hidden ${
          isDarkMode 
            ? 'bg-zinc-800/50 border-zinc-700/50' 
            : 'bg-white border-indigo-100 shadow-lg shadow-indigo-100/20'
        }`}>
          {loading ? (
            <div className={`text-center py-16 ${isDarkMode ? 'text-zinc-400' : 'text-gray-500'}`}>
              <div className={`inline-block animate-spin rounded-full h-10 w-10 border-b-2 mb-4 ${
                isDarkMode ? 'border-pink-500' : 'border-indigo-500'
              }`}></div>
              <p className="text-lg font-medium">Loading companies...</p>
            </div>
          ) : filtered.length === 0 ? (
            <div className={`text-center py-16 ${isDarkMode ? 'text-zinc-400' : 'text-gray-500'}`}>
              <div className={`w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center ${
                isDarkMode ? 'bg-zinc-700/50' : 'bg-indigo-50'
              }`}>
                <Search size={32} className={isDarkMode ? 'text-zinc-500' : 'text-indigo-400'} />
              </div>
              <p className="text-lg font-medium mb-2">No companies found</p>
              {search && (
                <p className="text-sm">
                  Try adjusting your search or{' '}
                  <button
                    onClick={clearSearch}
                    className={`font-medium underline ${
                      isDarkMode ? 'text-pink-400 hover:text-pink-300' : 'text-indigo-600 hover:text-indigo-700'
                    }`}
                  >
                    clear filters
                  </button>
                </p>
              )}
            </div>
          ) : (
            <>
              {/* Table */}
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className={isDarkMode 
                      ? 'bg-zinc-900/50 border-b border-zinc-700' 
                      : 'bg-gradient-to-r from-indigo-50 to-purple-50 border-b border-indigo-100'
                    }>
                      <th className={`px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider ${
                        isDarkMode ? 'text-zinc-400' : 'text-gray-700'
                      }`}>
                        Company
                      </th>
                      <th className={`px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider ${
                        isDarkMode ? 'text-zinc-400' : 'text-gray-700'
                      }`}>
                        Owner
                      </th>
                      <th className={`px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider ${
                        isDarkMode ? 'text-zinc-400' : 'text-gray-700'
                      }`}>
                        Plan
                      </th>
                      <th className={`px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider ${
                        isDarkMode ? 'text-zinc-400' : 'text-gray-700'
                      }`}>
                        Status
                      </th>
                      <th className={`px-6 py-4 text-center text-xs font-semibold uppercase tracking-wider ${
                        isDarkMode ? 'text-zinc-400' : 'text-gray-700'
                      }`}>
                        Action
                      </th>
                    </tr>
                  </thead>
                  <tbody className={isDarkMode ? 'divide-y divide-zinc-700/50' : 'divide-y divide-indigo-50'}>
                    {filtered.map((company, index) => (
                      <tr
                        key={company._id}
                        className={`transition-colors ${
                          isDarkMode
                            ? 'hover:bg-zinc-700/30'
                            : index % 2 === 0 
                              ? 'bg-white hover:bg-indigo-50/50' 
                              : 'bg-slate-50/50 hover:bg-indigo-50/50'
                        }`}
                      >
                        {/* Company Name */}
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-3">
                            <div className={`w-10 h-10 rounded-lg flex items-center justify-center font-bold text-sm ${
                              isDarkMode 
                                ? 'bg-gradient-to-br from-pink-500 to-purple-500 text-white' 
                                : 'bg-gradient-to-br from-indigo-500 to-purple-500 text-white'
                            }`}>
                              {company.name.charAt(0).toUpperCase()}
                            </div>
                            <div>
                              <p className={`font-semibold ${isDarkMode ? 'text-zinc-100' : 'text-gray-900'}`}>
                                {company.name}
                              </p>
                              
                            </div>
                          </div>
                        </td>

                        {/* Owner */}
                        <td className="px-6 py-4">
                          <p className={`font-medium ${isDarkMode ? 'text-zinc-200' : 'text-gray-800'}`}>
                            {company.ownerId?.name || 'N/A'}
                          </p>
                          <p className={`text-xs ${isDarkMode ? 'text-zinc-500' : 'text-gray-500'}`}>
                            {company.ownerId?.email || 'No email'}
                          </p>
                        </td>

                        {/* Plan */}
                        <td className="px-6 py-4">
                          <div className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium ${
                            isDarkMode
                              ? 'bg-blue-500/10 text-blue-400 border border-blue-500/20'
                              : 'bg-indigo-50 text-indigo-700 border border-indigo-200'
                          }`}>
                            <div className={`w-1.5 h-1.5 rounded-full ${
                              isDarkMode ? 'bg-blue-400' : 'bg-indigo-500'
                            }`}></div>
                            {company.subscription?.planId?.name || 'Free'}
                          </div>
                        </td>

                        {/* Status */}
                        <td className="px-6 py-4">
                          <span
                            className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold ${
                              company.subscription?.status === 'active'
                                ? isDarkMode
                                  ? 'bg-green-500/10 text-green-400 border border-green-500/20'
                                  : 'bg-green-50 text-green-700 border border-green-200'
                                : isDarkMode
                                ? 'bg-zinc-700/50 text-zinc-400 border border-zinc-600/30'
                                : 'bg-gray-100 text-gray-600 border border-gray-300'
                            }`}
                          >
                            <div className={`w-1.5 h-1.5 rounded-full ${
                              company.subscription?.status === 'active'
                                ? isDarkMode ? 'bg-green-400' : 'bg-green-500'
                                : isDarkMode ? 'bg-zinc-500' : 'bg-gray-400'
                            }`}></div>
                            {company.subscription?.status || 'Inactive'}
                          </span>
                        </td>

                        {/* Action */}
                        <td className="px-6 py-4 text-center">
                          <button
                            onClick={() => onCompanyClick(company._id)}
                            className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                              isDarkMode
                                ? 'bg-pink-500/10 text-pink-400 hover:bg-pink-500/20 border border-pink-500/20'
                                : 'bg-indigo-500 text-white hover:bg-indigo-600 shadow-sm hover:shadow-md'
                            }`}
                          >
                            <Eye size={16} />
                            View
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Table Footer - Pagination */}
              {pagination && (
                <div className={`px-6 py-4 border-t flex items-center justify-between ${
                  isDarkMode 
                    ? 'border-zinc-700 bg-zinc-900/30' 
                    : 'border-indigo-100 bg-gradient-to-r from-indigo-50/50 to-purple-50/50'
                }`}>
                  <div className={`text-sm ${isDarkMode ? 'text-zinc-400' : 'text-gray-600'}`}>
                    Showing <span className="font-semibold">{(page - 1) * 10 + 1}</span> to{' '}
                    <span className="font-semibold">{Math.min(page * 10, pagination.totalCompanies)}</span> of{' '}
                    <span className="font-semibold">{pagination.totalCompanies}</span> companies
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      disabled={page === 1}
                      onClick={() => setPage((prev) => prev - 1)}
                      className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                        page === 1
                          ? isDarkMode
                            ? 'bg-zinc-800 text-zinc-600 cursor-not-allowed'
                            : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                          : isDarkMode
                          ? 'bg-zinc-800 text-zinc-300 hover:bg-zinc-700 border border-zinc-700'
                          : 'bg-white text-gray-700 hover:bg-indigo-50 border border-indigo-200 shadow-sm'
                      }`}
                    >
                      Previous
                    </button>

                    <div className={`px-4 py-2 rounded-lg text-sm font-medium ${
                      isDarkMode 
                        ? 'bg-pink-500/10 text-pink-400 border border-pink-500/20' 
                        : 'bg-indigo-500 text-white'
                    }`}>
                      {pagination.currentPage} / {pagination.totalPages}
                    </div>

                    <button
                      disabled={page === pagination.totalPages}
                      onClick={() => setPage((prev) => prev + 1)}
                      className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                        page === pagination.totalPages
                          ? isDarkMode
                            ? 'bg-zinc-800 text-zinc-600 cursor-not-allowed'
                            : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                          : isDarkMode
                          ? 'bg-zinc-800 text-zinc-300 hover:bg-zinc-700 border border-zinc-700'
                          : 'bg-white text-gray-700 hover:bg-indigo-50 border border-indigo-200 shadow-sm'
                      }`}
                    >
                      Next
                    </button>
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default CompaniesList;
