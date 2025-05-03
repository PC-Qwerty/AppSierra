import { Project, Task } from "../models";
import { Request, Response } from "express";
import "../types/express";

const getTasks = async (req: Request, res: Response) => {
  try {
    if (!req.user) {
      res.status(401);
      throw new Error("Not authorized");
    }

    const { projectId } = req.query;

    if (!projectId) {
      res.status(400);
      throw new Error("Project ID is required");
    }

    const project = await Project.findOne({
      _id: projectId,
      userId: req.user._id,
    });

    if (!project) {
      res.status(404);
      throw new Error("Project not found or not authorized");
    }

    const tasks = await Task.find({ projectId });
    res.status(200).json(tasks);
  } catch (error) {
    res.status(500).json({
      message: error instanceof Error ? error.message : "An error occurred",
    });
  }
};

const createTask = async (req: Request, res: Response) => {
  try {
    if (!req.user) {
      res.status(401);
      throw new Error("Not authorized");
    }

    const { title, description, projectId, status } = req.body;

    if (!title || !projectId) {
      res.status(400);
      throw new Error("Please provide title and project ID");
    }

    const project = await Project.findOne({
      _id: projectId,
      userId: req.user._id,
    });

    if (!project) {
      res.status(404);
      throw new Error("Project not found or not authorized");
    }

    const task = await Task.create({
      title,
      description,
      status: status || "TODO",
      projectId,
      userId: req.user._id,
    });

    await Project.findByIdAndUpdate(
      projectId,
      { updatedAt: Date.now() },
      { new: true }
    );

    res.status(201).json(task);
  } catch (error) {
    res.status(500).json({
      message: error instanceof Error ? error.message : "An error occurred",
    });
  }
};

const updateTask = async (req: Request, res: Response) => {
  try {
    if (!req.user) {
      res.status(401);
      throw new Error("Not authorized");
    }

    const task = await Task.findById(req.params.id);

    if (!task) {
      res.status(404);
      throw new Error("Task not found");
    }

    if (task.userId.toString() !== req.user._id.toString()) {
      res.status(401);
      throw new Error("Not authorized");
    }

    const updates = { ...req.body };
    if (req.body.status === "COMPLETED" && task.status !== "COMPLETED") {
      updates.completedAt = Date.now();
    } else if (req.body.status !== "COMPLETED" && task.status === "COMPLETED") {
      updates.completedAt = null;
    }

    const updatedTask = await Task.findByIdAndUpdate(req.params.id, updates, {
      new: true,
    });

    await Project.findByIdAndUpdate(
      task.projectId,
      { updatedAt: Date.now() },
      { new: true }
    );

    res.status(200).json(updatedTask);
  } catch (error) {
    res.status(500).json({
      message: error instanceof Error ? error.message : "An error occurred",
    });
  }
};

const deleteTask = async (req: Request, res: Response) => {
  try {
    if (!req.user) {
      res.status(401);
      throw new Error("Not authorized");
    }

    const task = await Task.findById(req.params.id);

    if (!task) {
      res.status(404);
      throw new Error("Task not found");
    }

    if (task.userId.toString() !== req.user._id.toString()) {
      res.status(401);
      throw new Error("Not authorized");
    }

    await task.deleteOne();

    await Project.findByIdAndUpdate(
      task.projectId,
      { updatedAt: Date.now() },
      { new: true }
    );

    res.status(200).json({ success: true });
  } catch (error) {
    res.status(500).json({
      message: error instanceof Error ? error.message : "An error occurred",
    });
  }
};

export { getTasks, createTask, updateTask, deleteTask };
