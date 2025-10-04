import express from 'express';

import {
  getAllCompanies,
  deleteCompany,
  createPlan,
  getAllPlans,
} from '../controllers/superAdmin.controller.js';

import { authenticate } from '../middlewares/auth.middleware.js';

const superAdminRouter = express.Router();

superAdminRouter.use(authenticate);

superAdminRouter.get('/companies', getAllCompanies);
superAdminRouter.delete('/companies/:id', deleteCompany);
superAdminRouter.post('/create-plans', createPlan);
superAdminRouter.get('/get-plans', authenticate, getAllPlans);

export default superAdminRouter;
