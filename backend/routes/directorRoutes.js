import express from "express";
import checkAuth from "../middleware/authMiddleware.js";
import {
  addDirector,
  getDirectorProfile,
  updateDirector,
  deleteDirector,
} from "../controllers/directorController.js";

const router = express.Router();

// Add director
router.route("/").post(checkAuth, addDirector);

// Get, updated and delete Director
router
  .route("/:id")
  .get(checkAuth, getDirectorProfile)
  .put(checkAuth, updateDirector)
  .delete(checkAuth, deleteDirector);

export default router;
