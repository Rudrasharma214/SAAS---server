import jwt from "jsonwebtoken";
import User from "../models/user.model.js";
import STATUS from "../constant/statusCode.js";
import { sendResponse } from "../utils/sendResponse.js";

export const authenticate = async (req, res, next) => {
  try {
    const token =
      req.cookies?.token || req.header("Authorization")?.replace("Bearer ", "");

    if (!token) {
      return sendResponse(res, STATUS.UNAUTHORIZED, "No token provided");
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await User.findById(decoded.id).select("-password");
    if (!user) {
      return sendResponse(res, STATUS.UNAUTHORIZED, "User not found or invalid token");
    }

    req.user = user;
    next();
  } catch (error) {
    console.error("Auth Middleware Error:", error.message);

    if (error.name === "TokenExpiredError") {
      return sendResponse(res, STATUS.UNAUTHORIZED, "Token expired, please login again");
    }

    if (error.name === "JsonWebTokenError") {
      return sendResponse(res, STATUS.UNAUTHORIZED, "Invalid token");
    }

    return sendResponse(
      res,
      STATUS.INTERNAL_ERROR,
      "An error occurred during authentication"
    );
  }
};
