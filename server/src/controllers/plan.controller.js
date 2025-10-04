import AppError from '../utils/AppError.js';
import STATUS from '../constant/statusCode.js';
import { sendResponse } from '../utils/sendResponse.js';
import Company from '../models/company.model.js';
import Plan from '../models/plan.model.js';
import Razorpay from 'razorpay';
import crypto from 'crypto';
import dotenv from 'dotenv';
dotenv.config();

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

export const subscribePlan = async (req, res, next) => {
  try {
    const { companyId, planId } = req.body;
    const company = await Company.findById(companyId);
    const plan = await Plan.findById(planId);

    if (!company) {
      return sendResponse(res, STATUS.NOT_FOUND, 'Company not found');
    }
    if (!plan) {
      return sendResponse(res, STATUS.NOT_FOUND, 'Plan not found');
    }
    const currentDate = new Date();

    const endDate = new Date();
    endDate.setDate(endDate.getDate() + plan.durationInDays);
    company.subscription = {
      planId: plan._id,
      startDate: currentDate,
      endDate: endDate,
      status: 'active',
      maxManagers: plan.maxManagers,
      currentManagers: 0,
      maxEmployees: plan.maxEmployees,
      currentEmployees: 0,
    };
    await company.save();
    return sendResponse(res, STATUS.OK, 'Plan subscribed successfully', company);
  } catch (error) {
    next(new AppError(STATUS.INTERNAL_ERROR, 'An error occurred while subscribing to plan'));
  }
};

export const createOrder = async (req, res, next) => {
  try {
    const { amount } = req.body;
    const order = await razorpay.orders.create({
      amount: amount * 100,
      currency: 'INR',
      receipt: `receipt_order_${Math.random() * 1000}`,
    });
    return sendResponse(res, STATUS.OK, 'Order created successfully', order);
  } catch (error) {
    next(new AppError(STATUS.INTERNAL_ERROR, 'An error occurred while creating order'));
  }
};

export const verifyPayment = async (req, res, next) => {
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;
    const hmac = crypto.createHmac('sha256', process.env.RAZORPAY_KEY_SECRET);
    hmac.update(razorpay_order_id + '|' + razorpay_payment_id);
    const generated_signature = hmac.digest('hex');
    if (generated_signature === razorpay_signature) {
      return sendResponse(res, STATUS.OK, 'Payment verified successfully');
    } else {
      return sendResponse(
        res,
        STATUS.BAD_REQUEST,
        'Invalid signature, payment verification failed'
      );
    }
  } catch (error) {
    next(new AppError(STATUS.INTERNAL_ERROR, 'An error occurred while verifying payment'));
  }
};
