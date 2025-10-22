import Project from '../models/project.model.js';
import { sendResponse } from '../utils/sendResponse.js';
import STATUS from '../constant/statusCode.js';
import AppError from '../utils/AppError.js';
import User from '../models/user.model.js';
 
export const createProject = async (req, res, next) => {
  try {
    const adminId = req.user._id;
    const companyId = await User.findById(adminId).then(admin => admin.companyId);
    if (!companyId) {
      return sendResponse(res, STATUS.BAD_REQUEST, 'Admin is not associated with any company');
    }
    const { name, description, managerId, teamMembers, startDate, endDate } = req.body;
    if (!adminId) {
      return sendResponse(res, STATUS.BAD_REQUEST, 'User is not associated with any company');
    }
    const newProject = await Project.create({
      name,
      description,
      companyId,
      adminId,
      managerId,
      teamMembers,
      startDate,
      endDate,
      status: 'planned',
    });
    sendResponse(res, STATUS.CREATED, 'Project created successfully', newProject);
  } catch (error) {
    next(new AppError(STATUS.INTERNAL_ERROR, error.message));
  }
};

export const getProjects = async (req, res, next) => {
  try {
    const adminId = req.user._id;
    const projects = await Project.find({ adminId })
      .populate('managerId', 'name email')
      .populate('teamMembers', 'name email'); // Populate team members with name and email
    sendResponse(res, STATUS.OK, 'Projects retrieved successfully', projects);
  } catch (error) {
    next(new AppError(STATUS.INTERNAL_ERROR, error.message));
  }
};

export const updateProject = async (req, res, next) => {
  try {
    const { projectId } = req.params;
    const updateData = req.body;
    const userId = req.user._id;
    const userRole = req.user.role;
    
    // Create a query that checks if the user is either the admin or the manager of the project
    const query = { _id: projectId };
    if (userRole === 'admin') {
      query.adminId = userId;
    } else if (userRole === 'manager') {
      query.managerId = userId;
    } else {
      return sendResponse(
        res,
        STATUS.FORBIDDEN,
        'You do not have permission to update this project'
      );
    }
    
    const project = await Project.findOneAndUpdate(
      query,
      updateData,
      {
        new: true,
        runValidators: true,
      }
    );
    
    if (!project) {
      return sendResponse(
        res,
        STATUS.NOT_FOUND,
        'Project not found or you do not have permission to update it'
      );
    }
    sendResponse(res, STATUS.OK, 'Project updated successfully', project);
  } catch (error) {
    next(new AppError(STATUS.INTERNAL_ERROR, error.message));
  }
};

export const deleteProject = async (req, res, next) => {
  try {
    const adminId = req.user._id;
    const { projectId } = req.params;
    const project = await Project.findOneAndDelete({ _id: projectId, adminId });
    if (!project) {
      return sendResponse(
        res,
        STATUS.NOT_FOUND,
        'Project not found or you do not have permission to delete it'
      );
    }
    sendResponse(res, STATUS.OK, 'Project deleted successfully', project);
  } catch (error) {
    next(new AppError(STATUS.INTERNAL_ERROR, error.message));
  }
};

