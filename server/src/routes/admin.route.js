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
adminRouter.post('/managers', createManager);
adminRouter.post('/employees', createEmployee);
adminRouter.post('/upload-logo', upload.single('logo'), uploadLogo);



export default adminRouter;
