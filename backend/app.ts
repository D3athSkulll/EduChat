import express from "express";
import cors from "cors";

import healthRoutes from "./src/routes/health.routes";
import assignmentRoutes from "./src/routes/assignment.routes";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api", healthRoutes);
app.use("/api/assignments", assignmentRoutes);

export default app;