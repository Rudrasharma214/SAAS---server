import STATUS from "../constant/statusCode.js";
import Project from "../models/project.model.js";
import AppError from "../utils/AppError.js";
import { sendResponse } from "../utils/sendResponse.js";



export const getProjectForUser = async (req, res, next) => {
  try {
    const userId = req.user._id;
    const projects = await Project.find({ teamMembers: userId })
      .populate('managerId', 'name email'); // Populate manager with name and email
    sendResponse(res, STATUS.OK, 'Projects retrieved successfully', projects);
  } catch (error) {
    next(new AppError(STATUS.INTERNAL_ERROR, error.message));
  }
}