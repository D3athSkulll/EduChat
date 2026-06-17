import {Router} from "express";

import { createAssignmentController } from "../controllers/assignment.controller";

const router = Router();

router.post(
    "/",
    createAssignmentController
);

export default router;