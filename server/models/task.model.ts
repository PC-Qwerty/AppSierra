import mongoose, { Document, Schema } from "mongoose";

export interface TaskDoc extends Document {
  title: string;
  description?: string;
  status: "TODO" | "IN_PROGRESS" | "COMPLETED";
  projectId: mongoose.Types.ObjectId;
  userId: mongoose.Types.ObjectId;
  createdAt?: Date;
  completedAt?: Date;
}

const taskSchema = new Schema<TaskDoc>(
  {
    title: {
      type: String,
      required: [true, "Please add a title"],
    },
    description: {
      type: String,
    },
    status: {
      type: String,
      enum: ["TODO", "IN_PROGRESS", "COMPLETED"],
      default: "TODO",
    },
    projectId: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "Project",
    },
    userId: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    completedAt: {
      type: Date,
    },
  },
  {
    timestamps: true,
  }
);

export const Task = mongoose.model<TaskDoc>("Task", taskSchema);
