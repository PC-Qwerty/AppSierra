import { useRecoilState, useResetRecoilState } from "recoil";
import {
  projectsState,
  activeProjectState,
  projectLoadingState,
  projectErrorState,
} from "../recoil/atoms.ts";
import projectService from "../services/projectService.ts";

export const useProject = () => {
  const [projects, setProjects] = useRecoilState(projectsState);
  const [activeProject, setActiveProject] = useRecoilState(activeProjectState);
  const [isLoading, setIsLoading] = useRecoilState(projectLoadingState);
  const [error, setError] = useRecoilState(projectErrorState);

  const resetProjects = useResetRecoilState(projectsState);
  const resetActiveProject = useResetRecoilState(activeProjectState);
  const resetError = useResetRecoilState(projectErrorState);

  const getProjects = async (token: string) => {
    try {
      setIsLoading(true);
      setError("");
      const data = await projectService.getProjects(token);
      setProjects(data);
    } catch (error) {
      setError(
        error instanceof Error ? error.message : "Failed to fetch projects"
      );
    } finally {
      setIsLoading(false);
    }
  };

  const createProject = async (
    data: { title: string; description?: string },
    token: string
  ) => {
    try {
      setIsLoading(true);
      setError("");
      const newProject = await projectService.createProject(data, token);
      setProjects([...projects, newProject]);
      setActiveProject(newProject);
      return newProject;
    } catch (error) {
      setError(
        error instanceof Error ? error.message : "Failed to create project"
      );
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const updateProject = async (
    id: string,
    data: { title?: string; description?: string },
    token: string
  ) => {
    try {
      setIsLoading(true);
      setError("");
      const updated = await projectService.updateProject(id, data, token);
      setProjects(projects.map((p) => (p._id === id ? updated : p)));
      if (activeProject?._id === id) {
        setActiveProject(updated);
      }
      return updated;
    } catch (error) {
      setError(
        error instanceof Error ? error.message : "Failed to update project"
      );
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const deleteProject = async (id: string, token: string) => {
    try {
      setIsLoading(true);
      setError("");
      await projectService.deleteProject(id, token);
      setProjects(projects.filter((p) => p._id !== id));
      if (activeProject?._id === id) {
        setActiveProject(null);
      }
    } catch (error) {
      setError(
        error instanceof Error ? error.message : "Failed to delete project"
      );
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    projects,
    activeProject,
    isLoading,
    error,
    setActiveProject,
    getProjects,
    createProject,
    updateProject,
    deleteProject,
    resetProjects,
    resetActiveProject,
    resetError,
  };
};
