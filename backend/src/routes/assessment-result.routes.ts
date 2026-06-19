import {Router} from "express";

import { getResultController, getAssignmentResultsController } from "../controllers/assessment-result.controller";

const router = Router();

router.get("/assignment/:assignmentId", getAssignmentResultsController);
router.get("/:resultId", getResultController);


export default router;