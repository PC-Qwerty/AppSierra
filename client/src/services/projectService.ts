import axios from "axios";
import { Project } from "../types/index.ts";
const API_URL =
  import.meta.env.VITE_API_URL + "/projects" ||
  "http://localhost:3830/api/projects";

// Create authorization header with token
const authHeader = (token: string) => {
  return {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
};

// Get all projects
const getProjects = async (token: string): Promise<Project[]> => {
  const response = await axios.get(API_URL, authHeader(token));
  return response.data;
};

// Create new project
const createProject = async (
  projectData: { title: string; description?: string },
  token: string
): Promise<Project> => {
  const response = await axios.post(API_URL, projectData, authHeader(token));
  return response.data;
};

// Update project
const updateProject = async (
  projectId: string,
  projectData: { title?: string; description?: string },
  token: string
): Promise<Project> => {
  const response = await axios.put(
    `${API_URL}/${projectId}`,
    projectData,
    authHeader(token)
  );
  return response.data;
};

// Delete project
const deleteProject = async (
  projectId: string,
  token: string
): Promise<void> => {
  await axios.delete(`${API_URL}/${projectId}`, authHeader(token));
};

const projectService = {
  getProjects,
  createProject,
  updateProject,
  deleteProject,
};

export default projectService;
