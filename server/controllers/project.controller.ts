import { Project, Task, User } from "../models";
import { Request, Response } from "express";
import "../types/express";

const getProjects = async (req: Request, res: Response) => {
  try {
    if (!req.user) {
      res.status(401);
      throw new Error("Not authorized");
    }
    const projects = await Project.find({ userId: req.user._id });
    res.status(200).json(projects);
  } catch (error: unknown) {
    res.status(500).json({
      message: error instanceof Error ? error.message : "An error occurred",
    });
  }
};

const createProject = async (req: Request, res: Response) => {
  try {
    if (!req.user) {
      res.status(401);
      throw new Error("Not authorized");
    }

    const { title, description } = req.body;

    if (!title) {
      res.status(400);
      throw new Error("Please add a title");
    }

    const user = await User.findById(req.user._id);
    if (!user) {
      res.status(404);
      throw new Error("User not found");
    }

    if (user.projectCount >= 4) {
      res.status(400);
      throw new Error("Project limit reached (max: 4)");
    }

    const project = await Project.create({
      title,
      description,
      userId: req.user._id,
    });

    await User.findByIdAndUpdate(
      req.user._id,
      { projectCount: user.projectCount + 1 },
      { new: true }
    );

    res.status(201).json(project);
  } catch (error: unknown) {
    res.status(500).json({
      message: error instanceof Error ? error.message : "An error occurred",
    });
  }
};

const updateProject = async (req: Request, res: Response) => {
  try {
    if (!req.user) {
      res.status(401);
      throw new Error("Not authorized");
    }

    const project = await Project.findById(req.params.id);

    if (!project) {
      res.status(404);
      throw new Error("Project not found");
    }

    if (project.userId.toString() !== req.user._id.toString()) {
      res.status(401);
      throw new Error("Not authorized");
    }

    const updatedProject = await Project.findByIdAndUpdate(
      req.params.id,
      { ...req.body, updatedAt: Date.now() },
      { new: true }
    );

    res.status(200).json(updatedProject);
  } catch (error: unknown) {
    res.status(500).json({
      message: error instanceof Error ? error.message : "An error occurred",
    });
  }
};

const deleteProject = async (req: Request, res: Response) => {
  try {
    if (!req.user) {
      res.status(401);
      throw new Error("Not authorized");
    }

    const project = await Project.findById(req.params.id);

    if (!project) {
      res.status(404);
      throw new Error("Project not found");
    }

    if (project.userId.toString() !== req.user._id.toString()) {
      res.status(401);
      throw new Error("Not authorized");
    }

    await Task.deleteMany({ projectId: project._id });

    await project.deleteOne();

    const user = await User.findById(req.user._id);
    if (!user) {
      res.status(404);
      throw new Error("User not found");
    }
    await User.findByIdAndUpdate(
      req.user._id,
      { projectCount: Math.max(0, user.projectCount - 1) },
      { new: true }
    );

    res.status(200).json({ success: true });
  } catch (error: unknown) {
    res.status(500).json({
      message: error instanceof Error ? error.message : "An error occurred",
    });
  }
};

export { getProjects, createProject, updateProject, deleteProject };
