import express from "express";
import {
  getProjects,
  createProject,
  updateProject,
  deleteProject,
} from "../controllers";
import { validateAuth } from "../middleware/auth.ts";

const router = express.Router();

router.get("/", validateAuth, getProjects);
router.post("/", validateAuth, createProject);

router.put("/:id", validateAuth, updateProject);
router.delete("/:id", validateAuth, deleteProject);

export { router as projectRouter };
