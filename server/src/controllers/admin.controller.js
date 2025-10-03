import Company from "../models/company.model.js";
import User from "../models/user.model.js";
import { sendResponse } from "../utils/sendResponse.js";
import STATUS from "../constant/statusCode.js";
import AppError from "../utils/AppError.js";

export const registerCompany = async (req, res,next) => {
    try {
        const adminId = req.user._id;
        const { name, address, sector } = req.body;
        const existingCompany = await Company.findOne({ name });
        if (existingCompany) {
            return sendResponse(res, STATUS.BAD_REQUEST, "Company already exists");
        }
        const newCompany = await Company.create({
            name,
            address,
            sector,
            owner: adminId
        });
        await newCompany.save();
        await User.findByIdAndUpdate(adminId, { $set: { companyId: newCompany._id } });
        sendResponse(res, STATUS.CREATED, "Company registered successfully", newCompany);
    } catch (error) {
        next(new AppError(STATUS.INTERNAL_ERROR, "An error occurred while registering company"));
    }
};

export const getCompanyDetails = async (req, res,next) => {
    try {
        const adminId = req.user._id;
        const company = await Company.findOne({ owner: adminId })
        .populate('owner', '-password')
        .populate('subscription.planId');

        if (!company) {
            return sendResponse(res, STATUS.NOT_FOUND, "Company not found");
        }
        sendResponse(res, STATUS.OK, "Company details retrieved successfully", company);
    } catch (error) {
        next(new AppError(STATUS.INTERNAL_ERROR, "An error occurred while retrieving company details"));
    }
};

export const getAllManagers = async (req, res,next) => {
    try {
        const adminId = req.user._id;
        const company = await Company.findOne({ owner: adminId })
        if (!company) {
            return sendResponse(res, STATUS.NOT_FOUND, "Company not found");
        }
        const managers = await User.find({ companyId: company._id, role: 'manager' }).select('-password');
        sendResponse(res, STATUS.OK, "Managers retrieved successfully", managers);
    } catch (error) {
        next(new AppError(STATUS.INTERNAL_ERROR, "An error occurred while retrieving managers"));
    }
};

export const getAllEmployees = async (req, res,next) => {
    try {
        const adminId = req.user._id;
        const company = await Company.findOne({ owner: adminId })
        if (!company) {
            return sendResponse(res, STATUS.NOT_FOUND, "Company not found");
        }
        const employees = await User.find({ companyId: company._id, role: 'user' }).select('-password');
        sendResponse(res, STATUS.OK, "Employees retrieved successfully", employees);
    } catch (error) {
        next(new AppError(STATUS.INTERNAL_ERROR, "An error occurred while retrieving employees"));
    }
};

export const createManager = async (req, res,next) => {
    try {
        const adminId = req.user._id;
        const { name, email, password } = req.body;
        const company = await Company.findOne({ owner: adminId });
        if (!company) {
            return sendResponse(res, STATUS.NOT_FOUND, "Company not found");
        }   
        if (company.subscription.currentManagers >= company.subscription.maxManagers) {
            return sendResponse(res, STATUS.FORBIDDEN, "Manager limit reached for your subscription plan");
        }
        const newManager = await User.create({
            name,
            email,
            password,
            role: 'manager',
            companyId: company._id
        });
        await newManager.save();
        sendResponse(res, STATUS.CREATED, "Manager created successfully", newManager);
    } catch (error) {
        next(new AppError(STATUS.INTERNAL_ERROR, "An error occurred while creating manager"));
    }
};

export const createEmployee = async (req, res,next) => {
    try {
        const adminId = req.user._id;
        const { name, email, password } = req.body;
        const company = await Company.findOne({ owner: adminId });
        if (!company) {
            return sendResponse(res, STATUS.NOT_FOUND, "Company not found");
        }   
        if (company.subscription.currentEmployees >= company.subscription.maxEmployees) {
            return sendResponse(res, STATUS.FORBIDDEN, "Employee limit reached for your subscription plan");
        }   
        const newEmployee = await User.create({
            name,
            email,
            password,
            role: 'user',
            companyId: company._id
        });
        await newEmployee.save();
        sendResponse(res, STATUS.CREATED, "Employee created successfully", newEmployee);    
    } catch (error) {
        next(new AppError(STATUS.INTERNAL_ERROR, "An error occurred while creating employee"));
    }
};

export const deleteUser = async (req, res,next) => {
    try {
        const userId = req.params.id;
        const user = await User.findById(userId);
        if (!user) {
            return sendResponse(res, STATUS.NOT_FOUND, "User not found");
        }
        await user.remove();
        sendResponse(res, STATUS.OK, "User deleted successfully");
    } catch (error) {
        next(new AppError(STATUS.INTERNAL_ERROR, "An error occurred while deleting user"));
    }
};  

export const updateUser = async (req, res,next) => {
    try {
        const userId = req.params.id;
        const updates = req.body;
        const user = await User.findByIdAndUpdate(userId, updates, { new: true }).select('-password');
        if (!user) {
            return sendResponse(res, STATUS.NOT_FOUND, "User not found");
        }
        sendResponse(res, STATUS.OK, "User updated successfully", user);
    } catch (error) {
        next(new AppError(STATUS.INTERNAL_ERROR, "An error occurred while updating user"));
    }
};  

export const getUserDetails = async (req, res,next) => {
    try {
        const userId = req.params.id;
        const user = await User.findById(userId).select('-password');
        if (!user) {
            return sendResponse(res, STATUS.NOT_FOUND, "User not found");
        }
        sendResponse(res, STATUS.OK, "User details retrieved successfully", user);
    } catch (error) {
        next(new AppError(STATUS.INTERNAL_ERROR, "An error occurred while retrieving user details"));
    }   
};

