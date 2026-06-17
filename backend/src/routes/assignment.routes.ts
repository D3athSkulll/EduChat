import {Router} from "express";

import { createAssignmentController, getAssignmentByIdController, getAssignmentsController, updateAssignmentController } from "../controllers/assignment.controller";
import { validateRequest } from "../middlewares/validate-request";
import { createAssignmentSchema, updateAssignmentSchema } from "../validators/assignment.validator";

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

router.patch(
  "/:id",
  validateRequest(updateAssignmentSchema),
  updateAssignmentController
);

export default router;