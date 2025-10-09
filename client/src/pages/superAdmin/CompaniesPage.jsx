import { useState } from 'react';
import CompaniesList from '../../components/superAdmin/CompaniesList';
import CompanyDetail from '../../components/superAdmin/CompanyDetail';

const CompaniesPage = () => {
  const [selectedCompanyId, setSelectedCompanyId] = useState(null);

  if (selectedCompanyId) {
    return (
      <CompanyDetail companyId={selectedCompanyId} onBack={() => setSelectedCompanyId(null)} />
    );
  }

  return <CompaniesList onCompanyClick={setSelectedCompanyId} />;
};

export default CompaniesPage;
