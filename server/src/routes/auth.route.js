import express from 'express';
const authRouter = express.Router();
import { getCurrentUser, login, logout, registerAdmin } from '../controllers/auth.controller.js';
import { authenticate } from '../middlewares/auth.middleware.js';

authRouter.post('/register', registerAdmin);
authRouter.post('/login', login);

authRouter.post('/logout', authenticate, logout);
authRouter.get('/me', authenticate, getCurrentUser);

export default authRouter;
