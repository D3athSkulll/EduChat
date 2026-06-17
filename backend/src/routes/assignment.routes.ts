import {Router} from "express";

import { createAssignmentController } from "../controllers/assignment.controller";
import { validateRequest } from "../middlewares/validate-request";
import { createAssignmentSchema } from "../validators/assignment.validator";

const router = Router();

router.post(
    "/",
    validateRequest(createAssignmentSchema),
    createAssignmentController
);

export default router;