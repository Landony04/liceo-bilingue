import express from "express";
import checkAuth from "../middleware/authMiddleware.js";
import {
  addCourse,
  deleteCourse,
  getCourse,
  updateCourse,
} from "../controllers/courseController.js";

const router = express.Router();

// Apis without id
router.route("/").post(checkAuth, addCourse);

// Apis with id
router
  .route("/:id")
  .get(checkAuth, getCourse)
  .delete(checkAuth, deleteCourse)
  .put(checkAuth, updateCourse);

export default router;
