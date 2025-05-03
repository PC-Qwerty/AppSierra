import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { errorHandler } from "./middleware/customError.ts";

import connectDB from "./config/db.ts";
import { projectRouter, userRouter, taskRouter } from "./routes";

dotenv.config();

connectDB();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Routes
app.use("/api/auth", userRouter);
app.use("/api/projects", projectRouter);
app.use("/api/tasks", taskRouter);

// Error handler
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
