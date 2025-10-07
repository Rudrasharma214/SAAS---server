import mongoose from 'mongoose';

const companySchema = new mongoose.Schema({
  ownerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    required: true,
  },
  subscription: {
    planId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Plan',
      required: true,
    },
    startDate: { type: Date, default: Date.now },
    endDate: { type: Date, required: true },
    status: {
      type: String,
      enum: ['active', 'blocked', 'expired'],
      default: 'active',
    },
    maxManagers: { type: Number, required: true },
    currentManagers: { type: Number, default: 0 },
    maxEmployees: { type: Number, required: true },
    currentEmployees: { type: Number, default: 0 },
  },
  contactEmail: {
    type: String,
  },
  website: {
    type: String,
  },
  logoUrl: {
    type: String,
  },
  isVerified: {
    type: Boolean,
    default: false,
  },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

const Company = mongoose.model('Company', companySchema);

export default Company;
