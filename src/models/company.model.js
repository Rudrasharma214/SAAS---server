import mongoose from "mongoose";

const companySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },

  ownerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },

  subscription: {
    planId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Plan",
      required: true,
    },
    startDate: { type: Date, default: Date.now },
    endDate: { type: Date, required: true },
    status: {
      type: String,
      enum: ["active", "blocked", "expired"],
      default: "active",
    },
    maxManagers: { type: Number, required: true },
    currentManagers: { type: Number, default: 0 },
    maxEmployees: { type: Number, required: true },
    currentEmployees: { type: Number, default: 0 },
  },

  address: {
    type: String,
    required: true,
  },
  

  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

const Company = mongoose.model("Company", companySchema);

export default Company;

