import express from "express";
import { login, register } from "../controllers/userController.js";
import checkAuth from "../middleware/authMiddleware.js";

const router = express.Router();

// Login
router.get("/login", login);

// Register
router.post("/register", checkAuth, register);

export default router;
