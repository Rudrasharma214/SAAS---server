import express from 'express';
import {
  createProject,
  getProjects,
  updateProject,
  deleteProject,
} from '../controllers/project.controller.js';

import { authenticate } from '../middlewares/auth.middleware.js';

const projectRouter = express.Router();

projectRouter.use(authenticate);

projectRouter.post('/createproject', createProject);
projectRouter.get('/getproject', getProjects);
projectRouter.patch('/update/:projectId', updateProject);
projectRouter.delete('/delete/:projectId', deleteProject);

export default projectRouter;
