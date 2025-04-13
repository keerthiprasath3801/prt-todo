import express from "express";
import { signupValidation, loginValidation } from "../middlewares/AuthValidation.js"
import { login, signup } from "../controllers/AuthController.js";
const router = express.Router();

router.post('/login', loginValidation, login);

router.post('/signup', signupValidation,signup);

export default router;