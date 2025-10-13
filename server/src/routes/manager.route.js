import express from 'express';
import {
  getEmployeeDetails,
  managerAddTeamMember,
  getManagerEmployees,
  getProjectForManager,
} from '../controllers/manager.controller.js';
import { authenticate } from '../middlewares/auth.middleware.js';

const managerRouter = express.Router();

managerRouter.use(authenticate);

managerRouter.get('/employees', getManagerEmployees);
managerRouter.get('/employees/:employeeId', getEmployeeDetails);
managerRouter.get('/projects', getProjectForManager);
managerRouter.post('/project/:projectId/addteam', managerAddTeamMember);

export default managerRouter;