import express from "express";
import {
  addStudent,
  getStudentProfile,
} from "../controllers/studentController.js";
import checkAuth from "../middleware/authMiddleware.js";

const router = express.Router();

// Add new student
router.route("/").post(checkAuth, addStudent);

// Get,updated and delete student
router.route("/:id").get(checkAuth, getStudentProfile);

export default router;
