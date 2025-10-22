import express from 'express';

import {
  getProjectForUser
} from '../controllers/user.controller.js';

import { authenticate } from '../middlewares/auth.middleware.js';

const userRouter = express.Router();    

userRouter.use(authenticate);

userRouter.get('/getproject', getProjectForUser); 


export default userRouter;