export type TaskStatus = "TODO" | "IN_PROGRESS" | "COMPLETED";

export interface User {
  user: {
    _id: string;
    name: string;
    email: string;
    country: string;
    projectCount: number;
    createdAt?: string;
    updatedAt?: string;
  };
  token: string;
}

export interface Project {
  _id: string;
  title: string;
  description?: string;
  userId: string;
  createdAt: string;
  updatedAt: string;
}

export interface Task {
  _id: string;
  title: string;
  description?: string;
  status: "TODO" | "IN_PROGRESS" | "COMPLETED";
  projectId: string;
  userId: string;
  createdAt: string;
  completedAt?: string;
}

export interface AuthState {
  user: User | null;
  isLoading: boolean;
  isError: boolean;
  isSuccess: boolean;
  message: string;
}

export interface ProjectState {
  projects: Project[];
  activeProject: Project | null;
  isLoading: boolean;
  isError: boolean;
  isSuccess: boolean;
  message: string;
}

export interface TaskState {
  tasks: Task[];
  isLoading: boolean;
  isError: boolean;
  isSuccess: boolean;
  message: string;
}

export interface ApiError {
  response?: {
    data?: {
      message?: string;
    };
  };
  message: string;
}

export interface ApiResponse<T> {
  data: T;
}
