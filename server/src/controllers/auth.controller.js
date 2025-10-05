import AppError from '../utils/AppError.js';
import STATUS from '../constant/statusCode.js';
import { sendResponse } from '../utils/sendResponse.js';
import User from '../models/user.model.js';
import bcrypt from 'bcryptjs';
import generateToken from '../utils/token.js';
import Company from '../models/company.model.js';

export const getCurrentUser = (req, res) => {
  try {
    if (!req.user) {
      return sendResponse(res, STATUS.UNAUTHORIZED, 'Unauthorized');
    }
    sendResponse(res, STATUS.OK, 'Current user fetched successfully', req.user);
  } catch (error) {
    next(new AppError(STATUS.INTERNAL_ERROR, 'An error occurred while fetching current user'));
  }
};

export const registerAdmin = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;
    const existingAdmin = await User.findOne({ email });
    if (existingAdmin) {
      return sendResponse(res, STATUS.BAD_REQUEST, 'Email already exists');
    }
    // Hash the password before saving
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const admin = new User({
      name,
      email,
      password: hashedPassword,
      role: 'company_owner',
    });

    await admin.save();
    sendResponse(res, STATUS.CREATED, 'Admin registered successfully');
  } catch (error) {
    next(new AppError(STATUS.INTERNAL_ERROR, 'An error occurred while registering admin'));
  }
};

export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      return sendResponse(res, STATUS.NOT_FOUND, 'User not found');
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return sendResponse(res, STATUS.UNAUTHORIZED, 'Invalid credentials');
    }

    // Check company status after successful password verification
    if (user.role !== 'super_admin' && user.role !== 'company_owner') {
      if (!user.companyId) {
        return sendResponse(res, STATUS.FORBIDDEN, 'User is not associated with any company');
      }

      const company = await Company.findById(user.companyId);

      if (!company) {
        return sendResponse(res, STATUS.NOT_FOUND, 'Company not found');
      }

      if (company.subscription.status === 'blocked') {
        return sendResponse(res, STATUS.FORBIDDEN, 'Company is blocked. Please contact admin.');
      }

      if (company.subscription.status === 'expired') {
        return sendResponse(res, STATUS.FORBIDDEN, 'Company subscription has expired.');
      }
    }

    const token = generateToken(user);

    res.cookie('authToken', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
    });

    sendResponse(res, STATUS.OK, 'Login successful', { authToken: token, role: user.role });
  } catch (error) {
    next(new AppError(STATUS.INTERNAL_ERROR, 'An error occurred while logging in'));
  }
};

export const logout = (req, res) => {
  try {
    res.clearCookie('authToken', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
    });
    sendResponse(res, STATUS.OK, 'Logout successful');
  } catch (error) {
    next(new AppError(STATUS.INTERNAL_ERROR, 'An error occurred while logging out'));
  }
};
