import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAtom } from "jotai";
import {
  userAtom,
  projectsAtom,
  projectLoadingAtom,
  projectErrorAtom,
} from "../jotai/atoms";
import { ProjectCard, ProjectForm } from "../components/project";
import { Modal, Button, Alert, Spinner } from "../components/ui";
import { projectService, taskService } from "../services";
import { Plus } from "lucide-react";
import { Project, Task } from "../types";

const Dashboard: React.FC = () => {
  const navigate = useNavigate();
  const [userToken] = useAtom(userAtom);
  const user = userToken?.user;
  const [projects, setProjects] = useAtom(projectsAtom);
  const [isLoading, setIsLoading] = useAtom(projectLoadingAtom);
  const [error, setError] = useAtom(projectErrorAtom);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentProject, setCurrentProject] = useState<Project | null>(null);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [projectToDelete, setProjectToDelete] = useState<Project | null>(null);
  const [projectTasks, setProjectTasks] = useState<{ [key: string]: Task[] }>(
    {}
  );

  useEffect(() => {
    if (!user) {
      navigate("/login");
      return;
    }

    // Fetch projects
    const fetchProjects = async () => {
      try {
        setIsLoading(true);
        const fetchedProjects = await projectService.getProjects(
          userToken.token
        );
        setProjects(fetchedProjects);

        // Fetch tasks for each project
        const tasksPromises = fetchedProjects.map(async (project) => {
          const tasks = await taskService.getTasks(
            project._id,
            userToken.token
          );
          return { projectId: project._id, tasks };
        });

        const tasksResults = await Promise.all(tasksPromises);
        const tasksMap: { [key: string]: Task[] } = {};

        tasksResults.forEach((result) => {
          tasksMap[result.projectId] = result.tasks;
        });

        setProjectTasks(tasksMap);
      } catch (error) {
        setError(
          error instanceof Error ? error.message : "Failed to fetch projects"
        );
      } finally {
        setIsLoading(false);
      }
    };

    fetchProjects();
  }, [user, userToken?.token, navigate, setProjects, setIsLoading, setError]);

  const handleCreateClick = () => {
    setCurrentProject(null);
    setIsModalOpen(true);
  };

  const handleEditClick = (project: Project) => {
    setCurrentProject(project);
    setIsModalOpen(true);
  };

  const handleDeleteClick = (project: Project) => {
    setProjectToDelete(project);
    setDeleteModalOpen(true);
  };

  const handleViewProject = (project: Project) => {
    navigate(`/projects/${project._id}`);
  };

  const handleProjectSubmit = async (data: {
    title: string;
    description?: string;
  }) => {
    try {
      setIsLoading(true);
      if (!userToken?.token) {
        throw new Error("User token is not available.");
      }
      if (currentProject) {
        // Update project
        const updated = await projectService.updateProject(
          currentProject._id,
          data,
          userToken?.token
        );
        setProjects(
          projects.map((p: Project) =>
            p._id === currentProject._id ? updated : p
          )
        );
      } else {
        // Create project
        const created = await projectService.createProject(
          data,
          userToken?.token
        );
        setProjects([...projects, created]);

        // Initialize empty tasks array for the new project
        setProjectTasks((prev) => ({
          ...prev,
          [created._id]: [],
        }));
      }
      setIsModalOpen(false);
    } catch (error) {
      setError(
        error instanceof Error ? error.message : "Failed to save project"
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteConfirm = async () => {
    if (!projectToDelete) return;
    if (!userToken?.token) {
      throw new Error("User token is not available.");
    }
    try {
      setIsLoading(true);
      await projectService.deleteProject(projectToDelete._id, userToken?.token);
      setProjects(
        projects.filter((p: Project) => p._id !== projectToDelete._id)
      );

      // Remove tasks for the deleted project
      const newProjectTasks = { ...projectTasks };
      delete newProjectTasks[projectToDelete._id];
      setProjectTasks(newProjectTasks);

      setDeleteModalOpen(false);
    } catch (error) {
      setError(
        error instanceof Error ? error.message : "Failed to delete project"
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">My Projects</h1>
            <p className="text-gray-600 mt-1">
              Manage and organize your projects
            </p>
          </div>

          <div className="mt-4 md:mt-0">
            <Button
              onClick={handleCreateClick}
              iconLeft={<Plus size={16} />}
              disabled={
                user?.projectCount !== undefined && user.projectCount >= 4
              }
            >
              New Project
            </Button>
            {user?.projectCount !== undefined && user.projectCount >= 4 && (
              <p className="text-red-500 text-xs mt-1">
                Maximum project limit reached (4)
              </p>
            )}
          </div>
        </div>

        {error && <Alert type="error" message={error} className="mb-6" />}

        {isLoading ? (
          <div className="flex justify-center py-12">
            <Spinner size="lg" />
          </div>
        ) : projects.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((project: Project) => (
              <ProjectCard
                key={project._id}
                project={project}
                tasks={projectTasks[project._id] || []}
                onEdit={() => handleEditClick(project)}
                onDelete={() => handleDeleteClick(project)}
                onView={() => handleViewProject(project)}
              />
            ))}
          </div>
        ) : (
          <div className="flex flex-col justify-center items-center text-center py-16 bg-white rounded-lg shadow-sm">
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              No projects yet
            </h3>
            <p className="text-gray-600 mb-6 max-w-md mx-auto">
              Create your first project to get started managing your tasks
              efficiently.
            </p>
            <Button onClick={handleCreateClick} iconLeft={<Plus size={16} />}>
              Create First Project
            </Button>
          </div>
        )}
      </main>

      {/* Create/Edit Project Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={currentProject ? "Edit Project" : "Create New Project"}
      >
        <ProjectForm
          initialData={currentProject || undefined}
          onSubmit={handleProjectSubmit}
          isLoading={isLoading}
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
            Are you sure you want to delete "{projectToDelete?.title}"? This
            action cannot be undone and will delete all tasks associated with
            this project.
          </p>
          <div className="flex justify-end space-x-3">
            <Button variant="outline" onClick={() => setDeleteModalOpen(false)}>
              Cancel
            </Button>
            <Button
              variant="danger"
              onClick={handleDeleteConfirm}
              isLoading={isLoading}
            >
              Delete
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default Dashboard;
