import { Router } from "express";
import { generateAssessmentController } from "../controllers/generation.controller";

const router = Router();

router.post("/:id/generate", generateAssessmentController);

export default router;