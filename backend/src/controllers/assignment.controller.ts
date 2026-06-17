import { Request, Response } from "express";

import { success } from "zod";
import { asyncHandler } from "../utils/asyncHandler";
import {
  createAssignment,
  getAssignments,
  getAssignmentById,
  updateAssignment,
} from "../services/assignment.service";
import { apiResponse } from "../utils/apiResponse";

export const createAssignmentController = asyncHandler(
  async (req: Request, res: Response) => {
    const assignment = await createAssignment(req.body);
    return res.status(201).json(
      apiResponse(assignment)
    );
  },
);

export const getAssignmentsController = asyncHandler(
  async (req: Request, res: Response) => {
    const assignments = await getAssignments();

    return res.status(200).json(
      apiResponse(assignments)
    );
  },
); 

export const getAssignmentByIdController = asyncHandler(
  async (req: Request, res: Response) => {
    const id = req.params.id;

    if (Array.isArray(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid assignment id",
      });
    }
    const assignment = await getAssignmentById(id);
    return res.status(200).json(
      apiResponse(assignment)
    );
  },
);


export const updateAssignmentController = asyncHandler(async(req:Request, res:Response)=>{
  const id = req.params.id;
  if (Array.isArray(id)) {
    return res.status(400).json({
        success: false,
        message: "Invalid assignment id",
      });
    }
  const assignment = await updateAssignment(id,req.body);
  res.status(200).json(
    apiResponse(assignment, "Assignment updated successfully")
  )
})