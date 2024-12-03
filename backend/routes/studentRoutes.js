import express from "express";
import {
  addStudent,
  getStudentProfile,
} from "../controllers/studentController.js";

const router = express.Router();

// Get Profile for student
router.get("/profile", getStudentProfile);

// Create new student
router.post("/add_student", addStudent);

export default router;
