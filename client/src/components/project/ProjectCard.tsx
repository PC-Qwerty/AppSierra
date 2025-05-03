import React from "react";
import { Project, Task } from "../../types";
import { Calendar, Edit, Trash2, ArrowRight } from "lucide-react";
import { Button } from "../ui";

interface ProjectCardProps {
  project: Project;
  tasks?: Task[];
  onEdit: () => void;
  onDelete: () => void;
  onView: () => void;
}

const ProjectCard: React.FC<ProjectCardProps> = ({
  project,
  tasks = [],
  onEdit,
  onDelete,
  onView,
}) => {
  // Calculate task statistics
  const totalTasks = tasks.length;
  const completedTasks = tasks.filter((t) => t.status === "COMPLETED").length;
  const progress =
    totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;

  // Format date
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-100 hover:shadow-lg transition-shadow duration-300">
      <div className="p-5">
        <div className="flex justify-between items-start mb-3">
          <h3 className="text-lg font-semibold text-gray-900 mb-1 truncate">
            {project.title}
          </h3>
          <div className="flex space-x-1">
            <button
              onClick={onEdit}
              className="text-gray-400 hover:text-blue-500 p-1 rounded transition-colors"
            >
              <Edit size={16} />
            </button>
            <button
              onClick={onDelete}
              className="text-gray-400 hover:text-red-500 p-1 rounded transition-colors"
            >
              <Trash2 size={16} />
            </button>
          </div>
        </div>

        <p className="text-gray-600 text-sm mb-4 line-clamp-2 min-h-[40px]">
          {project.description || "No description provided."}
        </p>

        <div className="mb-4">
          <div className="flex justify-between mb-1 text-xs font-medium">
            <span>
              {completedTasks} of {totalTasks} tasks completed
            </span>
            <span>{progress}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-blue-600 h-2 rounded-full transition-all duration-500 ease-out"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
        </div>

        <div className="flex items-center text-xs text-gray-500 mb-4">
          <Calendar size={14} className="mr-1" />
          <span>Created {formatDate(project.createdAt)}</span>
        </div>

        <Button
          variant="primary"
          size="sm"
          fullWidth
          onClick={onView}
          iconRight={<ArrowRight size={16} />}
        >
          View Project
        </Button>
      </div>
    </div>
  );
};

export default ProjectCard;
