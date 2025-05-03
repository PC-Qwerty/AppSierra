import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useAtom } from "jotai";
import {
  userAtom,
  projectsAtom,
  activeProjectAtom,
  projectLoadingAtom,
  projectErrorAtom,
  tasksAtom,
  taskLoadingAtom,
  taskErrorAtom,
} from "../jotai/atoms";
import { TaskBoard } from "../components/task";
import { Modal, Button, Alert, Spinner } from "../components/ui";
import { ProjectForm } from "../components/project";
import { ArrowLeft, Edit, Trash2 } from "lucide-react";
import { projectService, taskService } from "../services";
import { Project, Task, TaskStatus } from "../types";
import { Footer, Header } from "../components/layout";

const ProjectDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [user] = useAtom(userAtom);
  const [projects, setProjects] = useAtom(projectsAtom);
  const [activeProject, setActiveProject] = useAtom(activeProjectAtom);
  const [isProjectLoading, setProjectLoading] = useAtom(projectLoadingAtom);
  const [projectError, setProjectError] = useAtom(projectErrorAtom);
  const [tasks, setTasks] = useAtom(tasksAtom);
  const [isTaskLoading, setTaskLoading] = useAtom(taskLoadingAtom);
  const [taskError, setTaskError] = useAtom(taskErrorAtom);

  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);

  // Find the active project
  const project = projects.find((p: Project) => p._id === id) || activeProject;

  useEffect(() => {
    if (!user) {
      navigate("/login");
      return;
    }

    // If no active project or project doesn't match the URL id
    if (!project || project._id !== id) {
      // Try to find the project in the current list
      const foundProject = projects.find((p: Project) => p._id === id);

      if (foundProject) {
        setActiveProject(foundProject);
      } else {
        // Redirect to dashboard if project not found
        navigate("/dashboard");
        return;
      }
    }

    // Fetch tasks for the project
    const fetchTasks = async () => {
      try {
        setTaskLoading(true);
        const fetchedTasks = await taskService.getTasks(id!, user.token!);
        setTasks(fetchedTasks);
      } catch (error) {
        setTaskError(
          error instanceof Error ? error.message : "Failed to fetch tasks"
        );
      } finally {
        setTaskLoading(false);
      }
    };

    fetchTasks();
  }, [
    user,
    project,
    id,
    navigate,
    projects,
    setActiveProject,
    setTasks,
    setTaskLoading,
    setTaskError,
  ]);

  const handleEditProject = async (data: {
    title: string;
    description?: string;
  }) => {
    try {
      setProjectLoading(true);
      const updated = await projectService.updateProject(
        id!,
        data,
        user!.token!
      );
      setProjects(projects.map((p: Project) => (p._id === id ? updated : p)));
      setActiveProject(updated);
      setIsEditModalOpen(false);
    } catch (error) {
      setProjectError(
        error instanceof Error ? error.message : "Failed to update project"
      );
    } finally {
      setProjectLoading(false);
    }
  };

  const handleDeleteProject = async () => {
    try {
      setProjectLoading(true);
      await projectService.deleteProject(id!, user!.token!);
      setProjects(projects.filter((p: Project) => p._id !== id));
      setActiveProject(null);
      navigate("/dashboard");
    } catch (error) {
      setProjectError(
        error instanceof Error ? error.message : "Failed to delete project"
      );
    } finally {
      setProjectLoading(false);
    }
  };

  const handleCreateTask = async (data: {
    title: string;
    description?: string;
    status: TaskStatus;
    projectId: string;
  }) => {
    try {
      setTaskLoading(true);
      const created = await taskService.createTask(data, user!.token!);
      setTasks([...tasks, created]);
    } catch (error) {
      setTaskError(
        error instanceof Error ? error.message : "Failed to create task"
      );
    } finally {
      setTaskLoading(false);
    }
  };

  const handleUpdateTask = async (
    taskId: string,
    data: { title?: string; description?: string; status?: TaskStatus }
  ) => {
    try {
      setTaskLoading(true);
      const updated = await taskService.updateTask(taskId, data, user!.token!);
      setTasks(tasks.map((t: Task) => (t._id === taskId ? updated : t)));
    } catch (error) {
      setTaskError(
        error instanceof Error ? error.message : "Failed to update task"
      );
    } finally {
      setTaskLoading(false);
    }
  };

  const handleDeleteTask = async (taskId: string) => {
    try {
      setTaskLoading(true);
      await taskService.deleteTask(taskId, user!.token!);
      setTasks(tasks.filter((t: Task) => t._id !== taskId));
    } catch (error) {
      setTaskError(
        error instanceof Error ? error.message : "Failed to delete task"
      );
    } finally {
      setTaskLoading(false);
    }
  };

  if (!project) {
    return (
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-grow container mx-auto px-4 py-12 flex justify-center items-center">
          <Spinner size="lg" />
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="mb-6">
          <button
            onClick={() => navigate("/dashboard")}
            className="flex items-center text-gray-600 hover:text-blue-600 transition-colors"
          >
            <ArrowLeft size={16} className="mr-1" />
            <span>Back to Projects</span>
          </button>
        </div>

        {projectError && (
          <Alert type="error" message={projectError} className="mb-6" />
        )}
        {taskError && (
          <Alert type="error" message={taskError} className="mb-6" />
        )}

        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <div className="flex flex-col md:flex-row justify-between md:items-center mb-4">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                {project.title}
              </h1>
              <p className="text-gray-500 text-sm mt-1">
                Created on {new Date(project.createdAt).toLocaleDateString()}
              </p>
            </div>

            <div className="flex mt-4 md:mt-0 space-x-2">
              <Button
                variant="outline"
                size="sm"
                iconLeft={<Edit size={16} />}
                onClick={() => setIsEditModalOpen(true)}
              >
                Edit
              </Button>
              <Button
                variant="danger"
                size="sm"
                iconLeft={<Trash2 size={16} />}
                onClick={() => setDeleteModalOpen(true)}
              >
                Delete
              </Button>
            </div>
          </div>

          {project.description && (
            <div className="mt-4 text-gray-700 border-t pt-4">
              <h2 className="text-lg font-medium mb-2">Description</h2>
              <p>{project.description}</p>
            </div>
          )}
        </div>

        {/* Task Board */}
        {isTaskLoading ? (
          <div className="flex justify-center py-8">
            <Spinner size="lg" />
          </div>
        ) : (
          <TaskBoard
            tasks={tasks}
            projectId={project._id}
            onCreateTask={handleCreateTask}
            onUpdateTask={handleUpdateTask}
            onDeleteTask={handleDeleteTask}
            isLoading={isTaskLoading}
          />
        )}
      </main>

      {/* Edit Project Modal */}
      <Modal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        title="Edit Project"
      >
        <ProjectForm
          initialData={project}
          onSubmit={handleEditProject}
          isLoading={isProjectLoading}
        />
      </Modal>

      {/* Delete Confirmation Modal */}
      <Modal
        isOpen={deleteModalOpen}
        onClose={() => setDeleteModalOpen(false)}
        title="Delete Project"
        size="sm"
      >
        <div>
          <p className="text-gray-700 mb-6">
            Are you sure you want to delete "{project.title}"? This action
            cannot be undone and will delete all tasks associated with this
            project.
          </p>
          <div className="flex justify-end space-x-3">
            <Button variant="outline" onClick={() => setDeleteModalOpen(false)}>
              Cancel
            </Button>
            <Button
              variant="danger"
              onClick={handleDeleteProject}
              isLoading={isProjectLoading}
            >
              Delete
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default ProjectDetails;
