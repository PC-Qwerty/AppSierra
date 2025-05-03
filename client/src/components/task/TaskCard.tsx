import React from "react";
import { Task } from "../../types";
import { CheckCircle, Clock, Circle, Edit, Trash2 } from "lucide-react";

interface TaskCardProps {
  task: Task;
  onEdit: () => void;
  onDelete: () => void;
  onStatusChange: (status: "TODO" | "IN_PROGRESS" | "COMPLETED") => void;
}

const TaskCard: React.FC<TaskCardProps> = ({
  task,
  onEdit,
  onDelete,
  onStatusChange,
}) => {
  // Format date
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  // Get status styling
  const getStatusStyles = () => {
    switch (task.status) {
      case "COMPLETED":
        return {
          bg: "bg-green-100",
          text: "text-green-800",
          icon: <CheckCircle size={16} className="text-green-600" />,
        };
      case "IN_PROGRESS":
        return {
          bg: "bg-blue-100",
          text: "text-blue-800",
          icon: <Clock size={16} className="text-blue-600" />,
        };
      default:
        return {
          bg: "bg-gray-100",
          text: "text-gray-800",
          icon: <Circle size={16} className="text-gray-600" />,
        };
    }
  };

  const statusStyles = getStatusStyles();

  // Status options for dropdown
  const statusOptions = [
    { status: "TODO", label: "To Do" },
    { status: "IN_PROGRESS", label: "In Progress" },
    { status: "COMPLETED", label: "Completed" },
  ];

  return (
    <div
      className={`bg-white rounded-lg border shadow-sm p-4 mb-3 ${
        task.status === "COMPLETED" ? "opacity-80" : ""
      }`}
    >
      <div className="flex justify-between items-start mb-2">
        <h3
          className={`font-medium ${
            task.status === "COMPLETED"
              ? "line-through text-gray-500"
              : "text-gray-900"
          }`}
        >
          {task.title}
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

      {task.description && (
        <p className="text-sm text-gray-600 mb-3">{task.description}</p>
      )}

      <div className="flex justify-between items-center">
        <div className="flex items-center">
          <span className="text-xs text-gray-500">
            {formatDate(task.createdAt)}
          </span>
        </div>

        <div className="relative">
          <select
            value={task.status}
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            onChange={(e) => onStatusChange(e.target.value as any)}
            className={`
              ${statusStyles.bg} ${statusStyles.text}
              text-xs font-medium rounded-full py-1 pl-2 pr-7 appearance-none
              cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500
            `}
          >
            {statusOptions.map((option) => (
              <option key={option.status} value={option.status}>
                {option.label}
              </option>
            ))}
          </select>
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
            {statusStyles.icon}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaskCard;
