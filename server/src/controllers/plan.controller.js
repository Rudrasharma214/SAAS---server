import AppError from '../utils/AppError.js';
import STATUS from '../constant/statusCode.js';
import { sendResponse } from '../utils/sendResponse.js';
import Company from '../models/company.model.js';
import Plan from '../models/plan.model.js';
import Razorpay from 'razorpay';
import crypto from 'crypto';
import dotenv from 'dotenv';
dotenv.config({ quiet: true });


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
    console.log(amount)
    const order = await razorpay.orders.create({
      amount: amount * 100,
      currency: 'INR',
      receipt: `receipt_order_${Math.random() * 1000}`,
    });
    return sendResponse(res, STATUS.OK, 'Order created successfully', order);
  } catch (error) {
    console.error('Razorpay order creation error:', error); // Log the actual error
    next(new AppError(STATUS.INTERNAL_ERROR, error.description || 'An error occurred while creating order'));
  }
};

export const verifyPayment = async (req, res, next) => {
  try {
    const { razorpayPaymentId, razorpayOrderId, razorpaySignature, amount } = req.body;

    if (!razorpayPaymentId || !razorpayOrderId || !razorpaySignature || !amount) {
      return res.status(400).json({ error: "Missing required payment details" });
    }

    // Verify signature
    const generated_signature = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
      .update(razorpayOrderId + "|" + razorpayPaymentId)
      .digest("hex");

    if (generated_signature !== razorpaySignature) {
      return res.status(400).json({ error: "Payment verification failed" });
    }
    sendResponse(res, STATUS.OK, 'Payment verified successfully');

  } catch (error) {
    next(new AppError(STATUS.INTERNAL_ERROR, 'An error occurred while verifying payment'));
  }
};

export const updatePlan = async (req, res, next) => {
  try {
    const { planId } = req.params;
    const updateData = req.body;

    const updatedPlan = await Plan.findByIdAndUpdate(planId, updateData, {
      new: true,
      runValidators: true,
    });

    if (!updatedPlan) {
      return sendResponse(res, STATUS.NOT_FOUND, 'Plan not found');
    }

    return sendResponse(res, STATUS.OK, 'Plan updated successfully', updatedPlan);
  } catch (error) {
    next(new AppError(STATUS.INTERNAL_ERROR, 'An error occurred while updating the plan'));
  }
};

export const deletePlan = async (req, res, next) => {
  try {
    const { planId } = req.params;

    const deletedPlan = await Plan.findByIdAndDelete(planId);

    if (!deletedPlan) {
      return sendResponse(res, STATUS.NOT_FOUND, 'Plan not found');
    }

    return sendResponse(res, STATUS.OK, 'Plan deleted successfully', deletedPlan);
  }
  catch (error) {
    next(new AppError(STATUS.INTERNAL_ERROR, 'An error occurred while deleting the plan'));
  }
};
