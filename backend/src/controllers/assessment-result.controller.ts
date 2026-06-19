import {Request,Response} from "express";

import { getResultById, getResultsByAssignment } from "../services/assessment-result.service";

import { asyncHandler } from "../utils/asyncHandler";
import { apiResponse } from "../utils/apiResponse";

export const getResultController = asyncHandler(async(
    req:Request,
    res: Response,
)=>{
    const id = req.params.resultId;
    if (Array.isArray(id)) {
        return res.status(400).json({
            success: false,
            message: "Invalid Result id",
        });
    }

    const result = await getResultById(id);

    res.status(200).json(apiResponse(result));
});

export const getAssignmentResultsController = asyncHandler(async(
    req:Request,
    res: Response,
)=>{
    const id = req.params.assignmentId;
    if (Array.isArray(id)) {
        return res.status(400).json({
            success: false,
            message: "Invalid Result id",
        });
    }

    const results = await getResultsByAssignment(id);

    res.status(200).json(apiResponse(results));
});