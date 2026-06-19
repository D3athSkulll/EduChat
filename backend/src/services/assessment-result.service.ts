import { AssessmentResult } from "../models/assessment-result.model";
import { AppError } from "../utils/AppError";
import { isValidObjectId } from "../utils/isValidObjectId";

export const getResultById = async(resultId: string)=>{
    if(!isValidObjectId(resultId)){
        throw new AppError("Invalid Result Id", 400);
    }

    const result = await AssessmentResult.findById(resultId).lean();

    if(!result){
        throw new AppError("Result Not Found",404);
    }

    return result;
};

export const getResultsByAssignment = async(assignmentId: string)=>{
    if(!isValidObjectId(assignmentId)){
        throw new AppError("Invalid Assignment Id",400);
    }

    return AssessmentResult.find({assignmentId,})
        .sort({createdAt: -1})
        .lean();
}