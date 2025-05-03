import express from "express";
import { getTasks, createTask, updateTask, deleteTask } from "../controllers";
import { validateAuth } from "../middleware/auth.ts";

const router = express.Router();

router.get("/", validateAuth, getTasks);
router.post("/", validateAuth, createTask);

router.put("/:id", validateAuth, updateTask);
router.delete("/:id", validateAuth, deleteTask);

export { router as taskRouter };
