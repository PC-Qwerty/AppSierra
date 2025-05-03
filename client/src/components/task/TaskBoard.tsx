import React, { useState, useMemo } from "react";
import { Task, TaskStatus } from "../../types";
import { TaskCard, TaskForm } from "../task";
import { Modal, Button } from "../ui";
import { Plus } from "lucide-react";

interface TaskBoardProps {
  tasks: Task[];
  projectId: string;
  onCreateTask: (data: {
    title: string;
    description?: string;
    status: TaskStatus;
    projectId: string;
  }) => void;
  onUpdateTask: (
    id: string,
    data: { title?: string; description?: string; status?: TaskStatus }
  ) => void;
  onDeleteTask: (id: string) => void;
  isLoading: boolean;
}

const TaskBoard: React.FC<TaskBoardProps> = ({
  tasks,
  projectId,
  onCreateTask,
  onUpdateTask,
  onDeleteTask,
  isLoading,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentTask, setCurrentTask] = useState<Task | null>(null);

  // Group tasks by status
  const groupedTasks = useMemo(() => {
    const groups = {
      TODO: tasks.filter((task) => task.status === "TODO"),
      IN_PROGRESS: tasks.filter((task) => task.status === "IN_PROGRESS"),
      COMPLETED: tasks.filter((task) => task.status === "COMPLETED"),
    };
    return groups;
  }, [tasks]);

  const handleCreateClick = () => {
    setCurrentTask(null);
    setIsModalOpen(true);
  };

  const handleEditClick = (task: Task) => {
    setCurrentTask(task);
    setIsModalOpen(true);
  };

  const handleSubmit = (data: {
    title: string;
    description?: string;
    status: "TODO" | "IN_PROGRESS" | "COMPLETED";
  }) => {
    if (currentTask) {
      onUpdateTask(currentTask._id, data);
    } else {
      onCreateTask({ ...data, projectId });
    }
    setIsModalOpen(false);
  };

  const handleStatusChange = (
    taskId: string,
    status: "TODO" | "IN_PROGRESS" | "COMPLETED"
  ) => {
    onUpdateTask(taskId, { status });
  };

  // Column configuration
  const columns = [
    { id: "TODO", title: "To Do", color: "border-gray-500" },
    { id: "IN_PROGRESS", title: "In Progress", color: "border-blue-500" },
    { id: "COMPLETED", title: "Completed", color: "border-green-500" },
  ];

  return (
    <div className="mt-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold text-gray-800">Tasks</h2>
        <Button
          onClick={handleCreateClick}
          iconLeft={<Plus size={16} />}
          size="sm"
        >
          Add Task
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {columns.map((column) => (
          <div
            key={column.id}
            className={`bg-gray-50 p-3 rounded-lg border-t-4 ${column.color}`}
          >
            <h3 className="text-sm font-medium mb-2 flex justify-between">
              <span>{column.title}</span>
              <span className="bg-gray-200 text-gray-700 px-2 rounded-full text-xs">
                {groupedTasks[column.id as keyof typeof groupedTasks].length}
              </span>
            </h3>

            <div className="space-y-2 min-h-[100px]">
              {groupedTasks[column.id as keyof typeof groupedTasks].map(
                (task) => (
                  <TaskCard
                    key={task._id}
                    task={task}
                    onEdit={() => handleEditClick(task)}
                    onDelete={() => onDeleteTask(task._id)}
                    onStatusChange={(status) =>
                      handleStatusChange(task._id, status)
                    }
                  />
                )
              )}

              {groupedTasks[column.id as keyof typeof groupedTasks].length ===
                0 && (
                <div className="text-center py-8 text-gray-400 text-sm">
                  No tasks yet
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={currentTask ? "Edit Task" : "Add New Task"}
      >
        <TaskForm
          initialData={currentTask || undefined}
          onSubmit={handleSubmit}
          isLoading={isLoading}
        />
      </Modal>
    </div>
  );
};

export default TaskBoard;
