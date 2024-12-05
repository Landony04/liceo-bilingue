import express from "express";
import checkAuth from "../middleware/authMiddleware.js";
import {
  addTeacher,
  getTeacherProfile,
  updateTeacher,
  deleteTeacher,
} from "../controllers/teacherController.js";

const router = express.Router();

// Add teacher
router.route("/").post(checkAuth, addTeacher);

// Get, updated and delete teacher
router
  .route("/:id")
  .get(checkAuth, getTeacherProfile)
  .put(checkAuth, updateTeacher)
  .delete(checkAuth, deleteTeacher);

export default router;
