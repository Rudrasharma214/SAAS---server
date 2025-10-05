import React, { useEffect, useState } from "react";
import { getCompanyById } from "../../services/superAdminServices";
import { ArrowLeft, Loader } from "lucide-react";

const CompanyDetail = ({ companyId, onBack }) => {
  const [company, setCompany] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchCompanyDetail();
  }, [companyId]);

  const fetchCompanyDetail = async () => {
    try {
      setLoading(true);
      const data = await getCompanyById(companyId);
      setCompany(data.data.company);
      setLoading(false);
    } catch (err) {
      console.error("Error fetching company detail:", err);
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64 text-zinc-400">
        <Loader className="animate-spin" size={36} />
      </div>
    );
  }

  if (!company) {
    return (
      <div className="flex justify-center items-center h-64 text-zinc-400">
        No company found.
      </div>
    );
  }

  return (
    <div className="p-4 text-zinc-200">
      <div className="max-w-md mx-auto bg-zinc-900/20 rounded-2xl p-6 shadow-lg border border-zinc-800/50">
        <div className="flex items-center gap-2 mb-3">
          <button onClick={onBack} className="p-1 rounded-full hover:bg-zinc-700/50 transition-colors">
            <ArrowLeft size={20} className="text-zinc-400" />
          </button>
          <h2 className="text-2xl font-semibold text-zinc-100">{company.name}</h2>
        </div>
        <div className="space-y-2 text-zinc-400">
          <p>
            <span className="font-medium text-zinc-200">Owner:</span>{" "}
            {company.ownerId?.name || "N/A"}
          </p>
          <p>
            <span className="font-medium text-zinc-200">Plan:</span>{" "}
            {company.subscription?.planId?.name || "Free"}
          </p>
          <p>
            <span className="font-medium text-zinc-200">Status:</span>{" "}
            {company.subscription?.status || "Inactive"}
          </p>
          {company.subscription?.startDate && company.subscription?.endDate && (
            <p>
              <span className="font-medium text-zinc-200">Subscription:</span>{" "}
              {new Date(company.subscription.startDate).toLocaleDateString()} -{" "}
              {new Date(company.subscription.endDate).toLocaleDateString()}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default CompanyDetail;
