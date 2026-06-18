import { Router } from "express";

import {
  sendTestMessageController,
} from "../controllers/test.controller";

const router = Router();

router.post(
  "/message",
  sendTestMessageController
);

export default router;