import express from 'express';
import { subscribePlan, createOrder, verifyPayment } from '../controllers/plan.controller.js';

const planRouter = express.Router();

planRouter.post('/subscribeplan', subscribePlan);
planRouter.post('/create-order', createOrder);
planRouter.post('/verify-payment', verifyPayment);

export default planRouter;
