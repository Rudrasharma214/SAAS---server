import React, { useEffect, useState } from 'react';
import { getAllCompanies } from '../../services/superAdminServices';

const CompaniesList = ({ onCompanyClick }) => {
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

  return (
    <div className="p-4 text-zinc-200">
      <div className="max-w-full ">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-semibold text-zinc-100">All Companies</h2>
          <input
            type="text"
            value={search}
            onChange={(e) => handleSearch(e.target.value)}
            placeholder="Search companies..."
            className="px-4 py-2 bg-zinc-800 text-zinc-100 border border-zinc-700 rounded-lg
                       focus:outline-none focus:ring-2 focus:ring-pink-500 w-64"
          />
        </div>

        {loading ? (
          <div className="text-center text-zinc-400 py-8">Loading companies...</div>
        ) : filtered.length === 0 ? (
          <div className="text-center text-zinc-400 py-8">No companies found.</div>
        ) : (
          <ul className="divide-y divide-zinc-800">
            {filtered.map((company) => (
              <li
                key={company._id}
                onClick={() => onCompanyClick(company._id)}
                className="py-4 px-3 flex justify-between items-center hover:bg-zinc-800/50 rounded-lg transition cursor-pointer"
              >
                <div>
                  <h3 className="text-lg font-semibold text-zinc-100">{company.name}</h3>
                  <p className="text-sm text-zinc-400">
                    Owner: {company.ownerId?.name || 'N/A'} • Plan:{' '}
                    {company.subscription?.planId?.name || 'Free'}
                  </p>
                </div>
                <span className="text-sm text-zinc-400">
                  {company.subscription?.status || 'Inactive'}
                </span>
              </li>
            ))}
          </ul>
        )}

        {/* Pagination Controls */}
        {pagination && (
          <div className="flex justify-center items-center gap-3 mt-6">
            <button
              disabled={page === 1}
              onClick={() => setPage((prev) => prev - 1)}
              className={`px-3 py-1.5 rounded-lg border border-zinc-700
                         ${page === 1 ? 'text-zinc-500 cursor-not-allowed' : 'hover:bg-zinc-800'}`}
            >
              Prev
            </button>
            <span className="text-sm text-zinc-400">
              Page {pagination.currentPage} of {pagination.totalPages}
            </span>
            <button
              disabled={page === pagination.totalPages}
              onClick={() => setPage((prev) => prev + 1)}
              className={`px-3 py-1.5 rounded-lg border border-zinc-700
                         ${
                           page === pagination.totalPages
                             ? 'text-zinc-500 cursor-not-allowed'
                             : 'hover:bg-zinc-800'
                         }`}
            >
              Next
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default CompaniesList;
