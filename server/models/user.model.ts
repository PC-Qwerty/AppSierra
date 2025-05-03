import mongoose, { Document, Schema, Types } from "mongoose";

export interface UserDoc extends Document {
  _id: Types.ObjectId;
  name: string;
  email: string;
  password: string;
  country: string;
  projectCount: number;
}

const userSchema = new Schema<UserDoc>(
  {
    name: {
      type: String,
      required: [true, "Please add a name"],
    },
    email: {
      type: String,
      required: [true, "Please add an email"],
      unique: true,
    },
    password: {
      type: String,
      required: [true, "Please add a password"],
    },
    country: {
      type: String,
      required: [true, "Please add a country"],
    },
    projectCount: {
      type: Number,
      default: 0,
      max: 4,
    },
  },
  {
    toJSON: {
      transform(doc, ret) {
        delete ret.__v;
        delete ret.password;
        delete ret.createdAt;
        delete ret.updatedAt;
      },
    },
    timestamps: true,
  }
);

export const User = mongoose.model<UserDoc>("User", userSchema);
