import AppError from '../utils/AppError.js';
import STATUS from '../constant/statusCode.js';
import { sendResponse } from '../utils/sendResponse.js';
import User from '../models/user.model.js';
import bcrypt from 'bcryptjs';
import generateToken from '../utils/token.js';
import Company from '../models/company.model.js';
import Plan from '../models/plan.model.js';

export const getAllCompanies = async (req, res, next) => {
  try {
    // Default values: page = 1, limit = 10
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    // Total count (for frontend to know total pages)
    const totalCompanies = await Company.countDocuments();

    const companies = await Company.find()
      .populate('ownerId', '-password')
      .populate('subscription.planId')
      .skip(skip)
      .limit(limit);

    const totalPages = Math.ceil(totalCompanies / limit);

    sendResponse(res, STATUS.OK, 'Companies fetched successfully', {
      companies,
      pagination: {
        totalCompanies,
        totalPages,
        currentPage: page,
        limit,
      },
    });
  } catch (error) {
    next(new AppError(STATUS.INTERNAL_ERROR, 'An error occurred while fetching companies'));
  }
};


export const deleteCompany = async (req, res, next) => {
  try {
    const companyId = req.params.id;
    const company = await Company.findById(companyId);

    await User.deleteMany({ companyId: companyId });

    if (!company) {
      return sendResponse(res, STATUS.NOT_FOUND, 'Company not found');
    }
    if (admin.role !== 'company_owner') {
      return sendResponse(res, STATUS.BAD_REQUEST, 'User is not an admin');
    }
    await company.remove();
    sendResponse(res, STATUS.OK, 'Company deleted successfully');
  } catch (error) {
    next(new AppError(STATUS.INTERNAL_ERROR, 'An error occurred while deleting company'));
  }
};

export const createPlan = async (req, res, next) => {
  try {
    const { name, price, durationInDays, maxManagers, maxEmployees } = req.body;
    if (!name || !price || !durationInDays || !maxManagers || !maxEmployees) {
      return next(new AppError(STATUS.BAD_REQUEST, 'All plan fields are required'));
    }
    if (price < 0 || durationInDays <= 0 || maxManagers <= 0 || maxEmployees <= 0) {
      return next(new AppError(STATUS.BAD_REQUEST, 'Invalid plan values'));
    }

    // Check for existing plan with the same name
    const existingPlan = await Plan.findOne({ name });
    if (existingPlan) {
      return next(new AppError(STATUS.CONFLICT, 'A plan with this name already exists'));
    }

    // Create and save the new plan
    const newPlan = new Plan({
      name,
      price,
      durationInDays,
      maxManagers,
      maxEmployees,
    });
    await newPlan.save();
    sendResponse(res, STATUS.CREATED, 'Plan created successfully', newPlan);
  } catch (error) {
    next(new AppError(STATUS.INTERNAL_ERROR, 'An error occurred while creating plan'));
  }
};

export const getAllPlans = async (req, res, next) => {
  try {
    const plans = await Plan.find();
    sendResponse(res, STATUS.OK, 'Plans fetched successfully', { plans });
  } catch (error) {
    next(new AppError(STATUS.INTERNAL_ERROR, 'An error occurred while fetching plans'));
  }
};
