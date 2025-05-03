import { useAtom } from "jotai";
import { tasksAtom, taskLoadingAtom, taskErrorAtom } from "../jotai/atoms.ts";
import taskService from "../services/taskService.ts";
import { TaskStatus } from "../types";

export const useTask = () => {
  const [tasks, setTasks] = useAtom(tasksAtom);
  const [isLoading, setIsLoading] = useAtom(taskLoadingAtom);
  const [error, setError] = useAtom(taskErrorAtom);

  const getTasks = async (projectId: string, token: string) => {
    try {
      setIsLoading(true);
      setError("");
      const data = await taskService.getTasks(projectId, token);
      setTasks(data);
    } catch (error) {
      setError(
        error instanceof Error ? error.message : "Failed to fetch tasks"
      );
    } finally {
      setIsLoading(false);
    }
  };

  const createTask = async (
    data: {
      title: string;
      description?: string;
      status?: TaskStatus;
      projectId: string;
    },
    token: string
  ) => {
    try {
      setIsLoading(true);
      setError("");
      const newTask = await taskService.createTask(data, token);
      setTasks([...tasks, newTask]);
      return newTask;
    } catch (error) {
      setError(
        error instanceof Error ? error.message : "Failed to create task"
      );
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const updateTask = async (
    id: string,
    data: { title?: string; description?: string; status?: TaskStatus },
    token: string
  ) => {
    try {
      setIsLoading(true);
      setError("");
      const updated = await taskService.updateTask(id, data, token);
      setTasks(tasks.map((t) => (t._id === id ? updated : t)));
      return updated;
    } catch (error) {
      setError(
        error instanceof Error ? error.message : "Failed to update task"
      );
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const deleteTask = async (id: string, token: string) => {
    try {
      setIsLoading(true);
      setError("");
      await taskService.deleteTask(id, token);
      setTasks(tasks.filter((t) => t._id !== id));
    } catch (error) {
      setError(
        error instanceof Error ? error.message : "Failed to delete task"
      );
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    tasks,
    isLoading,
    error,
    getTasks,
    createTask,
    updateTask,
    deleteTask,
  };
};
