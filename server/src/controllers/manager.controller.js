import Project from '../models/project.model.js';
import { sendResponse } from '../utils/sendResponse.js';
import STATUS from '../constant/statusCode.js';
import AppError from '../utils/AppError.js';
import User from '../models/user.model.js';

export const getManagerEmployees = async (req, res, next) => {
  try {
    const managerId = req.user._id;
    const employees = await User.find({ managerId, role: 'user' }).select('-password');
    sendResponse(res, STATUS.OK, 'Employees retrieved successfully', employees);
  } catch (error) {
    next(new AppError(STATUS.INTERNAL_ERROR, error.message));
  }
};

export const getEmployeeDetails = async (req, res, next) => {
  try {
    const { employeeId } = req.params;
    const managerId = req.user._id;
    const employee = await User.findOne({ _id: employeeId, managerId, role: 'user' }).select(
      '-password'
    );
    if (!employee) {
      return sendResponse(res, STATUS.NOT_FOUND, 'Employee not found or you do not have access');
    }   
    sendResponse(res, STATUS.OK, 'Employee details retrieved successfully', employee);
  } catch (error) {
    next(new AppError(STATUS.INTERNAL_ERROR, error.message));
  }
};

export const getProjectForManager = async (req, res, next) => {
  try {
    const managerId = req.user._id;
    const projects = await Project.find({ managerId })
      .populate('teamMembers', 'name email'); // Populate team members with name and email
    sendResponse(res, STATUS.OK, 'Projects retrieved successfully', projects);
  } catch (error) {
    next(new AppError(STATUS.INTERNAL_ERROR, error.message));
  }
};

export const managerAddTeamMember = async (req, res, next) => {
  try {
    const managerId = req.user._id;
    const { projectId } = req.params;
    const { includes } = req.body;
    const project = await Project.findOne({ _id: projectId, managerId });
    if (!project) {
      return sendResponse(
        res,
        STATUS.NOT_FOUND,
        'Project not found or you do not have permission to update it'
      );
    }
    // Add new team members, avoiding duplicates
    const newMembers = includes.filter(
      (userId) => !project.teamMembers.includes(userId)
    );
    project.teamMembers.push(...newMembers);
    await project.save();
    sendResponse(res, STATUS.OK, 'Team members added successfully', project);
  } catch (error) {
    next(new AppError(STATUS.INTERNAL_ERROR, error.message));
  }
};