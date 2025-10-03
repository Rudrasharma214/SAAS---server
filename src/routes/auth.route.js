import express from "express";
const authRouter = express.Router();
import { login, registerAdmin } from "../controllers/auth.controller.js";


authRouter.post("/register", registerAdmin);
authRouter.post("/login", login);

export default authRouter;