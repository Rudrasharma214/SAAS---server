import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import errorHandler from './middlewares/error.middleware.js';
import authRouter from './routes/auth.route.js';
 
const app = express();

app.use(express.json());

const allowedOrigins = process.env.NODE_ENV === 'production'
  ? [process.env.ORIGIN]
  : ['http://localhost:5173'];

app.use(
  cors({
    origin: allowedOrigins,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
    credentials: true,
  })
);


app.use("/api/auth", authRouter);


app.use(errorHandler);
export default app;