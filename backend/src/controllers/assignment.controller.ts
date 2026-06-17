import { Request, Response } from "express";

import { createAssignment } from "../services/assignment.service";

export const createAssignmentController = async (
  req: Request,
  res: Response,
) => {
  try {
    const assignment = await createAssignment(req.body);
    return res.status(201).json({
      success: true,
      data: assignment,
    });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Something went wrong";

    return res.status(400).json({
      success: false,
      message,
    });
  }
};
