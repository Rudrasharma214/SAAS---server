import Company from '../models/company.model.js';
import AppError from '../utils/AppError.js';
import STATUS from '../constant/statusCode.js';
import { sendResponse } from '../utils/sendResponse.js';

const checkCompanyStatus = async (req, res, next) => {
  try {
    const user = req.user;

    if (user.role === 'super_admin' || user.role === 'company_owner') {
      return next();
    }

    if (!user.companyId) {
      sendResponse(res, STATUS.FORBIDDEN, 'User is not associated with any company');
    }

    const company = await Company.findById(user.companyId);

    if (!company) {
      sendResponse(res, STATUS.NOT_FOUND, 'Company not found');
    }

    if (company.subscription.status === 'blocked') {
      sendResponse(res, STATUS.FORBIDDEN, 'Company is blocked. Please contact admin.');
    }

    if (company.subscription.status === 'expired') {
      sendResponse(res, STATUS.FORBIDDEN, 'Company subscription expired. Please renew plan.');
    }

    next();
  } catch (error) {
    return next(
      new AppError(STATUS.INTERNAL_ERROR, 'An error occurred while checking company status')
    );
  }
};

export default checkCompanyStatus;
