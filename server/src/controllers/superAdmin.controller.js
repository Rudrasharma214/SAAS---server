import AppError from "../utils/AppError.js";
import STATUS from "../constant/statusCode.js";
import { sendResponse } from "../utils/sendResponse.js";
import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import generateToken from "../utils/token.js";
import Company from "../models/company.model.js";


export const getAllCompanies = async (req, res,next) => {
  try {
    const companies = await Company.find().populate('ownerId', '-password').populate('subscription.planId');
    sendResponse(res, STATUS.OK, "Companies fetched successfully", companies);
  } catch (error) {
    next(new AppError(STATUS.INTERNAL_ERROR, "An error occurred while fetching companies"));
  }
};

export const deleteCompany = async (req, res,next) => {
    try {
      const companyId = req.params.id;
      const company = await Company.findById(companyId);
      
      await User.deleteMany({ companyId: companyId });

      if (!company) {
        return sendResponse(res, STATUS.NOT_FOUND, "Company not found");
      }
      if (admin.role !== "company_owner") {
        return sendResponse(res, STATUS.BAD_REQUEST, "User is not an admin");
      }
      await company.remove();
      sendResponse(res, STATUS.OK, "Company deleted successfully");
    } catch (error) {
      next(new AppError(STATUS.INTERNAL_ERROR, "An error occurred while deleting company"));
    }
};

export const createPlan = async (req, res,next) => {
  try {
    const { name, price, duration, maxManagers, maxEmployees } = req.body;
    // Add validation for plan details here if needed
    const newPlan = new Plan({
        name,
        price,
        durationInMonths: duration,
        maxManagers,
        maxEmployees,
    });
    await newPlan.save();
    sendResponse(res, STATUS.CREATED, "Plan created successfully", newPlan);
  } catch (error) {
    next(new AppError(STATUS.INTERNAL_ERROR, "An error occurred while creating plan"));
  }     
};

export const getAllPlans = async (req, res,next) => {
  try {
    const plans = await Plan.find();
    sendResponse(res, STATUS.OK, "Plans fetched successfully", plans);
  } catch (error) {
    next(new AppError(STATUS.INTERNAL_ERROR, "An error occurred while fetching plans"));
  }
};

