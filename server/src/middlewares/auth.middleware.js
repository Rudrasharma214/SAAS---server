import cookieParser from "cookie-parser";
import jwt from "jsonwebtoken";
import STATUS from "../constant/statusCode.js";
import User from "../models/user.model.js";
import { sendResponse } from "../utils/sendResponse.js";

export const authenticate = async (req, res, next) => {
  try {
    const token =
      req.cookies.token || req.header("Authorization")?.replace("Bearer ", "");
    if (!token) {
      return sendResponse(res, STATUS.UNAUTHORIZED, "No token provided");
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id).select("-password");
    if (!user) {
      return sendResponse(res, STATUS.UNAUTHORIZED, "Invalid token");
    }
    req.user = user;
    next();
  } catch (error) {
    return sendResponse(
      res,
      STATUS.INTERNAL_ERROR,
      "An error occurred during authentication"
    );
  }
};
