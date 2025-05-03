import React from "react";
import { FormProvider, useForm } from "react-hook-form";
import { FormInput, FormSelect, Button, FormTextarea } from "../ui";
import { Task } from "../../types";

interface TaskFormValues {
  title: string;
  description?: string;
  status: "TODO" | "IN_PROGRESS" | "COMPLETED";
}

interface TaskFormProps {
  initialData?: Task;
  onSubmit: (data: TaskFormValues) => void;
  isLoading: boolean;
}

const TaskForm: React.FC<TaskFormProps> = ({
  initialData,
  onSubmit,
  isLoading,
}) => {
  const methods = useForm<TaskFormValues>({
    defaultValues: {
      title: initialData?.title || "",
      description: initialData?.description || "",
      status: initialData?.status || "TODO",
    },
  });

  const statusOptions = [
    { value: "TODO", label: "To Do" },
    { value: "IN_PROGRESS", label: "In Progress" },
    { value: "COMPLETED", label: "Completed" },
  ];

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)}>
        <FormInput
          name="title"
          label="Task Title"
          placeholder="Enter task title"
          required
          autoFocus
        />
        <FormTextarea
          name="description"
          label="Description"
          placeholder="Enter task description (optional)"
          rows={3}
        />
        <FormSelect
          name="status"
          label="Status"
          options={statusOptions}
          required
        />
        <div className="mt-6">
          <Button type="submit" isLoading={isLoading} fullWidth>
            {initialData ? "Update Task" : "Create Task"}
          </Button>
        </div>
      </form>
    </FormProvider>
  );
};

export default TaskForm;
