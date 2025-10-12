import express from 'express';
import {
  getCompanyDetails,
  registerCompany,
  getAllManagers,
  getAllEmployees,
  deleteUser,
  updateUser,
  getUserDetails,
  createManager,
  createEmployee,
  uploadLogo,
  getUsersByManager,
} from '../controllers/admin.controller.js';
import { authenticate } from '../middlewares/auth.middleware.js';
import upload from '../middlewares/multer.middleware.js';

const adminRouter = express.Router();

adminRouter.use(authenticate);

adminRouter.post('/register', registerCompany);
adminRouter.get('/company-details', getCompanyDetails);
adminRouter.get('/managers', getAllManagers);
adminRouter.get('/employees', getAllEmployees);
adminRouter.delete('/users/:id', deleteUser);
adminRouter.put('/users/:id', updateUser);
adminRouter.get('/users/:id', getUserDetails);
adminRouter.post('/createmanagers', createManager);
adminRouter.post('/createemployees', createEmployee);
adminRouter.post('/upload-logo', upload.single('logo'), uploadLogo);
adminRouter.get('/managers/:id/users', getUsersByManager);


export default adminRouter;
