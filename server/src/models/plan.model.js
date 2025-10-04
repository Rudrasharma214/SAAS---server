import mongoose from 'mongoose';

const plan = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  durationInDays: {
    type: Number,
    required: true,
  },
  maxManagers: {
    type: Number,
    required: true,
  },
  maxEmployees: {
    type: Number,
    required: true,
  },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

const Plan = mongoose.model('Plan', plan);
export default Plan;
