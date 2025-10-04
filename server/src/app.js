import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import errorHandler from './middlewares/error.middleware.js';
import authRouter from './routes/auth.route.js';
import superAdminRouter from './routes/superAdmin.route.js';
import adminRouter from './routes/admin.route.js';
import planRouter from './routes/plan.route.js';
dotenv.config();
const app = express();

app.use(express.json());

const allowedOrigins =
  process.env.NODE_ENV === 'production' ? [process.env.ORIGIN] : ['http://localhost:5173'];

app.use(
  cors({
    origin: allowedOrigins,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
    credentials: true,
  })
);

app.use('/api/auth', authRouter);
app.use('/api/superadmin', superAdminRouter);
app.use('/api/admin', adminRouter);
app.use('/api/plan', planRouter);

app.use(errorHandler);
export default app;
