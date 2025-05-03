import React from "react";
import { FormProvider, useForm } from "react-hook-form";
import { FormInput, FormTextarea, Button } from "../ui";
import { Project } from "../../types";

interface ProjectFormValues {
  title: string;
  description?: string;
}

interface ProjectFormProps {
  initialData?: Project;
  onSubmit: (data: ProjectFormValues) => void;
  isLoading: boolean;
}

const ProjectForm: React.FC<ProjectFormProps> = ({
  initialData,
  onSubmit,
  isLoading,
}) => {
  const methods = useForm<ProjectFormValues>({
    defaultValues: {
      title: initialData?.title || "",
      description: initialData?.description || "",
    },
  });

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)}>
        <FormInput
          name="title"
          label="Project Title"
          placeholder="Enter project title"
          required
          autoFocus
        />
        <FormTextarea
          name="description"
          label="Description"
          placeholder="Enter project description (optional)"
          rows={4}
        />
        <div className="mt-6">
          <Button type="submit" isLoading={isLoading} fullWidth>
            {initialData ? "Update Project" : "Create Project"}
          </Button>
        </div>
      </form>
    </FormProvider>
  );
};

export default ProjectForm;
