import mongoose, { Document, Schema } from "mongoose";

export interface ProjectDoc extends Document {
  title: string;
  description?: string;
  userId: mongoose.Types.ObjectId;
  createdAt?: Date;
  updatedAt?: Date;
}

const projectSchema = new Schema<ProjectDoc>(
  {
    title: {
      type: String,
      required: [true, "Please add a title"],
    },
    description: {
      type: String,
    },
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    updatedAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);

export const Project = mongoose.model<ProjectDoc>("Project", projectSchema);
