import express from "express";
import { ensureAuthenticated } from "../middlewares/Auth.js";
import {
  getAllTasks,
  createTask,
  updateTask,
  deleteTask
} from "../controllers/TaskController.js";

const router = express.Router();

router.get("/", ensureAuthenticated, getAllTasks);
router.post("/", ensureAuthenticated, createTask);
router.put("/:id", ensureAuthenticated, updateTask);
router.delete("/:id", ensureAuthenticated, deleteTask);

export default router;