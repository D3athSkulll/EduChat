import { Assignment } from "../models/assignment.model";

import { buildAssessmentPrompt } from "./prompt-builder.service";

import { generateAssessment } from "./ai.service";

import { assessmentResponseSchema } from "../validators/assessment-response.validator";
import { extractJson } from "../utils/extractJson";

export const generateAssessmentFromPrompt = async(assignmentId: string)=>{
    const assignment = await Assignment.findById(assignmentId);

    if(!assignment){
        throw new Error("Assignment not found");
    }

    const prompt = buildAssessmentPrompt(assignment);
    const response = await generateAssessment(prompt);
    const cleanedResponse = extractJson(response);
    const parsed = JSON.parse(cleanedResponse);
    const validated = assessmentResponseSchema.parse(parsed);


    return validated.sections;
};