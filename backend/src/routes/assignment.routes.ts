import {Router} from "express";

import { createAssignmentController, getAssignmentByIdController, getAssignmentsController } from "../controllers/assignment.controller";
import { validateRequest } from "../middlewares/validate-request";
import { createAssignmentSchema } from "../validators/assignment.validator";

const router = Router();

router.post(
    "/",
    validateRequest(createAssignmentSchema),
    createAssignmentController
);

router.get(
    "/",
    getAssignmentsController
);

router.get(
    "/:id",
    getAssignmentByIdController
)

export default router;