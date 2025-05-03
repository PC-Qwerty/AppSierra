import axios from "axios";
import { Task } from "../types/index.ts";

const API_URL =
  import.meta.env.VITE_API_URL + "/tasks" || "http://localhost:3830/api/tasks";

// Create authorization header with token
const authHeader = (token: string) => {
  return {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
};

// Get all tasks for a project
const getTasks = async (projectId: string, token: string): Promise<Task[]> => {
  const response = await axios.get(
    `${API_URL}?projectId=${projectId}`,
    authHeader(token)
  );
  return response.data;
};

// Create new task
const createTask = async (
  taskData: {
    title: string;
    description?: string;
    status?: "TODO" | "IN_PROGRESS" | "COMPLETED";
    projectId: string;
  },
  token: string
): Promise<Task> => {
  const response = await axios.post(API_URL, taskData, authHeader(token));
  return response.data;
};

// Update task
const updateTask = async (
  taskId: string,
  taskData: {
    title?: string;
    description?: string;
    status?: "TODO" | "IN_PROGRESS" | "COMPLETED";
  },
  token: string
): Promise<Task> => {
  const response = await axios.put(
    `${API_URL}/${taskId}`,
    taskData,
    authHeader(token)
  );
  return response.data;
};

// Delete task
const deleteTask = async (taskId: string, token: string): Promise<void> => {
  await axios.delete(`${API_URL}/${taskId}`, authHeader(token));
};

const taskService = {
  getTasks,
  createTask,
  updateTask,
  deleteTask,
};

export default taskService;
