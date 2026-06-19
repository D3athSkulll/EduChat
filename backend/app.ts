import express from "express";
import cors from "cors";

import healthRoutes from "./src/routes/health.routes";
import assignmentRoutes from "./src/routes/assignment.routes";
import generationRoutes from "./src/routes/generation.routes";
import assessmentResultRoutes from "./src/routes/assessment-result.routes"

import {errorMiddleware} from "./src/middlewares/error.middleware";

const app = express();

app.use(cors());
app.use(express.json());
app.use(errorMiddleware);

app.use("/api", healthRoutes);
app.use("/api/assignments", assignmentRoutes);
app.use("/api/assignments", generationRoutes);
app.use("/api/results", assessmentResultRoutes);

export default app;