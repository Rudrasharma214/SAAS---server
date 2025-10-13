import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import errorHandler from './middlewares/error.middleware.js';
import authRouter from './routes/auth.route.js';
import superAdminRouter from './routes/superAdmin.route.js';
import adminRouter from './routes/admin.route.js';
import planRouter from './routes/plan.route.js';
import projectRouter from './routes/project.route.js';
import managerRouter from './routes/manager.route.js';

const app = express();

app.use(express.json());
app.use(cookieParser());

app.use(
  cors({
    origin: process.env.ORIGIN,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
    credentials: true,
  })
);

app.use('/api/auth', authRouter);
app.use('/api/superadmin', superAdminRouter);
app.use('/api/admin', adminRouter);
app.use('/api/plan', planRouter);
app.use('/api/projects', projectRouter);
app.use('/api/manager', managerRouter);
// Global Error Handler
app.use(errorHandler);
export default app;
