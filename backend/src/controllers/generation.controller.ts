import { Request, Response } from "express";

import { asyncHandler } from "../utils/asyncHandler";
import { apiResponse } from "../utils/apiResponse";
import { createGenerationRequest } from "../services/generation.service";

export const generateAssessmentController = asyncHandler(async(
    req: Request,
    res: Response
)=>{
      const id = req.params.id;
      if (Array.isArray(id)) {
        return res.status(400).json({
          success: false,
          message: "Invalid assignment id",
        });
      }
      const result = await createGenerationRequest(id);

      res.status(202).json(
        apiResponse(result, "Generation queued")
      );

});