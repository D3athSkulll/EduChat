import { Request, Response } from "express";

import {
  createAssignment,
  getAssignments,
  getAssignmentById,
} from "../services/assignment.service";
import { success } from "zod";

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

export const getAssignmentsController = async (req: Request, res: Response) => {
  try {
    const assignments = await getAssignments();

    return res.status(200).json({
      success: true,
      data: assignments,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to fetch assignments",
    });
  }
};

export const getAssignmentByIdController = async (
  req: Request,
  res: Response,
) => {
  try {
    const id = req.params.id;

    if (Array.isArray(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid assignment id",
      });
    }
    const assignment = await getAssignmentById(id);
    return res.status(200).json({
      success: true,
      data: assignment,
    });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Something went wrong";
    const statusCode = message === "Assignment not found" ? 404 : 500;
    return res.status(statusCode).json({
      success: false,
      message,
    });
  }
};
