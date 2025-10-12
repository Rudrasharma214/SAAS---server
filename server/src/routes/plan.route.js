import express from 'express';
import { subscribePlan, createOrder, verifyPayment, updatePlan, deletePlan } from '../controllers/plan.controller.js';

const planRouter = express.Router();

planRouter.post('/subscribeplan', subscribePlan);
planRouter.post('/create-order', createOrder);
planRouter.post('/verify-payment', verifyPayment);
planRouter.patch('/updateplan/:planId', updatePlan);
planRouter.delete('/deleteplan/:planId', deletePlan); 
export default planRouter;
