import express from "express";
import { login, profile, register } from "../controllers/userController.js";

const router = express.Router();

router.get("/login", login);

router.get("/profile", profile);

router.get("/register", register);

export default router;
