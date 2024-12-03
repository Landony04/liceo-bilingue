import express from "express";
import {
  addStudent,
  getStudentProfile,
  updateStudent,
  deleteStudent,
} from "../controllers/studentController.js";
import checkAuth from "../middleware/authMiddleware.js";

const router = express.Router();

// Add new student
router.route("/").post(checkAuth, addStudent);

// Get,updated and delete student
router
  .route("/:id")
  .get(checkAuth, getStudentProfile)
  .put(checkAuth, updateStudent)
  .delete(checkAuth, deleteStudent);

export default router;
